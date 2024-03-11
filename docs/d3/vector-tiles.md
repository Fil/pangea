---
source: https://observablehq.com/@d3/vector-tiles
index: false
title: "D3: Vector tiles"
---

# Vector tiles

This notebook demonstrates using [d3-tile](https://github.com/d3/d3-tile) to display [Mercator-projected](https://d3js.org/d3-geo/cylindrical#geoMercator) [GeoJSON](https://d3js.org/d3-geo/path#geoPath) vector tiles. The vector tiles are provided by [Nextzen](https://www.nextzen.org/) and require an API key.

```js echo
const map = svg`<svg viewBox="0 0 ${width} ${height}">${tiles.map(
  (d) => svg`
  <path fill="var(--theme-foreground-faintest)" d="${path(filter(d.data.water, (d) => !d.properties.boundary))}"></path>
  <path fill="none" stroke="currentColor" stroke-opacity="0.8" d="${path(
    filter(d.data.water, (d) => d.properties.boundary)
  )}"></path>
  <path fill="none" stroke="currentColor" stroke-width="0.75" d="${path(d.data.roads)}"></path>
`
)}
</svg>`;

display(map);
```

```js echo
const tiles = Promise.all(
  tile().map(async (d) => {
    d.data = await fetch(
      `https://tile.nextzen.org/tilezen/vector/v1/256/all/${d[2]}/${d[0]}/${d[1]}.json?api_key=${APIKEY}`
    ).then((response) => response.json()); // Sign up for an API key: https://www.nextzen.org
    return d;
  })
);
```

```js echo
const tile = d3Tile
  .tile()
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
function filter({features}, test) {
  return {type: "FeatureCollection", features: features.filter(test)};
}
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const height = 600;
```

```js echo
import * as d3Tile from "npm:d3-tile";
```

```js
const APIKEY = `fnZaju3QSt6upiPPN7Mm6w`;
```
