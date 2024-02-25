---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Hexbin map</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Hexbin map

This map shows approximately 3,000 locations of Walmart stores. The hexagon area represents the number of stores in the vicinity, while the color represents the median age of these stores. Older stores are red, and newer stores are blue.

```js echo
const chart = {

  // Specify the map’s dimensions and projection.
  const width = 928;
  const height = 581;
  const projection = d3.geoAlbersUsa().scale(4 / 3 * width).translate([width / 2, height / 2]);

  // Create the container SVG.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  // Create the bins.
  const hexbin = d3.hexbin()
      .extent([[0, 0], [width, height]])
      .radius(10)
      .x(d => d.xy[0])
      .y(d => d.xy[1]);
  const bins = hexbin(walmarts.map(d => ({xy: projection([d.longitude, d.latitude]), date: d.date})))
     .map(d => (d.date = new Date(d3.median(d, d => d.date)), d))
     .sort((a, b) => b.length - a.length)

  // Create the color and radius scales.
  const color = d3.scaleSequential(d3.extent(bins, d => d.date), d3.interpolateSpectral);
  const radius = d3.scaleSqrt([0, d3.max(bins, d => d.length)], [0, hexbin.radius() * Math.SQRT2]);

  // Append the color legend.
  svg.append("g")
      .attr("transform", "translate(580,20)")
      .append(() => legend({
        color,
        title: "Median opening year",
        width: 260,
        tickValues: d3.utcYear.every(5).range(...color.domain()),
        tickFormat: d3.utcFormat("%Y")
      }));

  // Append the state mesh.
  svg.append("path")
      .datum(stateMesh)
      .attr("fill", "none")
      .attr("stroke", "#777")
      .attr("stroke-width", 0.5)
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath(projection));

  // Append the hexagons.
  svg.append("g")
    .selectAll("path")
    .data(bins)
    .join("path")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("d", d => hexbin.hexagon(radius(d.length)))
      .attr("fill", d => color(d.date))
      .attr("stroke", d => d3.lab(color(d.date)).darker())
    .append("title")
      .text(d => `${d.length.toLocaleString()} stores\n${d.date.getFullYear()} median opening`);

  return svg.node();
}
```

```js echo
const walmarts = {
  const parseDate = d3.utcParse("%m/%d/%Y");
  return FileAttachment("walmart.tsv").tsv()
    .then(data => data.map((d) => ({
      longitude: +d[0],
      latitude: +d[1],
      date: parseDate(d.date)
    })));
}
```

```js echo
const stateMesh = FileAttachment("us-counties-10m.json")
  .json()
  .then((us) => topojson.mesh(us, us.objects.states));
```

```js echo
const d3 = require("d3@7", "d3-hexbin@0.2");
```

```js echo
import {legend} from "@d3/color-legend";
```

Using [Observable Plot](/plot/):

```js echo
Plot.plot({
  projection: "albers-usa",
  color: {scheme: "Spectral"},
  marks: [
    Plot.geo(stateMesh, {strokeOpacity: 0.25}),
    Plot.dot(
      walmarts,
      Plot.hexbin(
        {fill: "median", r: "count"},
        {
          x: "longitude",
          y: "latitude",
          binWidth: 14,
          fill: "date",
          stroke: "currentColor",
          strokeWidth: 0.5
        }
      )
    )
  ]
});
```
