---
source: https://observablehq.com/@d3/tissots-indicatrix
index: true
---

# Tissot’s indicatrix

These are not true [Tissot’s indicatrices](https://en.wikipedia.org/wiki/Tissot's_indicatrix), which visualize a projection’s distortion by computing partial derivatives at specific points; instead, the red shapes are [small circles](https://d3js.org/d3-geo/shape#geoCircle) of radius 2.5° (about ${km.toFixed()}km). This gives a more intuitive representation of areal and shape distortion.

```js
const km = 2.5 * Math.PI / 180 * 6371;
```

```js
const projName = view(Inputs.select(projections.map(d => d.name), {
  label: "projection",
  value: new URLSearchParams(location.search).get("projection") || "American polyconic"
}));
```

```js
const projection = projections.find(({name}) => name === projName).value();
```

```js
const context = context2d(width, height);
const path = d3.geoPath(projection, context);
context.save();
context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
context.beginPath(), path(circles), context.strokeStyle = "#f00", context.stroke();
context.restore();
context.beginPath(), path(outline), context.strokeStyle = "#000", context.stroke();
  display(context.canvas);
```

```js echo
const step = 10;
const circle = d3.geoCircle().center(d => d).radius(step / 4).precision(10);
const coordinates = [];
for (let y = -80; y <= 80; y += step) {
  for (let x = -180; x < 180; x += step) {
    coordinates.push(circle([x, y]).coordinates);
  }
}
const circles = {type: "MultiPolygon", coordinates};
```

---

## Appendix

```js echo
const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
const height = dy;
```

```js echo
const outline = {type: "Sphere"};
```

```js echo
const graticule = d3.geoGraticule10();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json")).then((d) => d.json());
```

```js echo
import {projections} from "/components/projections.js";
import {context2d} from "/components/DOM.js";
```
