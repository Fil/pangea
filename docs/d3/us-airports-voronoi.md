---
source: https://observablehq.com/@d3/us-airports-voronoi
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">U.S. airports Voronoi</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# U.S. airports Voronoi

This [Voronoi diagram](https://github.com/Fil/d3-geo-voronoi) shows the region that is closest to each airport.

```js echo
const chart = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610])
      .attr("width", 975)
      .attr("height", 610)
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("path")
      .datum(topojson.merge(us, us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")))
      .attr("fill", "#ddd")
      .attr("d", d3.geoPath());

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath());

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("pointer-events", "all")
    .selectAll("path")
    .data(d3.geoVoronoi().polygons(data).features)
    .join("path")
      .attr("d", d3.geoPath(projection))
    .append("title")
      .text(d => {
        const p = d.properties.site.properties;
        return `${p.name} Airport
${p.city}, ${p.state}`;
      });

  svg.append("path")
      .datum({type: "FeatureCollection", features: data})
      .attr("d", d3.geoPath(projection).pointRadius(1.5));

  return svg.node();
}
```

```js echo
const data = FileAttachment("airports.csv")
  .csv({typed: true})
  .then((data) =>
    data.map((d) => ({
      type: "Feature",
      properties: d,
      geometry: {
        type: "Point",
        coordinates: [+d.longitude, +d.latitude]
      }
    }))
  );
```

```js echo
const projection = d3.geoAlbers().scale(1300).translate([487.5, 305]);
```

```js echo
const us = FileAttachment("states-albers-10m.json").json();
```

```js echo
const d3 = require.alias({
  "d3-array": "d3@7",
  "d3-delaunay": "d3@7",
  "d3-geo": "d3@7"
})("d3@7", "d3-geo-voronoi@2");
```
