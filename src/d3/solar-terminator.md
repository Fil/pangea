---
source: https://observablehq.com/@d3/solar-terminator
index: true
author: Mike Bostock
---

# Solar Terminator

It is currently night in the blue region.

```js echo
import {context2d} from "/components/DOM.js";
const context = context2d(width, height);
const path = d3.geoPath(projection, context);
context.fillStyle = "#fff";
context.fillRect(0, 0, width, height);
context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
context.beginPath(), path(night), context.fillStyle = "rgba(0,0,255,0.3)", context.fill();
context.beginPath(), path(sphere), context.strokeStyle = "#000", context.stroke();
display(context.canvas);
```

```js echo
const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
const height = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), height);
projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
```

```js echo
const projection = d3.geoEqualEarth();
```

```js echo
const sun = (() => {
  const now = new Date;
  const day = new Date(+now).setUTCHours(0, 0, 0, 0);
  const t = solar.century(now);
  const longitude = (day - now) / 864e5 * 360 - 180;
  return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
})();
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
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json")).then((d) => d.json());
```

```js echo
import * as solar from "npm:solar-calculator@0.3";
```
