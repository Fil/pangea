---
source: https://observablehq.com/@d3/orthographic-to-equirectangular
index: true
---

# Orthographic to equirectangular

This notebook demonstrates how to interpolate smoothly between two projections ([orthographic](/@d3/orthographic) and [equirectangular](/@d3/equirectangular)) by blending their raw projection functions.

```js echo
const context = context2d(width, height);
display(context.canvas);
const path = d3.geoPath(projection, context);
while (true) {
  for (let i = 0, n = 480; i < n; ++i) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    const t = d3.easeCubic(2 * i > n ? 2 - 2 * i / n : 2 * i / n);
    projection.alpha(t).rotate(rotate(t)).scale(scale(t));
    context.clearRect(0, 0, width, height);
    context.beginPath();
    path(graticule);
    context.lineWidth = 1;
    context.strokeStyle = dark ? "#666" : "#aaa";
    context.stroke();
    context.beginPath();
    path(sphere);
    context.lineWidth = 1.5;
    context.strokeStyle = dark ? "#fff" : "#000";
    context.stroke();
    context.beginPath();
    path(equator);
    context.lineWidth = 1.5;
    context.strokeStyle = "#f00";
    context.stroke();
  }
}
```

```js echo
function interpolateProjection(raw0, raw1) {
  const mutate = d3.geoProjectionMutator((t) => (x, y) => {
    const [x0, y0] = raw0(x, y),
      [x1, y1] = raw1(x, y);
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
  });
  let t = 0;
  return Object.assign(mutate(t), {
    alpha(_) {
      return arguments.length ? mutate((t = +_)) : t;
    }
  });
}
```

```js echo
const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
  .scale(scale(0))
  .translate([width / 2, height / 2])
  .rotate(rotate(0))
  .precision(0.1);
```

```js echo
const rotate = d3.interpolate([10, -20], [0, 0]);
const scale = d3.interpolate(width / 4, (width - 2) / (2 * Math.PI));
const height = width / 1.8;

const equator = {
  type: "LineString",
  coordinates: [
    [-180, 0],
    [-90, 0],
    [0, 0],
    [90, 0],
    [180, 0]
  ]
};

const sphere = {type: "Sphere"};

const graticule = d3.geoGraticule10();
```

```js echo
import {context2d} from "/components/DOM.js";
```
