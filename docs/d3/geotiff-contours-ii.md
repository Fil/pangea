<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">GeoTIFF contours II</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# GeoTIFF contours II

These contours are computed in equirectangular coordinates and then reprojected.

```js echo
chart = html`<svg style="width: 100%; height: auto; display: block;" viewBox="0 0 960 500">
  <g stroke="#000" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round">
    ${Array.from(contours(values), d => svg`<path d="${path(invert(d))}" fill="${color(d.value)}" />`)}
  </g>
</svg>`
```

```js echo
projection = d3.geoNaturalEarth1().precision(0.1)
```

```js echo
path = d3.geoPath(projection)
```

```js echo
contours = d3.contours().size([n, m])
```

```js echo
color = d3.scaleSequential(d3.extent(values), d3.interpolateMagma)
```

```js echo
image = tiff.getImage()
```

```js echo
values = rotate((await image.readRasters())[0])
```

```js echo
n = image.getWidth()
```

```js echo
m = image.getHeight()
```

The *rotate* function rotates a GeoTIFF’s longitude from ${tex`[0, 360]`} to ${tex`[-180, +180]`}.

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

The *invert* function converts [*x*, *y*] in pixel coordinates to [*longitude*, *latitude*]. This assumes the source GeoTIFF is in equirectangular coordinates.

Inverting the projection breaks the polygon ring associations: holes are no longer inside their exterior rings. Fortunately, since the winding order of the rings is consistent and we’re now in spherical coordinates, we can just merge everything into a single polygon!

```js echo
function invert(d) {
  const shared = {};

  let p = {
    type: "Polygon",
    coordinates: d3.merge(d.coordinates.map(polygon => {
      return polygon.map(ring => {
        return ring.map(point => {
          return [point[0] / n * 360 - 180, 90 - point[1] / m * 180];
        }).reverse();
      });
    }))
  };

  // Record the y-intersections with the antimeridian.
  p.coordinates.forEach(ring => {
    ring.forEach(p => {
      if (p[0] === -180) shared[p[1]] |= 1;
      else if (p[0] === 180) shared[p[1]] |= 2;
    });
  });

  // Offset any unshared antimeridian points to prevent their stitching.
  p.coordinates.forEach(ring => {
    ring.forEach(p => {
      if ((p[0] === -180 || p[0] === 180) && shared[p[1]] !== 3) {
        p[0] = p[0] === -180 ? -179.9995 : 179.9995;
      }
    });
  });

  p = d3.geoStitch(p);

  // If the MultiPolygon is empty, treat it as the Sphere.
  return p.coordinates.length
      ? {type: "Polygon", coordinates: p.coordinates}
      : {type: "Sphere"};
}
```

```js echo
tiff = FileAttachment("sfctmp.tiff").arrayBuffer()
  .then(buffer => GeoTIFF.fromArrayBuffer(buffer))
```

```js echo
GeoTIFF = require("geotiff@2.0.7")
```

```js echo
d3 = require("d3@7", "d3-geo-projection@4")
```

Or, using [Observable Plot](/plot/)’s concise API:

```js echo
Plot.plot({
  projection: "equal-earth",
  color: { scheme: "Magma" },
  marks: [Plot.contour(values, {
    x: (_, i) => i % n / 2 - 180,
    y: (_, i) => 90 - Math.floor(i / n) / 2,
    fill: values,
    thresholds: 10,
    stroke: "#000",
    strokeWidth: 0.5,
    clip: "sphere"
  })]
})
```
