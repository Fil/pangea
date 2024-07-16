---
index: true
---

# Polylabel vs. centroid

[polylabel](https://github.com/mapbox/polylabel) is yet another great cartographic utility developed by @mourner. It finds the pole of inaccessibility of a polygon—the point in the interior of a polygon that is at the furthest distance from the edges. Useful to place a label (which explains its name), or tooltips. By contrast with a traditional centroid (or geoCentroid), it is guaranteed to be _inside_ the polygon.

We can import it like so:

```js echo
import polylabel from "npm:polylabel@2";
```

```js
const projection = geoHealpix().rotate([-10, 0]);
```

```js echo
Plot.plot({
  width,
  projection: ({width, height}) => projection.fitSize([width, height], {type: "Sphere"}),
  marks: [
    Plot.geo(mesh),
    Plot.sphere(),
    Plot.dot(countries.features.map((d) => poi(d, projection)), {r: 2, fill: "red"}),
    Plot.tip(countries.features, Plot.pointer(Plot.centroid({
      geometry: (d) => ({type: "Point", coordinates: poi(d, projection) ?? []}),
      title: (d) => d.properties.name,
    })))
  ]
})
```

Note: for more accuracy it’s better to project the data in the target projection. You can use the _alpha_ parameter to change the relative importance of the horizontal vs. vertical directions. For projections that need clipping to the sphere (such as HEALPix, above), prefer the version in [d3-geo-polygon](https://github.com/d3/d3-geo-polygon) — otherwise the dots for Antarctica, Canada and Russia might be poorly chosen.

```js echo
function poi(g, projection = d3.geoIdentity().reflectY(true), alpha = 2) {
  const polygons = [];
  const holes = [];
  let ring;
  const context = {
    arc(x, y) {},
    moveTo(x, y) {
      ring = [[x, -alpha * y]];
    },
    lineTo(x, y) {
      ring.push([x, -alpha * y]);
    },
    closePath() {
      ring.push(ring[0]);
      if (d3.polygonArea(ring) > 0) polygons.push([ring]);
      else holes.push(ring);
    }
  };
  d3.geoPath(projection, context)(g);
  for (const h of holes)
    polygons.find(([ring]) => d3.polygonContains(ring, h[0]))?.push(h);
  const a = d3.greatest(
    polygons.map((d) => polylabel(d)),
    (d) => d.distance
  );
  return a
    ? projection.invert([a[0], -a[1] / alpha])
    : d3.geoPath(projection).centroid(g);
}
```

```js echo
const world = await fetch(import.meta.resolve("npm:visionscarto-world-atlas@1.0.0/world/110m.json")).then((response) => response.json());
const countries = topojson.feature(world, world.objects.countries);
const mesh = topojson.mesh(world, world.objects.countries);
```

```js
import {geoHealpix} from "npm:d3-geo-polygon@next";
```
