---
source: https://observablehq.com/@d3/raster-tiles
index: true
---

# Raster tiles

This notebook demonstrates using [d3-tile](https://github.com/d3/d3-tile) to display [Mercator-projected](https://d3js.org/d3-geo/cylindrical#geoMercator) raster tiles. The tiles are copyright [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).

```js
const options = new Map([
  ["CartoDB Voyager", (x, y, z) => `https://${"abc"[Math.abs(x + y) % 3]}.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png`],
  ["Stamen Terrain", (x, y, z) => `https://tiles.stadiamaps.com/tiles/stamen_terrain/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png`],
  ["Stamen Toner", (x, y, z) => `https://tiles.stadiamaps.com/tiles/stamen_toner/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png`],
  // ["Stamen Toner (hybrid)", (x, y, z) => `https://stamen-tiles-${"abc"[Math.abs(x + y) % 3]}.a.ssl.fastly.net/toner-hybrid/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png`],
  ["Stamen Toner (lite)", (x, y, z) => `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png`],
  ["Stamen Watercolor", (x, y, z) => `https://tiles.stadiamaps.com/tiles/stamen_watercolor/${z}/${x}/${y}.jpg`],
  ["OSM Mapnik", (x, y, z) => `https://${"abc"[Math.abs(x + y) % 3]}.tile.osm.org/${z}/${x}/${y}.png`],
  ["Wikimedia Maps", (x, y, z) => `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png`]
]);
const url = view(Inputs.select(options, {value: options.get("Stamen Toner (lite)")}));
```

```js echo
display(svg`<svg viewBox="0 0 ${width} ${height}">
  ${tiles.map(
    ([x, y, z], i, {translate: [tx, ty], scale: k}) => svg`
    <image xlink:href="${url(x, y, z)}" x="${Math.round((x + tx) * k)}" y="${Math.round(
      (y + ty) * k
    )}" width="${k}" height="${k}">
  `
  )}
</svg>`);
```

```js echo
const tiles = tile();
```

```js echo
const tile = Tile()
  .size([width, height])
  .scale(projection.scale() * 2 * Math.PI)
  .translate(projection([0, 0]));
```

```js echo
const projection = d3
  .geoMercator()
  .center([-122.4183, 37.775])
  .scale(Math.pow(2, 21) / (2 * Math.PI))
  .translate([width / 2, height / 2]);
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const height = 600;
```

```js echo
import {tile as Tile} from "npm:d3-tile@1";
```
