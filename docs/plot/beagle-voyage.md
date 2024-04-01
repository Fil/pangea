---
source: https://observablehq.com/@observablehq/plot-spherical-line-with-a-varying-stroke
index: true
---

# Spherical line with a varying stroke

Set the **z** option to null for [line](https://observablehq.com/plot/marks/line) charts that represent a single series of data with a varying color. This also works with the geodesic [curve](https://observablehq.com/plot/features/curves) used for map [projections](https://observablehq.com/plot/features/projections)!

```js echo
const chart = Plot.plot({
  projection: "equirectangular",
  marks: [Plot.geo(land), Plot.line(beagle, {stroke: (d, i) => i, z: null})]
});

display(chart);
```

```js echo
const beagle = FileAttachment("../data/beagle.csv").csv({array: true, typed: true});
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
