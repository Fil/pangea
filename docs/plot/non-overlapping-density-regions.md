---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Non-overlapping density regions</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Non-overlapping density regions

By specifying a negative [weight](https://observablehq.com/plot/marks/density#density-options) for some points, we make them repulsive to the density contours—this technique limits overlapping and occlusion.

```js echo
Plot.plot({
  inset: 10,
  color: {legend: true},
  marks: [
    d3
      .groups(penguins, (d) => d.species)
      .map(([s]) =>
        Plot.density(penguins, {
          x: "flipper_length_mm",
          y: "culmen_length_mm",
          weight: (d) => (d.species === s ? 1 : -1),
          fill: () => s,
          fillOpacity: 0.2,
          thresholds: [0.05]
        })
      ),
    Plot.dot(penguins, {
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "species"
    }),
    Plot.frame()
  ]
});
```
