---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Spherical line with a varying stroke</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Spherical line with a varying stroke

Set the **z** option to null for [line](https://observablehq.com/plot/marks/line) charts that represent a single series of data with a varying color. This also works with the geodesic [curve](https://observablehq.com/plot/features/curves) used for map [projections](https://observablehq.com/plot/features/projections)!

```js echo
Plot.plot({
  projection: "equirectangular",
  marks: [Plot.geo(land), Plot.line(beagle, {stroke: (d, i) => i, z: null})]
});
```

```js echo
const beagle = FileAttachment("beagle.csv").csv({array: true, typed: true});
```

```js echo
const world = FileAttachment("countries-110m.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
