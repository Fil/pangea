---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Vector tiles</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Vector tiles

This notebook demonstrates using [d3-tile](https://github.com/d3/d3-tile) to display [Mercator-projected](https://d3js.org/d3-geo/cylindrical#geoMercator) [GeoJSON](https://d3js.org/d3-geo/path#geoPath) vector tiles. The vector tiles are provided by [Nextzen](https://www.nextzen.org/) and require an API key.

```js echo
const map = svg`<svg viewBox="0 0 ${width} ${height}">${tiles.map(
  (d) => svg`
  <path fill="#eee" d="${path(filter(d.data.water, (d) => !d.properties.boundary))}"></path>
  <path fill="none" stroke="#aaa" d="${path(filter(d.data.water, (d) => d.properties.boundary))}"></path>
  <path fill="none" stroke="#000" stroke-width="0.75" d="${path(d.data.roads)}"></path>
`
)}
</svg>`;
```

```js echo
const tiles = Promise.all(
  tile().map(async (d) => {
    d.data = await fetch(
      `https://tile.nextzen.org/tilezen/vector/v1/256/all/${d[2]}/${d[0]}/${d[1]}.json?api_key=SAI-dMzMQ866u3VyVAntDg`
    ).then((response) => response.json()); // Sign up for an API key: https://www.nextzen.org
    return d;
  })
);
```

```js echo
const tile = d3
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
const d3 = require("d3-geo@3", "d3-tile@1");
```
