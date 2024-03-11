---
source: https://observablehq.com/@d3/world-airports-voronoi
index: true
---

# World airports voronoi

Ref. [jasondavies.com/maps/voronoi/airports](https://www.jasondavies.com/maps/voronoi/airports/)

```js echo
import {context2d} from "../components/DOM.js";
const context = context2d(width, height);

const path = d3.geoPath(projection, context).pointRadius(1.5);

function render() {
  context.clearRect(0, 0, width, height);

  context.beginPath();
  path(graticule);
  context.lineWidth = 0.5;
  context.strokeStyle = dark ? "#666" : "#aaa";
  context.stroke();

  context.beginPath();
  path(mesh);
  context.lineWidth = 0.5;
  context.strokeStyle = dark ? "#fff" : "#000";
  context.stroke();

  context.beginPath();
  path(sphere);
  context.lineWidth = 1.5;
  context.strokeStyle = dark ? "#fff" : "#000";
  context.stroke();

  context.beginPath();
  path({type: "MultiPoint", coordinates: points});
  context.fillStyle = "#f00";
  context.fill();
}

function dragged() {
  //  mutable projection = mutable projection;
  render();
}

display(d3.select(context.canvas).call(drag(projection).on("drag.render", dragged)).call(render).node());
```

```js echo
const projection = d3
  .geoOrthographic()
  .fitExtent(
    [
      [1, 1],
      [width - 1, height - 1]
    ],
    sphere
  )
  .rotate([0, -30]);
```

```js echo
const height = width;
```

```js echo
const sphere = {type: "Sphere"};
```

```js echo
const graticule = d3.geoGraticule10();
```

```js echo
const points = (await FileAttachment("../data/airports.csv").csv({typed: true})).map(({longitude, latitude}) => [
  longitude,
  latitude
]);
```

```js echo
const mesh = geoVoronoi(points).cellMesh();
```

```js echo
import {geoVoronoi} from "npm:d3-geo-voronoi@2";
```

```js echo
import {drag} from "../components/versor-dragging.js";
```

```js echo
import {dark} from "../components/dark.js";
```
