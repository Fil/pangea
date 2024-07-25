---
source: https://observablehq.com/@d3/projection-comparison
index: true
---

# Projection comparison

Choose two projections below to compare.

```js
const redName = view(Inputs.select(projections.map(d => d.name), {
  label: "red",
  value: new URLSearchParams(location.search).get("red") || "American polyconic"
}));
```

```js
const blueName = view(Inputs.select(projections.map(d => d.name), {
  label: "blue",
  value: new URLSearchParams(location.search).get("blue") || "rectangular polyconic"
}));
```

```js
const outline = ({type: "Sphere"});
const graticule = d3.geoGraticule10();
const land = topojson.feature(world, world.objects.land);

const red = projections.find(({name}) => name === redName).value();
const blue = projections.find(({name}) => name === blueName).value();

const heightRed = fitWidth(red);
const heightBlue = fitWidth(blue);
const height = Math.max(heightRed, heightBlue);

const context = context2d(width, height);

function render(projection, color) {
  const path = d3.geoPath(projection, context);
  context.fillStyle = context.strokeStyle = color;
  context.save();
  context.beginPath(), path(outline), context.clip();
  context.beginPath(), path(graticule), context.globalAlpha = 0.3, context.stroke();
  context.beginPath(), path(land), context.globalAlpha = 1.0, context.fill();
  context.restore();
  context.beginPath(), path(outline), context.stroke();
}

context.fillStyle = dark ? "#000" : "#fff";
context.fillRect(0, 0, width, height);

context.save();
context.translate(0, (height - heightRed) / 2);
render(red, "#f40");
context.restore();

context.save();
context.globalCompositeOperation = dark ? "lighter" : "multiply";
context.translate(0, (height - heightBlue) / 2);
render(blue, "#0af");
context.restore();

display(context.canvas);

function fitWidth(projection) {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
```

---

Here is a list of (almost) all the available projections in [d3-geo](https://d3js.org/d3-geo) (`d3`) and [d3-geo-projection](https://github.com/d3/d3-geo-projection) (`d3P`); for more, see also [d3-geo-polygon](https://github.com/d3/d3-geo-polygon).

```js echo
import {projections} from "/components/projections.js";
```

```js
world
```

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json")).then((response) => response.json());
```

```js echo
import * as d3P from "npm:d3-geo-projection@4";
import {context2d} from "/components/DOM.js";
```
