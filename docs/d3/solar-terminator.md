---
source: https://observablehq.com/@d3/solar-terminator
index: false
draft: true
---

```js
md`
# Solar Terminator

It is currently night in the blue region.
`;
```

```js echo
const map = {
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);
  context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.beginPath(), path(night), context.fillStyle = "rgba(0,0,255,0.3)", context.fill();
  context.beginPath(), path(sphere), context.strokeStyle = "#000", context.stroke();
  return context.canvas;
}
```

```js echo
const height = {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
```

```js echo
const projection = d3.geoNaturalEarth1();
```

```js echo
const sun = {
  const now = new Date;
  const day = new Date(+now).setUTCHours(0, 0, 0, 0);
  const t = solar.century(now);
  const longitude = (day - now) / 864e5 * 360 - 180;
  return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
}
```

```js echo
const night = d3.geoCircle().radius(90).center(antipode(sun))();
```

```js echo
const antipode = ([longitude, latitude]) => [longitude + 180, -latitude];
```

```js echo
const sphere = {type: "Sphere"};
```

```js echo
const graticule = d3.geoGraticule10();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```

```js echo
const world = fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json").then((response) => response.json());
```

```js echo
const topojson = require("topojson-client@3");
```

```js echo
const d3 = require("d3-geo@1");
```

```js echo
const solar = require("solar-calculator@0.3/dist/solar-calculator.min.js");
```
