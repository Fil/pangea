---
source: https://observablehq.com/@d3/geotiff-contours-ii
index: true
---

# GeoTIFF contours

These contours are computed in equirectangular coordinates and then reprojected.

```js echo
display(svg`<svg style="width: 100%; height: auto; display: block;" viewBox="0 0 960 500">
  <g stroke="#000" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round">
    ${Array.from(contours(values), (d) => svg`<path d="${path(invert(d))}" fill="${color(d.value)}" />`)}
  </g>
</svg>`);
```

```js echo
const projection = d3.geoNaturalEarth1().precision(0.1);
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const contours = d3.contours().size([n, m]);
```

```js echo
const color = d3.scaleSequential(d3.extent(values), d3.interpolateMagma);
```

```js echo
const image = tiff.getImage();
```

```js echo
const values = rotate((await image.readRasters())[0]);
```

```js echo
const n = image.getWidth();
```

```js echo
const m = image.getHeight();
```

The _rotate_ function rotates a GeoTIFF’s longitude from ${tex`[0, 360]`} to ${tex`[-180, +180]`}.

```js echo
function rotate(values) {
  var l = n >> 1;
  for (var j = 0, k = 0; j < m; ++j, k += n) {
    values.subarray(k, k + l).reverse();
    values.subarray(k + l, k + n).reverse();
    values.subarray(k, k + n).reverse();
  }
  return values;
}
```

The _invert_ function converts [*x*, *y*] in pixel coordinates to [*longitude*, *latitude*]. This assumes the source GeoTIFF is in equirectangular coordinates.

Inverting the projection breaks the polygon ring associations: holes are no longer inside their exterior rings. Fortunately, since the winding order of the rings is consistent and we’re now in spherical coordinates, we can just merge everything into a single polygon!

```js echo
function invert(d) {
  const shared = {};

  let p = {
    type: "Polygon",
    coordinates: d3.merge(
      d.coordinates.map((polygon) => {
        return polygon.map((ring) => {
          return ring
            .map((point) => {
              return [(point[0] / n) * 360 - 180, 90 - (point[1] / m) * 180];
            })
            .reverse();
        });
      })
    )
  };

  // Record the y-intersections with the antimeridian.
  p.coordinates.forEach((ring) => {
    ring.forEach((p) => {
      if (p[0] === -180) shared[p[1]] |= 1;
      else if (p[0] === 180) shared[p[1]] |= 2;
    });
  });

  // Offset any unshared antimeridian points to prevent their stitching.
  p.coordinates.forEach((ring) => {
    ring.forEach((p) => {
      if ((p[0] === -180 || p[0] === 180) && shared[p[1]] !== 3) {
        p[0] = p[0] === -180 ? -179.9995 : 179.9995;
      }
    });
  });

  p = d3P.geoStitch(p);

  // If the MultiPolygon is empty, treat it as the Sphere.
  return p.coordinates.length ? {type: "Polygon", coordinates: p.coordinates} : {type: "Sphere"};
}
```

```js echo
const tiff = FileAttachment("/data/sfctmp.tiff")
  .arrayBuffer()
  .then((buffer) => GeoTIFF.fromArrayBuffer(buffer));
```

```js echo
import * as GeoTIFF from "npm:geotiff@2.0.7";
import * as d3P from "npm:d3-geo-projection@4";
```

Alternatively, consider using [Observable Plot](https://observablehq.com/plot/)’s concise API to recreate this map [in a dozen lines of code](/party/geotiff).
