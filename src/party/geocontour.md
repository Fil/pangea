---
index: true
keywords: geo, voronoi, contour
source: https://observablehq.com/@fil/spherical-contours
---

# Spherical contours

Instead of drawing contours with Plot as in the [Geotiff example](../party/geotiff), we can compute spherical contours with d3.**geoContour**:

```js echo
import {geoContour} from "npm:d3-geo-voronoi";
import {geoBertin1953} from "npm:d3-geo-projection";
import {context2d} from "../components/DOM.js";
const points = FileAttachment("../data/world-temperatures.json").json();
```

```js echo
const contour = geoContour().thresholds(500);
const contours = ({
  type: "FeatureCollection",
  features: [{ type: "Sphere", value: -50 }, ...contour(points)]
});
```

```js echo
const height = ((width * 2) / 3) | 0;
const color = d3.scaleSequential(d3.interpolateRdBu).domain([40, -20]);
const projection = geoBertin1953().fitExtent([[0, 0], [width, height]], {type: "Sphere"});

const context = context2d(width, height);
const path = d3.geoPath(projection).context(context);
const rawpath = d3.geoPath().context(context);

context.clearRect(0, 0, width, height);

context.save();
context.beginPath();
path({ type: "Sphere" });
context.lineWidth = 2;
context.stroke();
context.clip();

contours.features.forEach(d => {
  context.beginPath();
  path(d);
  context.fillStyle = color(d.value);
  context.fill();
});

contours.features
  .filter(d => d.type === "MultiPolygon")
  .forEach(d => {
    const i = d.value % 10;
    const l = i === 0 ? 1 : i % 2 === 0 ? 0.25 : 0;
    if (l) {
      context.beginPath();
      const e = {
        type: "MultiLineString",
        coordinates: d.coordinates.flat()
      };
      path(e);
      context.strokeStyle = "#333";
      context.lineWidth = l;
      context.stroke();
    }
  });

context.lineWidth = 0.5;
context.strokeStyle = "white";
context.beginPath();
path(land);
context.stroke();

context.beginPath();
path({ type: "Sphere" });
context.strokeStyle = "#000";
context.lineWidth = 2;
context.stroke();

context.restore();

context.beginPath();
path.pointRadius(1)({
  type: "MultiPoint",
  coordinates: points
});
context.fillStyle = "white";
context.fill();

display(context.canvas);
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
