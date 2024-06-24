---
index: true
source: https://gist.github.com/mbostock/5249328
author: Mike Bostock
---

# Hexagon Mesh

Click and drag to paint red hexagons. A black outline will appear around contiguous clusters of red hexagons. This outline is constructed using [topojson.mesh](https://github.com/topojson/topojson-client?tab=readme-ov-file#mesh), part of the [TopoJSON](https://github.com/topojson/topojson-client) client API. A filter is specified so that the mesh only contains boundaries that separate filled hexagons from empty hexagons.

The hexagon grid itself is represented as TopoJSON, but is constructed on-the-fly in the browser. Since TopoJSON requires quantized coordinates, the hexagon grid is represented as integers, with each hexagon of dimensions 3×2. Then a [custom projection](https://d3js.org/d3-geo/stream) is used to transform these irregular integer hexagons to normal hexagons of the desired size.


```js echo
const height = width * 500 / 960;
const radius = width * 20 / 960;
const random = d3.randomLcg(42);

const topology = hexTopology(radius, width, height);

const projection = hexProjection(radius);

const path = d3.geoPath()
     .projection(projection);

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

display(svg.node());

svg.append("g")
    .attr("class", "hexagon")
  .selectAll("path")
    .data(topology.objects.hexagons.geometries)
  .join("path")
    .attr("d", (d) => path(topojson.feature(topology, d)))
    .classed("fill", (d) => d.fill)
    .on("mousedown", mousedown)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

svg.append("path")
    .datum(topojson.mesh(topology, topology.objects.hexagons))
    .attr("class", "mesh")
    .attr("d", path);

const border = svg.append("path")
    .attr("class", "border")
    .call(redraw);

let mousing = 0;

function mousedown(event, d) {
  mousing = d.fill ? -1 : +1;
  mousemove.apply(this, arguments);
}

function mousemove(event, d) {
  if (mousing) {
    d3.select(this).classed("fill", d.fill = mousing > 0);
    border.call(redraw);
  }
}

function mouseup() {
  mousemove.apply(this, arguments);
  mousing = 0;
}

function redraw(border) {
  border.attr("d", path(topojson.mesh(topology, topology.objects.hexagons, (a, b) => a.fill ^ b.fill)));
}

function hexTopology(radius, width, height) {
  const dx = radius * 2 * Math.sin(Math.PI / 3);
  const dy = radius * 1.5;
  const m = Math.ceil((height + radius) / dy) + 1;
  const n = Math.ceil(width / dx) + 1;
  const geometries = [];
  const arcs = [];

  for (let j = -1; j <= m; ++j) {
    for (let i = -1; i <= n; ++i) {
      const y = j * 2, x = (i + (j & 1) / 2) * 2;
      arcs.push([[x, y - 1], [1, 1]], [[x + 1, y], [0, 1]], [[x + 1, y + 1], [-1, 1]]);
    }
  }

  for (let j = 0, q = 3; j < m; ++j, q += 6) {
    for (let i = 0; i < n; ++i, q += 3) {
      geometries.push({
        type: "Polygon",
        arcs: [[q, q + 1, q + 2, ~(q + (n + 2 - (j & 1)) * 3), ~(q - 2), ~(q - (n + 2 + (j & 1)) * 3 + 2)]],
        fill: random() > i / n * 2
      });
    }
  }

  return {
    transform: {translate: [0, 0], scale: [1, 1]},
    objects: {hexagons: {type: "GeometryCollection", geometries}},
    arcs
  };
}

function hexProjection(radius) {
  const dx = radius * 2 * Math.sin(Math.PI / 3);
  const dy = radius * 1.5;
  return {
    stream: (stream) => ({
      point: function(x, y) { stream.point(x * dx / 2, (y - (2 - (y & 1)) / 3) * dy / 2); },
      lineStart: function() { stream.lineStart(); },
      lineEnd: function() { stream.lineEnd(); },
      polygonStart: function() { stream.polygonStart(); },
      polygonEnd: function() { stream.polygonEnd(); }
    })
  };
}
```

<style>

.hexagon {
  fill: white;
  pointer-events: all;
}

.hexagon path {
  -webkit-transition: fill 250ms linear;
  transition: fill 250ms linear;
}

.hexagon :hover {
  fill: pink;
}

.hexagon .fill {
  fill: red;
}

.mesh {
  fill: none;
  stroke: #000;
  stroke-opacity: .2;
  pointer-events: none;
}

.border {
  fill: none;
  stroke: #000;
  stroke-width: 2px;
  pointer-events: none;
}

</style>