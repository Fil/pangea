---
source: https://observablehq.com/@d3/world-map
index: true
---

# World map (canvas)

Compare to [SVG](https://observablehq.com/@d3/world-map-svg).

```js
const projName = view(Inputs.select(projections.map(d => d.name), {
  label: "projection",
  value: new URLSearchParams(location.search).get("projection") || "American polyconic"
}));
```

```js
const projection = projections.find(({name}) => name === projName).value();
```

```js echo
const context = context2d(width, height);
const path = d3.geoPath(projection, context);
context.save();
context.beginPath(), path(outline), context.clip(), context.fillStyle = dark ? "#000" : "#fff", context.fillRect(0, 0, width, height);
context.beginPath(), path(graticule), context.strokeStyle = dark ? "#666" : "#ccc", context.stroke();
context.beginPath(), path(land), context.fillStyle = dark ? "#fff" : "#000", context.fill();
context.restore();
context.beginPath(), path(outline), context.strokeStyle = dark ? "#fff" : "#000", context.stroke();
display(context.canvas);
```

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
