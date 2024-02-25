# Map 1

```js
const d3 = {
  ...await import("npm:d3"),
  ...await import("npm:d3-geo-projection"),
  ...await import("npm:d3-geo-polygon")
}
```

```js
const lang = view(Inputs.select(["fr", "es", "en", "it"], {label: "Langue"}));

const pj = view(
  Inputs.select(
    new Map([
      ["robinson", {name: "Robinson", projection: "robinson"}],
      ["antarctic", {name: "Projection azimutale équivalente", projection: "antarctic", antarctica: 1, graticule: 1}],
      ["arctic", {projection: "arctic", graticule: 1}],
      ["bertin1953", {projection: "bertin1953"}],
      ["winkel-tripel", {name:"winkel-tripel", projection: "winkel-tripel"}],
      ["airocean", {name:"airocean de Buckminster Fuller", projection:       "airocean", graticule: "1", antarctica: "1"}],
      ["cahillkeyes", {name:"de Cahill-Keyes", projection: "cahillkeyes",       graticule: "1", antarctica: "1"}],
      ["equalearth", {name:"Equal Earth (2018)", projection: "equalearth",       graticule: "1", antarctica: "1"}],
      ["robinson", {name:"robinson", projection: "robinson"}],
      ["equirectangular", {name:"equirectangular", projection:       "equirectangular"}],
      ["bottomley", {name:"bottomley", projection: "bottomley"}],
      ["gallpeters", {name:"gall-peters", projection: "gallpeters"}],
      ["larrivee", {name:"larrivee", projection: "larrivee"}],
      ["timesus", {name:"Times centrée sur les US", projection: "timesus"}],
      ["gingery", {name:"Gingery", projection: "geoGingery", antarctica: "1",       clip: "1", graticule: "1"}],
      ["cox", {name:"Cox", projection: "Cox", graticule: "1"}],
      ["lee", {name:"Lee", projection: "lee", graticule: "1", antarctica: "1",       rotate: "-30", angle: "-30"}],
      ["leenorth", {name:"Lee north", projection: "lee", graticule: "1",       antarctica: "1", rotate: "-30", roll: "180", angle: "-30"}],
      ["imago", {name:"imago", projection: "imago", graticule: "1", antarctica: "1"}],

    ])
  )
)
```

<div>${basemap({...pj, lang})}

```js
function basemap(params) {
  const svg = d3.select((htl.html`<svg version="1.1"
    	xmlns="http://www.w3.org/2000/svg"
    	xmlns:xlink="http://www.w3.org/1999/xlink"
    	xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    	viewBox="0 0 700 475" 
><defs><style type="text/css">
.country {
  fill: white;
}
.coast {
  fill: none;
  stroke: #555555;
  stroke-width: 0.2mm;
  stroke-linecap: round;
}
#feature path {
  fill: none;
  stroke: #555555;
  stroke-width: 0.2mm;
  stroke-linecap: round;
}
.borders {
  fill: none;
  stroke: #555555;
  stroke-width: 0.15mm;
  stroke-linecap: round;
}
.continents {
  fill: #eeeeee;
}
.sphere {
  fill: none;
  stroke: #999999;
  stroke-width: 0.30mm;
}
.sphere2 {
  fill: none;
  stroke: #999999;
  stroke-width: 0.30mm;
}
.graticule {
  fill: none;
  stroke: #999999;
  stroke-width: 0.05mm;
}
.land {
  fill: #999999;
}
.disputed {
  fill: none;
  stroke: black;
  stroke-width: 0.05mm;
  stroke-dasharray: 0.3mm 0.1mm;
}
.capital {
  stroke: #000000;
  stroke-width: 0.15mm;
  fill: white;
}
.country-island {
  stroke: #555555;
  stroke-width: 0.20mm;
  fill: #b47a2c;
}
.population {
  stroke: #ffffff;
  stroke-width: 0.14mm;
  fill: red;
  fill-opacity: 0.3;
}
.gdp {
  stroke: #ffffff;
  stroke-width: 0.14mm;
  fill: blue;
  fill-opacity: 0.3;
}
.background {
  fill: none;
}
#capitals {
  display: none;
}
#island-nations {
  display: none;
}
#gdp {
  display: none;
}
#population {
  display: none;
}
.frame {
  fill: none;
  stroke: #444444;
  stroke-width: 0.2mm;
  stroke-linecap: round;
}
</style></defs></svg>
`)).select("svg");
 
 applyProjection(svg, params);
 return svg.node()
}
```

```js

function applyProjection(svg, params) {
const width = 700;
const height = 475;
let is_antarctica; 
let glaius; 

function param(x, def) {
  return params[x] ?? def;
}

let projection = null,
  rotate = [+param("rotate", -10.23), +param("pitch", 0), +param("roll", 0)],
  show_graticule = param("graticule", false),
  show_ata = param("antarctica", false),
  angle = param("angle", null),
  clipPath = param("clip") ? "url(#clip)" : null;

var promises = [];
promises.push(d3.json("https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@0.1.0/world/110m.json"));
promises.push(d3.json("https://raw.githubusercontent.com/visionscarto/fonds-de-cartes/master/data/disputed.geojson"));
promises.push(d3.csv("https://raw.githubusercontent.com/visionscarto/fonds-de-cartes/master/data/capitals.csv"));
promises.push(d3.csv("https://raw.githubusercontent.com/visionscarto/fonds-de-cartes/master/data/island-nations.csv"));
promises.push(d3.json("https://raw.githubusercontent.com/visionscarto/some-geo-data/master/population-centroids.geojson"));
promises.push(new Date().toString());
promises.push(d3.json("https://raw.githubusercontent.com/visionscarto/fonds-de-cartes/master/i18n.json"));

// a changer si on veut ajouter 1 feature, ici les EEZ
if (param("feature", false)) promises.push(d3.json("/maps/seabed/eez.topo.json"));

Promise.all(promises).then(function(v) {
  var [wjson, disputed, capitals, islands, pop, tag, i18n, feature] = v;

  let projection = param("projection", "bertin1953");
  switch (projection) {
    case "bertin1953":
      projection = d3
        .geoBertin1953()
        .scale(169)
        .translate([320, 240]);
      break;
    case "equirectangular":
      projection = d3
        .geoEquirectangular()
        .scale(110)
        .translate([348, 475 / 2])
        .rotate(rotate);
      break;
    case "equalearth":
      projection = d3
        .geoEqualEarth()
        .fitExtent([[10, 2], [693-8, 400]], { type: "Sphere" })
        .rotate([-10,0]);
      break;
    case "arctic":
      projection = d3
        .geoAzimuthalEqualArea()
        .scale(354)
        .translate([350, 240])
        .rotate([0, -90, 112])
        .clipExtent([[2, 2], [693, 471]]);
      break;
    case "antarctic":
      projection = d3
        .geoAzimuthalEqualArea()
        .scale(354)
        .translate([350, 240])
        .rotate([0, 90, 222])
        .clipExtent([[2, 2], [693, 471]]);
      break;
    case "robinson":
      projection = d3
        .geoRobinson()
        .translate([324, 245])
        .scale(128)
        .rotate(rotate);
      break;
    case "larrivee":
      projection = d3
        .geoLarrivee()
        .translate([335, 255])
        .scale(121)
        .rotate(rotate);
      break;
    case "bottomley":
      projection = d3
        .geoBottomley()
        .translate([287, 265])
        .scale(152)
        .rotate(rotate);
      break;
    case "winkel-tripel":
      projection = d3
        .geoWinkel3()
        .translate([314, 250])
        .scale(160)
        .rotate(rotate);
      break;
    case "gallpeters":
      projection = d3
        .geoCylindricalEqualArea()
        .parallel(45)
        .translate([348, 240])
        .scale(154)
        .rotate(rotate);
      break;
    case "buache":
      projection = d3
        .geoGingery()
        .lobes(3)
        .rotate([-10,-90])
        .fitExtent([[2, 2], [693, 471]], { type: "Sphere" });
      break;
    case "gingery":
      projection = d3
        .geoGingery()
        .rotate(rotate)
        .fitExtent([[2, 2], [693, 471]], { type: "Sphere" });
      break;
    case "berghaus":
      projection = d3
        .geoBerghaus()
        .rotate(rotate)
        .fitExtent([[2, 2], [693, 471]], { type: "Sphere" });
      break;
    case "waterman":
      projection = d3
        .geoPolyhedralWaterman()
        .rotate([25, -2])
        .scale(118)
        .translate([200, 200]);
      break;
    case "timesus":
      projection = d3
        .geoTimes()
        .rotate([117, -5])
        .scale(151)
        .translate([347, 257]);
      break;
    case "airocean":
      projection = d3
        .geoAirocean()
        .fitExtent([[10, 2], [683, 421]], { type: "Sphere" });
      break;
    case "cahillkeyes":
      projection = d3
        .geoCahillKeyes()
        .fitExtent([[10, 2], [683, 421]], { type: "Sphere" });
      break;
    case "lee":
      projection = d3
        .geoTetrahedralLee()
        .angle(angle)
        .rotate(rotate)
        .fitExtent([[20, 15], [width - 20, height - 20]], { type: "Sphere" });
      projection.precision(0.1);
      delete projection.precision;
      // Lee n’accepte pas trop de precision sinon ses coins sont abimes
      // todo : revoir le cadre et déplacer la signature
      // todo : bien gérer la sphere
      break;
    case "imago":
      projection = d3
        .geoImago()
        .fitExtent([[10, 15], [width - 10, height - 20]], { type: "Sphere" });
      projection.precision(0.1);
      break;
    case "goodeocean":
      var lobes = [
        [
          [[-180, 0], [-130, 90], [-95, 0]],
          [[-95, 0], [-30, 90], [55, 0]],
          [[55, 0], [120, 90], [180, 0]]
        ],
        [
          [[-180, 0], [-120, -90], [-60, 0]],
          [[-60, 0], [20, -90], [85, 0]],
          [[85, 0], [140, -90], [180, 0]]
        ]
      ];
      projection = d3
        .geoInterrupt(d3.geoHomolosineRaw, lobes)
        .rotate([-204, 0])
        .fitExtent([[10, 10], [width - 15, height - 10]], { type: "Sphere" });
      var c = projection.lobes().map(d =>
        d3.merge(
          d.map(q => {
            var centroid = d3.geoCentroid({
              type: "MultiPoint",
              coordinates: q
            });
            return q.map(p => d3.geoInterpolate(p, centroid)(1e-7));
          })
        )
      );
      c = d3.merge([c[0], c[1].reverse()]);
      projection.preclip(
        d3.geoClipPolygon({ type: "Polygon", coordinates: [c] })
      );
      break;
    default:
//      pj = pj.replace(/^geo/, "");
      if ("geo" + pj in d3) {
        projection = d3["geo" + pj]();
        if (projection.rotate) projection.rotate(rotate);
        projection.fitExtent([[2, 2], [693, 471]], { type: "Sphere" });
      } else {
        alert("projection " + pj + " inconnue");
        projection = null;
      }
      break;
  }

  if (projection && projection.precision) projection.precision(0.001);
  if (projection && projection.angle && angle !== null) {
    projection.angle(angle);
  }
  var laiusp = _(pj.name);
  if (laiusp === pj) laiusp = _("projectiondefault").replace("%p", pj.name);

  var laius = [
    laiusp,
    _("credits1"), // 'Contours : Natural Earth, modifiés Visionscarto. Logiciel : D3.js',
    _("credits2"), // 'Gratuit et libre pour tous usages.',
    _("credits3") // 'Nous aimons les cartes, partageons-les !  contact@visionscarto.net'
  ];

  var path = d3.geoPath().projection(projection);

  svg.attr("viewBox", [0, 0, width, height]);

  var defs = svg.select("defs");

  const g = svg.append("g").call(svglayer, "base map");

  if (!show_ata) {
    defs
      .select("style")
      .text(
        defs.select("style").text() +
          "\n\n#countries .ATA, #countries .ATF { display: none; } #Antarctica { display: none; stroke: #555; stroke-width: 0.2mm; stroke-linecap: round; }"
      );
    is_antarctica = function(d) {
      if (!d.properties) return false;
      return ["ATA", "ATF"].indexOf(d.properties.a3) > -1;
    };
  } else {
    is_antarctica = function(d) {
      return false;
    };
  }

  defs
    .append("path")
    .datum({ type: "Sphere" })
    .attr("id", "sphereClip")
    .attr("d", path);

  if (clipPath)
    defs
      .append("clipPath")
      .attr("id", "clip")
      .append("use")
      .attr("xlink:href", "#sphereClip");

  var bg = g
    .append("g")
    .call(svglayer, "background")
    .append("rect")
    .attr("class", "background")
    .attr("x", 3)
    .attr("y", 3)
    .attr("width", width - 6)
    .attr("height", height - 6);

  var world = g.append("g").call(svglayer, "world");

  graphsignature([" ", " ", " "], ["Visionscarto", "2019"], laius);

  var countries = wjson.objects.countries;
  countries.geometries = countries.geometries.sort(function(a, b) {
    if (!a.properties) return 0;
    return d3.descending(
      class_iso_a3(a.properties),
      class_iso_a3(b.properties)
    );
  });

  g
    .append("text")
    .text("Last-Modified: " + tag)
    .attr("display", "none");

  var globe = world
    .append("g")
    .call(svglayer, "globe")
    .attr("class", "globe")
    .style("display", show_graticule ? null : "none");

  globe
    .append("g")
    .attr("class", "land")
    .call(svglayer, "land")
    .append("path")
    .attr("class", "land")
    .attr("clip-path", clipPath)
    .datum(
      topojson.merge(
        wjson,
        wjson.objects.countries.geometries.filter(function(d) {
          return !is_antarctica(d);
        })
      )
    )
    .attr("d", path);

  globe
    .append("g")
    .attr("class", "graticule")
    .call(svglayer, "graticule")
    .append("path")
    .attr("class", "graticule")
    .attr("clip-path", clipPath)
    .datum(d3.geoGraticule())
    .attr("d", path);

  globe
    .append("use")
    .attr("class", "sphere")
    .call(svglayer, "sphere")
    .attr("xlink:href", "#sphereClip");

// TODO fix continents
const continentsList = new Set(countries.geometries.map((d) => d.properties && d.properties.continent));
console.warn("continents", continentsList);

  world
    .append("g")
    .attr("class", "continents")
    .call(svglayer, "continents")
    .selectAll(".continent")
    .data(continentsList)
    .enter()
    .append("g")
    .attr("class", "continent")
    .attr("clip-path", clipPath)
    //.call(svglayer, function(d) {
    //  return d.replace(/ /g, "_");
    //})
    .append("path")
    .attr("d", function(d) {
      return path(
        topojson.merge(
          wjson,
          countries.geometries.filter(function(e) {
            return !e.properties || e.properties.continent == d;
          })
        )
      );
    });

  var randomcolor = d3.scaleOrdinal(d3.schemeCategory10);
  world
    .append("g")
    .attr("clip-path", clipPath)
    .call(svglayer, "countries")
    .selectAll(".country")
    .data(topojson.feature(wjson, countries).features)
    .enter()
    .append("g")
    .attr("class", function(d) {
      return "country " + class_iso_a3(d.properties);
    })
    .call(svglayer, function(d) {
      return (class_iso_a3(d.properties) + " " + (d.properties['name_'+param("lang")] || d.properties.name)).replace(/ /g, "_");
    })
    .append("path")
    .attr("d", path);

  world
    .append("g")
    .attr("clip-path", clipPath)
    .call(svglayer, "disputed")
    .selectAll(".country")
    .data(disputed.features)
    .enter()
    .append("g")
    .attr("class", function(d) {
      return "disputed";
    })
    .call(svglayer, function(d) {
      return d.properties.name.replace(/ /g, "_");
    })
    .append("path")
    .attr("d", path);

  world
    .append("g")
    .call(svglayer, "borders")
    .append("path")
    .attr("class", "borders")
    .datum(
      topojson.mesh(wjson, countries, function(a, b) {
        return a !== b;
      })
    )
    .attr("d", path)
    .attr("clip-path", clipPath);

  countries.geometries = countries.geometries.filter(function(d) {
    return !is_antarctica(d);
  });

  world
    .append("g")
    .call(svglayer, "coast")
    .append("path")
    .datum(
      topojson.mesh(wjson, countries, function(a, b) {
        return a == b;
      })
    )
    .attr("d", path)
    .attr("class", "coast")
    .attr("clip-path", clipPath);

  if (feature) {
  world
    .append("g")
    .call(svglayer, "feature")
    .selectAll("path")
    .data(
      topojson.feature(feature, feature.objects.eez).features
    )
    .enter()
    .append('path')
    .attr("d", path);
  }

  world
    .append("g")
    .call(svglayer, "sphere2")
    .style("display", show_graticule ? null : "none")
    .append("path")
    .attr("class", "sphere2")
    .datum({ type: "Sphere" })
    .attr("d", path);

  // ISLAND NATIONS
  var isl = world.append("g").call(svglayer, "island-nations");

  isl
    .selectAll("circle")
    .data(
      islands
        .map(function(d) {
          var p = projection([parseFloat(d.lon), parseFloat(d.lat)]);
          if (p) {
            d.x = p[0];
            d.y = p[1];
          }
          return d;
        })
        .sort(function(a, b) {
          return d3.descending(a.id, b.id);
        })
    )
    .enter()
    .append("circle")
    .call(svglayer, function(d) {
      return (d.id + " " + d.name).replace(/ /g, "_");
    })
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("class", function(d) {
      return d.id + " " + "country-island";
    })
    .attr("r", "0.25mm");

  // CAPITALS
  var cap = world.append("g").call(svglayer, "capitals");

  cap
    .selectAll("rect")
    .data(
      capitals
        .map(function(d) {
          var p = projection([parseFloat(d.lon), parseFloat(d.lat)]);
          if (p) {
            d.x = p[0];
            d.y = p[1];
          }
          return d;
        })
        .sort(function(a, b) {
          return d3.descending(a.id, b.id);
        })
    )
    .enter()
    .append("g")
    .call(svglayer, function(d) {
      return (d.id + " " + d.capital).replace(/ /g, "_");
    })
    .attr("class", function(d) {
      return "capital " + d.id;
    })
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .append("rect")
    .attr("width", "0.4mm")
    .attr("height", "0.4mm")
    .attr("transform", "translate(-0.5, -0.5)");

  // POPULATION
  var data = pop.features
    .map(function(d) {
      d.xy = projection(d.geometry.coordinates);
      d.pop = parseFloat(d.properties.POP_EST);
      return d;
    })
    .filter(function(d) {
      return d.properties.GU_A3 !== -99 && d.pop > 0;
    })
    .sort(function(a, b) {
      return d3.descending(a.pop, b.pop);
    });

  var pop_scale = d3
    .scaleSqrt()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.pop;
      })
    ])
    .range([1, 23]);

  world
    .append("g")
    .call(svglayer, "population")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", function(d) {
      return "population " + d.properties.GU_A3;
    })
    .attr("data-population", function(d) {
      return d.pop;
    })
    .attr("cx", function(d) {
      return d.xy[0];
    })
    .attr("cy", function(d) {
      return d.xy[1];
    })
    .attr("r", function(d) {
      return pop_scale(d.pop);
    })
    .call(svglayer, function(d) {
      return (d.properties.GU_A3 + " " + d.properties.NAME).replace(/ /g, "_");
    });

  // GDP/PIB
  var data = pop.features
    .map(function(d) {
      d.xy = projection(d.geometry.coordinates);
      d.gdp = parseFloat(d.properties.GDP_MD_EST);
      return d;
    })
    .filter(function(d) {
      return d.properties.GU_A3 !== -99 && d.gdp > 0;
    })
    .sort(function(a, b) {
      return d3.descending(a.gdp, b.gdp);
    });

  var gdp_scale = d3
    .scaleSqrt()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.gdp;
      })
    ])
    .range([1, 23]);

  world
    .append("g")
    .call(svglayer, "gdp")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", function(d) {
      return "gdp " + d.properties.GU_A3;
    })
    .attr("data-gdp", function(d) {
      return d.gdp;
    })
    .attr("x", function(d) {
      return d.xy[0];
    })
    .attr("y", function(d) {
      return d.xy[1];
    })
    .attr("width", function(d) {
      return gdp_scale(d.gdp);
    })
    .attr("height", function(d) {
      return gdp_scale(d.gdp);
    })
    .attr("transform", function(d) {
      var x = -gdp_scale(d.gdp) / 2;
      return "translate(" + x + "," + x + ")";
    })
    .call(svglayer, function(d) {
      return (d.properties.GU_A3 + " " + d.properties.NAME).replace(/ /g, "_");
    });

  function _(t) {
    return (i18n[param("lang")] || i18n["fr"])[t] || t;
  }

  function class_iso_a3(prop) {
    return prop.a3;
  }

  function graphsignature(titre, lignes, laius) {
    var sig = svg.append("g").call(svglayer, "signature");

    sig
      .append("g")
      .call(svglayer, "frame")
      .append("rect")
      .attr("class", "frame")
      .attr("x", 3)
      .attr("y", 3)
      .attr("width", width - 6)
      .attr("height", height - 6);

    var gtitre = sig.append("g").call(svglayer, "title");
    var size = 36;
    gtitre
      .selectAll("text")
      .data(titre)
      .enter()
      .append("text")
      .attr("y", function(d, i) {
        return (size + 4) * i;
      })
      .attr("transform", "translate(" + [width - 14, size] + ")")
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .style("font-size", size + "px")
      .text(function(d) {
        return d;
      });

    var gsignature = sig.append("g").call(svglayer, lignes[0]);

    gsignature
      .selectAll("text")
      .data(lignes)
      .enter()
      .append("text")
      .attr("y", function(d, i) {
        return 14 * i;
      })
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .text(function(d) {
        return d.toUpperCase();
      });

    var bbox = gsignature.node().getBBox();
    gsignature.attr(
      "transform",
      "translate(" +
        [width - bbox.width / 2 - 14, height - bbox.height - 2] +
        ")"
    );

    gsignature
      .selectAll("line")
      .data(lignes.slice(1))
      .enter()
      .append("line")
      .attr("x1", -bbox.width / 2)
      .attr("x2", bbox.width / 2)
      .attr("y1", function(d, i) {
        return 14 * i + 4;
      })
      .attr("y2", function(d, i) {
        return 14 * i + 4;
      })
      .attr("stroke", "black");

    if (laius) {
      glaius = sig.append("text").call(svglayer, "presentation");
      glaius
        .selectAll("tspan")
        .data(laius)
        .enter()
        .append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i) {
          return 10 * i;
        })
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .style("font-size", "8px")
        .text(function(d) {
          return d;
        });

      var bbox = glaius.node().getBBox();
      glaius.attr(
        "transform",
        "translate(" + [12, height - bbox.height - 4] + ")"
      );
    }
  }

  // cf. https://github.com/d3/d3/issues/291#issuecomment-226988829
  function svglayer(sel, id) {
    return sel
      .attr("id", id)
      .attr(":inkscape:groupmode", "layer")
      .attr(":inkscape:label", id);
  }
});
}
```