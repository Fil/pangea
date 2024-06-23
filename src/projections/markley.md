---
index: true
source: https://observablehq.com/@fil/markley
---

# Markley’s tetrahedral map

F. Landis Markley’s projection (1982) —see [PDF](#PDF) below— is an aspect of the conformal projection in a tetrahedron proposed by Hermann A. Schwarz in 1869 and [Laurence P. Lee](https://visionscarto.net/projection-de-lee) in 1965. It is designed in a way that limits the distortion of land features. The four vertices of the tetrahedron are in the ocean, and the full earth is rendered in a rectangle. The projection was designed as an alternative to [Guyou’s](https://observablehq.com/@d3/guyou).

```js
{
  const height = width * sqrt3_4;

  const context = context2d(width, height);
  context.fillStyle = dark ? "black" : "white";
  context.fillRect(0, 0, width, height);

  const projection = tetrahedralMarkley().fitSize([width, height], {
    type: "Sphere"
  });

  const path = d3.geoPath(projection, context);

  context.fillStyle = context.strokeStyle = dark ? "white" : "black";

  context.beginPath();
  path(land);
  context.fill();

  context.beginPath();
  context.lineWidth = 0.5;
  path(d3.geoGraticule10());
  context.stroke();

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = dark ? "white" : "black";
  path({ type: "Sphere" });
  context.stroke();

  display(context.canvas);
}
```

The map’s aspect ratio is ${tex`\sqrt{3}/4`}:

```js echo
const sqrt3_4 = sqrt(3) / 4
```

```js echo
const height = width * sqrt3_4
```

The map is organized on a tetrahedron, and thus has 4 singularities, placed far enough from the land:

> “at latitudes ±35.26439° ${tex`= ± \frac12 \cos^{-1}(\frac13)`}, with the northern ones at longitudes 25° W and 155° E and the southern ones at longitudes 115° W and 65° E.”

```js echo
const vertices = [
  [-25, acos(1 / 3) * .5 * degrees],
  [155, acos(1 / 3) * .5 * degrees],
  [-115, -acos(1 / 3) * .5 * degrees],
  [65, -acos(1 / 3) * .5 * degrees]
]
```

---

This projection can be tiled, resulting in a beautiful infinite conformal wallpaper.

```js
const tiled = (async () => {
  await visibility();

  const context = context2d(width, 2.75 * height);
  context.fillStyle = dark ? "black" : "white";
  context.fillRect(0, 0, width, 2.75 * height);
  context.translate(width / 2, height / 2);
  context.scale(0.5, 0.5);
  context.fillStyle = dark ? "white" : "black";

  const projection = tetrahedralMarkley()
    .fitSize([width, height], {
      type: "Sphere"
    })
    .center([20, 0])
    .translate([0, 0]);

  const path = d3.geoPath(projection, context);

  for (let i = -2; i <= 1; i++) {
    for (let j = 0; j <= 2; j++) {
      context.save();
      context.translate((i + (j % 2) / 2) * width, 2 * j * height);
      for (const [r, x, y] of [[Math.PI, -width * 0.25, -height], [0, 0, 0]]) {
        context.save();

        context.translate(x, y);
        context.rotate(r);
        context.scale(1, 1.001); // avoids a subpixel gap where the map is cut (Antarctica, Kamtchatka)

        context.beginPath();
        path(land);
        context.fill();

        context.beginPath();
        context.lineWidth = 0.25;
        path(d3.geoGraticule10());
        context.strokeStyle = dark ? "white" : "black";
        context.stroke();

        context.restore();
        display(context.canvas);
      }

      context.restore();
    }
  }
})();
```

The diagram below shows its construction as the juxtaposition of four copies of tetrahedralLee, with the proper spherical rotation and planar transform:

```js
const diagram = (async () => {
  await visibility();

  const projection = geoTetrahedralLee().rotate(rotate);
  const context = context2d(width, height * 0.9);
  context.scale(0.8, 0.8);
  context.translate(width * 0.1, height * 0.1);
  context.fillStyle = dark ? "black" : "white";
  context.strokeStyle = dark ? "white" : "black";
  context.fillRect(0, 0, width, height);

  const path = d3.geoPath(projection, context);

  projection
    .center(d3.geoRotation(projection.rotate())([20, 0]))
    .translate([0, 0])
    .scale(height * 0.476);

  for (const [r, x, y, c] of [
    [0, 0, 0, "green"],
    [Math.PI, -width * 0.25, -height, "red"],
    [0, -width, 0, "blue"],
    [Math.PI, width * .75, -height, "orange"]
  ]) {
    context.save();
    context.translate(width / 2, height / 2);
    context.fillStyle = context.strokeStyle = c;

    context.translate(x, y);
    context.rotate(r);

    context.beginPath();
    context.globalAlpha = 0.1;
    path({ type: "Sphere" });
    context.fill();
    context.globalAlpha = 1;

    context.beginPath();
    path(land);
    context.fill();

    context.beginPath();
    context.lineWidth = 0.5;
    path(d3.geoGraticule10());
    context.stroke();

    context.beginPath();
    context.lineWidth = 1.5;
    path({ type: "Sphere" });
    context.stroke();

    context.restore();
  }

  context.strokeStyle = "#000";
  context.lineWidth = 4;
  context.strokeRect(0, 0, width, height);
  display(context.canvas);
})();
```

```js echo
const rotate = [115, acos(1 / 3) * .5 * degrees - 90, 180]
```

### Clipping polygon

To properly clip the geographic shapes (lines and polygons), we need to do an inverse projection of the bounding rectangle, to spherical coordinates. We show the result in green on the globe below, with a bit of exaggeration of the “gap”—the actual clipping polygon is tighter.

Note how it does (and MUST do) a U-turn on each of the 4 singular points (in red), since the total angular excess of the sphere (4π) is concentrated in these 4 points.

```js
{
  const projection = d3
    .geoOrthographic()
    .rotate([160, -15])
    .fitSize([width, 500], { type: "Sphere" });
  const context = context2d(width, 500);
  const path = d3.geoPath(projection, context);

  function render() {
    context.clearRect(0, 0, width, 500);
    context.strokeStyle = context.fillStyle = dark ? "white" : "black";
    context.beginPath();
    path({ type: "Sphere" });
    context.stroke();
    context.clip();

    context.beginPath();
    path(land);
    context.fill();

    const graticule = d3.geoGraticule10();
    context.beginPath();
    context.lineWidth = 0.25;
    path(graticule);
    context.stroke();

    context.beginPath();
    path({ type: "LineString", coordinates: clipPolygon(0.01).coordinates[0] });
    context.lineWidth = 1;
    context.strokeStyle = "green";
    context.stroke();

    context.beginPath();
    path({ type: "MultiPoint", coordinates: vertices });
    context.fillStyle = "red";
    context.fill();
  }
  display(d3
    .select(context.canvas)
    .call(drag(projection).on("drag.render", render))
    .call(render)
    .node());
}
```

## Code for the projection

The projection is defined by two elements:

1. the raw projection, which uses geoTetrahedralLee under the hood, then reassembles the pieces (cut from the colored triangles) into the rectangle. It includes the inverse raw projection.
2. The clipping polygon, in spherical coordinates. It is computed by the inverse projection of selected points along the edge of the polygon. The selection was made as a balance between precision (more edges give better results) and speed (less edges is faster).

```js echo
const tetrahedralMarkley = () =>
  d3.geoProjection(tetrahedralMarkleyRaw)
    .preclip(geoClipPolygon(clipPolygon()))
```

```js echo
const tetrahedralMarkleyRaw = (() => {
  const rawLee = geoTetrahedralLee()
    .rotate(rotate)
    .fitExtent([[-4, -1.5 / sqrt3_4], [4, 1.5 / sqrt3_4]], {
      type: "Sphere"
    });

  const forward = (l, p) => {
    let [x, y] = rawLee([l * degrees, p * degrees]);
    if (y < 0) {
      x = -x - 4;
      if (x < -5) x += 8;
      y = -y;
    }
    if (x > 3) x -= 8;
    return [x, -y];
  };

  // see the diagram for colors
  forward.invert = (x, y) => {
    const a =
      rawLee.invert([x, -y]) || // green
      (x > 0 && rawLee.invert([4 - x, y])) || // orange
      (x < 0 && rawLee.invert([-4 - x, y])) || // red
      (x < 0 && rawLee.invert([8 + x, -y])); // blue

    if (a) return [a[0] * radians, a[1] * radians];
  };

  return forward;
})();
```

```js echo
const clipPolygon = (e) => {
  const raw = tetrahedralMarkleyRaw;
  if (e === undefined) e = .001;
  const lin = (s, e, n) => d3.range(n).map(i => s + ((e - s) * i) / n);
  const x0 = -7 + e;
  const x1 = 1 - e;
  const y0 = e;
  const y1 = 1.5 / sqrt3_4 - e;
  const ring = []
    .concat(
      lin(y0, y1, 38).map(y => [x0, y]),
      lin(x0, x1, 9).map(x => [x, y1]),
      lin(y1, y0, 38).map(y => [x1, y]),
      lin(x1, x0, 9).map(x => [x, y0])
    )
    .map(d => raw.invert(...d).map(d => d * degrees));
  ring.push(ring[0]);
  return {type: "Polygon", coordinates: [ring]};
}
```

<a name="PDF" href="#PDF"></a>

---

## Markley’s paper

With this notebook, we are publishing Dr. F. Landis Markley’s paper describing the projection’s history and concept, as well as the original matlab code used to generate the maps in the PDF. Download <!-- or read -->below.

<pre>${html`🅿🅳🅵 <a href="${FileAttachment("Tetrahedral-map-projection-with-appendix.pdf").href}"
  download="Markley-Tetrahedral-map-projection.pdf" target="_blank">Tetrahedral map projection with appendix.pdf</a>`}
</pre>

<pre>${html`🅼 <a href="${FileAttachment("matlab.zip").href}"
  download="matlab.zip" target="_blank">matlab.zip</a>`}
</pre>

```js
import {geoClipPolygon, geoTetrahedralLee} from "npm:d3-geo-polygon";
import { acos, degrees, radians, sqrt } from "/components/math.js";
import {context2d} from "/components/DOM.js";
import {drag} from "../components/versor-dragging.js";
```

```js
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
