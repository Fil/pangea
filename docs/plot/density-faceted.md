---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Density, faceted</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Density, faceted

The [density](https://observablehq.com/plot/marks/density) mark uses the same thresholds across [facets](https://observablehq.com/plot/features/facets), ensuring comparability.

```js echo
Plot.plot({
  marks: [
    Plot.density(penguins, {
      fx: "island",
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "density",
      clip: true
    }),
    Plot.frame()
  ]
});
```
