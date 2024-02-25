---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">World airports Voronoi</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# World airports Voronoi

Ref. [@fil/geo-delaunay](/@fil/geo-delaunay)
<br>Ref. [jasondavies.com/maps/voronoi/airports](https://www.jasondavies.com/maps/voronoi/airports/)

```js echo
const chart = {
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(mutable projection, context).pointRadius(1.5);

  function render() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    path(graticule);
    context.lineWidth = 0.5;
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    path(mesh);
    context.lineWidth = 0.5;
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    path(sphere);
    context.lineWidth = 1.5;
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    path({type: "MultiPoint", coordinates: points});
    context.fillStyle = "#f00";
    context.fill();
  }

  function dragged() {
    mutable projection = mutable projection;
    render();
  }

  return d3.select(context.canvas)
    .call(drag(mutable projection).on("drag.render", dragged))
    .call(render)
    .node();
}
```

```js echo
mutable projection = d3.geoOrthographic()
    .fitExtent([[1, 1], [width - 1, height - 1]], sphere)
    .rotate([0, -30])
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
const points = (await FileAttachment("airports.csv").csv({typed: true})).map(({longitude, latitude}) => [
  longitude,
  latitude
]);
```

```js echo
const mesh = d3.geoVoronoi(points).cellMesh();
```

```js echo
const d3 = require("d3@7", "d3-geo-voronoi@2");
```

```js echo
import {drag} with {d3} from "@d3/versor-dragging"
```
