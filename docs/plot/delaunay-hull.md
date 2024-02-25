---
index: true
---

# Delaunay & hull

The convex [hull](https://observablehq.com/plot/marks/delaunay#hull-data-options) of a set of points—the polygon with the minimum perimeter that contains all the points—can be computed as a derivative of the Delaunay graph.

```js echo
const chart = Plot.plot({
  marks: [
    Plot.delaunayMesh(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      z: "species",
      stroke: "species",
      strokeOpacity: 0.6
    }),
    Plot.hull(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      stroke: "species",
      strokeWidth: 2
    })
  ]
});

display(chart);
```

```js
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
