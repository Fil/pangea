---
source: https://observablehq.com/@d3/spilhaus-shoreline-map
index: true
---

# Spilhaus shoreline map

Ref. [jasondavies.com/maps/spilhaus](https://jasondavies.com/maps/spilhaus/)

```js echo
const height = width;
const context = context2d(width, height);
const projection = d3.geoStereographic()
  .rotate([95, 45])
  .translate([width / 2, height / 2])
  .scale(width / 10.1)
  .center([30, -5])
  .clipAngle(166);
const path = d3.geoPath(projection, context);

const land = topojson.feature(world, world.objects.land);

context.strokeStyle = dark ? "#fff" : "#000";
context.fillStyle = dark ? "#000" : "#fff";
context.fillRect(0, 0, width, height);

context.lineJoin = "round";
context.lineCap = "round";

context.beginPath();
path({type: "Sphere"});
path(land);
context.lineWidth = 0.5;
context.stroke();
context.clip("evenodd");

context.save();
context.beginPath();
path(land);
context.filter = "blur(12px)";
context.fillStyle = dark ? "#555" : "#aaa";
context.fill("evenodd");
context.restore();

context.beginPath();
path(d3.geoGraticule10());
context.globalAlpha = 0.2;
context.strokeStyle = dark ? "#fff" : "#000";
context.stroke();

display(context.canvas);

```

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json")).then((d) => d.json());
```

```js echo
import {context2d} from "/components/DOM.js"
```
