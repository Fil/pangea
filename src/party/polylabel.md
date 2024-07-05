---
index: true
---

# Polylabel vs. centroid

[polylabel](https://github.com/mapbox/polylabel) is yet another great cartographic utility developed by @mourner. It finds the pole of inaccessibility of a polygon—the point in the interior of a polygon that is at the furthest distance from the edges. Useful to place labels (hence its name), or tooltips. By contrast with a traditional centroid (or geoCentroid), it is guaranteed to be _inside_ the polygon.

We can import it like so:

```js echo
import polylabel from "npm:@mapbox/polylabel";
```

```js
const projection = geoHealpix().rotate([-10, 0]);
```

```js echo
Plot.plot({
  width,
  projection: ({width, height}) => projection.fitSize([width, height], {type: "Sphere"}),
  marks: [
    Plot.voronoiMesh(countries.features.map((d) => poi(d, projection))),
    Plot.geo(mesh),
    Plot.sphere(),
    Plot.dot(countries.features.map((d) => poi(d, projection)), {
      r: 2,
      fill: "red"
    }),
    Plot.tip(countries.features, Plot.pointer(Plot.centroid({
      geometry: (d) => ({type: "Point", coordinates: poi(d, projection) ?? []}),
      title: d => d.properties.name,
    })))
  ]
})
```

Note: for more accuracy it’s better to project the data in the target projection. You can use the _alpha_ parameter to change the relative importance of the horizontal vs. vertical directions. For projections that need clipping to the sphere (such as HEALPix, above), prefer the version in [d3-geo-polygon](https://github.com/d3/d3-geo-polygon) — otherwise the dots for Antarctica, Canada and Russia might be poorly chosen.

```js echo
function poi(g, projection = d3.geoIdentity().reflectY(true), alpha = 3) {
  const polygons = [];
  let ring;
  const context = {
    moveTo(x, y) {ring = [[x, -alpha * y]];},
    lineTo(x, y) {ring.push([x, -alpha * y])},
    closePath() {
      ring.push(ring[0]);
      if (d3.polygonArea(ring) > 0) polygons.push([ring]);
      else polygons.find((p) => d3.polygonContains(p, ring[0]))?.push(ring); // hole
    },
    arc(x, y) {polygons.push([[[x, -alpha * y]]])} // not used for polygons, but points; makes a fake polygon.
  }
  d3.geoPath(projection, context)(g);
  const a = d3.greatest(polygons, (p) => d3.sum(p, d3.polygonArea));
  if (a) {
    const b = polylabel(a);
    return projection.invert([b[0], -b[1] / alpha]);
  }
}
```

```js echo
const world = await fetch(import.meta.resolve("npm:visionscarto-world-atlas@1.0.0/world/110m.json")).then((response) => response.json());
//world.objects.countries.geometries = world.objects.countries.geometries.filter((d) => d.properties.a3 !== "ATA");
const countries = topojson.feature(world, world.objects.countries);
const mesh = topojson.mesh(world, world.objects.countries);
```

```js
import {geoHealpix} from "npm:d3-geo-polygon@next";
```
