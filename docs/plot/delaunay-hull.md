<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Delaunay & hull</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Delaunay & hull

The convex [hull](https://observablehq.com/plot/marks/delaunay#hull-data-options) of a set of points—the polygon with the minimum perimeter that contains all the points—can be computed as a derivative of the Delaunay graph.

```js echo
Plot.plot({
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
})
```
