---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">World map (canvas)</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# World map (canvas)

Compare to [SVG](/@d3/world-map-svg).

```js
const projection = view(
  projectionInput({
    value: new URLSearchParams(location.search).get("projection") || "orthographic"
  })
);
```

```js echo
const map = {
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);
  context.save();
  context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
  context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.restore();
  context.beginPath(), path(outline), context.strokeStyle = "#000", context.stroke();
  return context.canvas;
}
```

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
