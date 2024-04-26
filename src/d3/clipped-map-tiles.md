---
source: https://observablehq.com/@d3/clipped-map-tiles
index: true
---

# Clipped map tiles

This map clips Mapbox Natural Earth II tiles to the contiguous United States. To avoid aliasing artifacts (thin white lines) between tiles, two layers of tiles are drawn, with the lower layer’s tiles enlarged by one pixel.

```js echo
const map = svg`<svg viewBox="0 0 ${width} ${height}">
  <defs>
    <path id="land" d="${path(land)}"/>
    <clipPath id="clip"><use xlink:href="${location}#land" /></clipPath>
  </defs>
  <g clip-path="url(${location}#clip)">
    ${tile().map(
      ([x, y, z], i, {translate: [tx, ty], scale: k}) =>
        svg`<image xlink:href="${url(x, y, z)}" x="${(x + tx) * k - 0.5}" y="${(y + ty) * k - 0.5}" width="${
          k + 1
        }" height="${k + 1}">`
    )}
    ${tile().map(
      ([x, y, z], i, {translate: [tx, ty], scale: k}) =>
        svg`<image xlink:href="${url(x, y, z)}" x="${(x + tx) * k}" y="${(y + ty) * k}" width="${k}" height="${k}">`
    )}
  </g>
  <use xlink:href="${location}#land" fill="none" stroke="black" stroke-width="0.5" />
</svg>`;

display(map);
```

```js echo
const url = (x, y, z) =>
  `https://${"abc"[Math.abs(x + y) % 3]}.tiles.mapbox.com/v4/mapbox.natural-earth-2/${z}/${x}/${y}${
    devicePixelRatio > 1 ? "@2x" : ""
  }.png?access_token=${ACCESS_TOKEN}`;
```

```js echo
const projection = geoMercator();
```

```js echo
const path = geoPath(projection);
```

```js echo
const tile = d3Tile()
  .size([width, height])
  .scale(projection.scale() * 2 * Math.PI)
  .translate(projection([0, 0]));
```

```js echo
const width = 928;
```

```js echo
let height;
{
  const [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(width, land)).bounds(land);
  const dy = Math.ceil(y1 - y0),
    l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
  height = dy;
}
```

```js echo
const land = FileAttachment("../data/us.json")
  .json()
  .then((topology) => topojson.feature(topology, topology.objects.land))
  .then((land) => ({type: "Polygon", coordinates: land.geometry.coordinates[0]}));
```

```js echo
import * as topojson from "npm:topojson";
import {geoMercator, geoPath} from "npm:d3-geo@3";
import {tile as d3Tile} from "npm:d3-tile@1";
```

```js
// registered for @fil
const ACCESS_TOKEN = "pk.eyJ1IjoiZmlsIiwiYSI6ImNscnV0ZWMzdzA2c2wybm14NGdhbDBqeXkifQ.he-qZ179Xez4BkAMk6vRfA";
```
