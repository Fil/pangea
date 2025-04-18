---
source: https://observablehq.com/@d3/vector-field
index: true
---

# Vector field

This map shows the speed (size) and direction (orientation and color) of simulated wind. Based on a [Vega](https://vega.github.io/vega/examples/wind-vectors/) and [LitVis example](https://github.com/gicentre/litvis/blob/master/examples/windVectors.md).

```js echo
const projection = d3.geoEquirectangular();

// Specify the dimensions.
const width = 928;
const margin = 10;

// Compute the height
const points = {type: "MultiPoint", coordinates: data.map(d => [d.longitude, d.latitude])};
const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width - margin * 2, points)).bounds(points);
const [tx, ty] = projection.translate();
const height = Math.ceil(y1 - y0) + margin * 2;
projection.translate([tx + margin, ty + margin]);

// Create the scales.
const length = d3.scaleSqrt([0, d3.max(data, d => d.speed)], [0, 2]);
const color = d3.scaleSequential([0, 360], d3.interpolateRainbow);

const context = context2d(width, height);
const path = d3.geoPath(projection, context);
context.canvas.style.maxWidth = "100%";
context.fillRect(0, 0, width, height);
context.strokeStyle = "#eee";
context.lineWidth = 1.5;
context.lineJoin = "round";
context.beginPath(), path(land), context.stroke();
for (const {longitude, latitude, speed, dir} of data) {
  context.save();
  context.translate(...projection([longitude, latitude]));
  context.scale(length(speed), length(speed));
  context.rotate(dir * Math.PI / 180);
  context.beginPath();
  context.moveTo(-2, -2);
  context.lineTo(2, -2);
  context.lineTo(0, 8);
  context.closePath();
  context.fillStyle = color(dir);
  context.fill();
  context.restore();
}
display(context.canvas);
```

```js
display(data)
```

```js echo
const data = await FileAttachment("/data/wind.csv").csv({typed: true});
for (const d of data) {
  d.dir = 180 / Math.PI * Math.atan2(d.u, d.v);
  d.speed = Math.hypot(d.u, d.v);
}
```

```js echo
const land = topojson.feature(world, world.objects.land);
```

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json")).then((d) => d.json());
```

Or, using [Observable Plot](https://observablehq.com/plot/)’s concise API:

```js echo
display(Plot.plot({
  width: 800,
  height: 604,
  projection: {
    type: "equirectangular",
    domain: {
      type: "MultiPoint",
      coordinates: [
        [d3.min(data, (d) => d.longitude) - 0.3, d3.min(data, (d) => d.latitude) - 0.3],
        [d3.max(data, (d) => d.longitude) + 0.3, d3.max(data, (d) => d.latitude) + 0.3]
      ]
    }
  },
  color: {scheme: "Rainbow", domain: [0, 360]},
  length: {type: "sqrt", range: [0, 12]},
  marks: [
    Plot.vector(data, {
      x: "longitude",
      y: "latitude",
      stroke: "dir",
      rotate: (d) => 180 + d.dir,
      length: "speed"
    }),
    Plot.geo(land, {stroke: "white", clip: true}),
    Plot.frame({stroke: "#000", strokeWidth: 2})
  ],
  style: "background: black;"
}));
```

```js echo
import {context2d} from "/components/DOM.js"
```
