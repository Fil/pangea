<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">World choropleth</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# World choropleth

Health-adjusted life expectancy, 2016. Data: [WHO](https://www.who.int/gho/publications/world_health_statistics/2018/en/)

```js echo
chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const marginTop = 46;
  const height = width / 2 + marginTop;

  // Fit the projection.
  const projection = d3.geoEqualEarth().fitExtent([[2, marginTop + 2], [width - 2, height]], {type: "Sphere"});
  const path = d3.geoPath(projection);

  // Index the values and create the color scale.
  const valuemap = new Map(hale.map(d => [d.name, d.hale]));
  const color = d3.scaleSequential(d3.extent(valuemap.values()), d3.interpolateYlGnBu);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append the legend.
  svg.append("g")
      .attr("transform", "translate(20,0)")
      .append(() => Legend(color, {title: "Healthy life expectancy (years)", width: 260}));

  // Add a white sphere with a black border.
  svg.append("path")
    .datum({type: "Sphere"})
    .attr("fill", "white")
    .attr("stroke", "currentColor")
    .attr("d", path);

  // Add a path for each country and color it according te this data.
  svg.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
      .attr("fill", d => color(valuemap.get(d.properties.name)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}\n${valuemap.get(d.properties.name)}`);

  // Add a white mesh.
  svg.append("path")
    .datum(countrymesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("d", path);

  return svg.node();
}
```

The *hale* dataset regrettably doesn’t include ISO 3166-1 numeric identifiers; it only has country names. Country names are often recorded inconsistently, so here we use a *rename* map to patch a handful of country names to the values used by our GeoJSON which comes from [Natural Earth](https://naturalearthdata.com) by way of the [TopoJSON World Atlas](https://github.com/topojson/world-atlas). If your data has ISO 3166-1 numeric identifiers, then you should use those and drop the *featureId* option above.

```js echo
hale = (await FileAttachment("hale.csv").csv()).map(d => ({name: rename.get(d.country) || d.country, hale: +d.hale}))
```

```js echo
rename = new Map([
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Democratic People's Republic of Korea", "North Korea"],
  ["Democratic Republic of the Congo", "Dem. Rep. Congo"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Iran (Islamic Republic of)", "Iran"],
  ["Lao People's Democratic Republic", "Laos"],
  ["Marshall Islands", "Marshall Is."],
  ["Micronesia (Federated States of)", "Micronesia"],
  ["Republic of Korea", "South Korea"],
  ["Republic of Moldova", "Moldova"],
  ["Russian Federation", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["Solomon Islands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syrian Arab Republic", "Syria"],
  ["The former Yugoslav Republic of Macedonia", "Macedonia"],
  // ["Tuvalu", ?],
  ["United Republic of Tanzania", "Tanzania"],
  ["Venezuela (Bolivarian Republic of)", "Venezuela"],
  ["Viet Nam", "Vietnam"]
])
```

The world geometries are represented in TopoJSON, which we convert into GeoJSON using topojson.feature. (TopoJSON, like D3, is available by default in all Observable notebooks.) These geometries are represented in spherical coordinates (*i.e.*, latitude and longitude in degrees); therefore we’ll need the *projection* option above to convert to screen coordinates (*i.e.*, pixels).

```js echo
world = FileAttachment("countries-50m.json").json()
```

```js echo
countries = topojson.feature(world, world.objects.countries)
```

The *countrymesh* is just the internal borders between countries, *i.e.*, everything but the coastlines. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets. (Try removing the last argument to topojson.mesh below to see the effect.)

```js echo
countrymesh = topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
```

```js echo
import {Legend} from "@d3/color-legend"
```

Alternatively, use [Observable Plot](https://observablehq.com/plot)’s concise API to create [maps](https://observablehq.com/@observablehq/plot-mapping) with the [geo mark](https://observablehq.com/plot/marks/geo).

```js echo
Plot.plot({
  projection: "equal-earth",
  width: 928,
  height: 928 / 2,
  color: {scheme: "YlGnBu", unknown: "#ccc", label: "Healthy life expectancy (years)", legend: true},
  marks: [
    Plot.sphere({fill: "white", stroke: "currentColor"}),
    Plot.geo(countries, {
      fill: (map => d => map.get(d.properties.name))(new Map(hale.map(d => [d.name, d.hale]))),
    }),
    Plot.geo(countrymesh, {stroke: "white"}),
 ]
})
```
