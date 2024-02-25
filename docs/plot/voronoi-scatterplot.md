---
source: https://observablehq.com/@observablehq/plot-voronoi-scatterplot
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Voronoi scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Voronoi scatterplot

The [voronoi](https://observablehq.com/plot/marks/voronoi) mark computes the region closest to each point.

```js echo
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.voronoi(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
      fillOpacity: 0.2,
      stroke: "var(--vp-c-bg)"
    }),
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species"
    })
  ]
});
```
