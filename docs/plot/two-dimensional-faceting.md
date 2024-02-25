---
source: https://observablehq.com/@observablehq/plot-two-dimensional-faceting
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Two-dimensional faceting</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Two-dimensional faceting

Small multiple charts help comparison across modalities. The horizontal↔︎ [facet](https://observablehq.com/plot/features/facets) shows sex (with the rightmost column representing penguins whose sex field is null, indicating missing data), while the vertical↕︎ facet shows species.

```js echo
Plot.plot({
  grid: true,
  marginRight: 60,
  facet: {label: null},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species"
    })
  ]
});
```
