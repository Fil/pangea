---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Tissot’s indicatrix</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Tissot’s indicatrix

These are not true [Tissot’s indicatrices](https://en.wikipedia.org/wiki/Tissot's_indicatrix), which visualize a projection’s distortion by computing partial derivatives at specific points; instead, the red shapes are [small circles](https://d3js.org/d3-geo/shape#geoCircle) of radius 2.5° (about ${(2.5 _ Math.PI / 180 _ 6371).toFixed()}km). This gives a more intuitive representation of areal and shape distortion.

```js
viewof projection = projectionInput({
  name: "projection",
  value: new URLSearchParams(html`<a href>`.search).get("projection") || "American polyconic"
})
```

```js
const map = {
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);
  context.save();
  context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
  context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.beginPath(), path(circles), context.strokeStyle = "#f00", context.stroke();
  context.restore();
  context.beginPath(), path(outline), context.strokeStyle = "#000", context.stroke();
  return context.canvas;
}
```

```js echo
const circles = {
  const step = 10;
  const circle = d3.geoCircle().center(d => d).radius(step / 4).precision(10);
  const coordinates = [];
  for (let y = -80; y <= 80; y += step) {
    for (let x = -180; x < 180; x += step) {
      coordinates.push(circle([x, y]).coordinates);
    }
  }
  return {type: "MultiPolygon", coordinates};
}
```

---

## Appendix

```js echo
const height = {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
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
const world = FileAttachment("land-50m.json").json();
```

```js echo
const d3 = require("d3-geo@3", "d3-geo-projection@4");
```

```js echo
import {projectionInput} from "@d3/projection-comparison";
```
