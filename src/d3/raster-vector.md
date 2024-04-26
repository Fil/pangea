---
source: https://observablehq.com/@d3/raster-vector
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Raster & vector</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Raster & vector

This notebook demonstrates using [d3-tile](https://github.com/d3/d3-tile) to display [Mercator-projected](https://d3js.org/d3-geo/cylindrical#geoMercator) raster tiles underneath [TopoJSON](https://github.com/topojson) vectors. Map tiles by <a href="https://mapbox.com">Mapbox</a>; data by <a href="https://openstreetmap.org">OpenStreetMap</a>.

```js echo
const map = svg`<svg viewBox="0 0 ${width} ${height}">
  ${tile().map(
    ([x, y, z], i, {translate: [tx, ty], scale: k}) => svg`
    <image xlink:href="${url(x, y, z)}" x="${Math.round((x + tx) * k)}" y="${Math.round(
      (y + ty) * k
    )}" width="${k}" height="${k}">
  `
  )}
  <path fill="none" stroke="red" d="${path(vectors)}"/>
</svg>`;
```

```js echo
const url = (x, y, z) =>
  `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/${z}/${x}/${y}${
    devicePixelRatio > 1 ? "@2x" : ""
  }?access_token=pk.eyJ1IjoibWJvc3RvY2siLCJhIjoiY2s5ZWRlbTM4MDE0eDNocWJ2aXR2amNmeiJ9.LEyjnNDr_BrxRmI4UDyJAQ`;
```

```js echo
const projection = d3.geoMercator();
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const tile = d3
  .tile()
  .size([width, height])
  .scale(projection.scale() * 2 * Math.PI)
  .translate(projection([0, 0]))
  .tileSize(512);
```

```js echo
const height = {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, vectors)).bounds(vectors);
  const height = Math.ceil(y1 - y0);
  const scale = projection.scale() * (2 * Math.PI);
  projection.center(projection.invert([width / 2, height / 2]));
  projection.scale(Math.pow(2, Math.floor(Math.log2(scale))) / (2 * Math.PI));
  projection.translate([width / 2, height / 2]);
  return height;
}
```

```js echo
const vectors = topojson.feature(topology, topology.objects.detroit);
```

```js echo
const topology = FileAttachment("detroit.json").json();
```

```js echo
const d3 = require("d3-geo@3", "d3-tile@1");
```
