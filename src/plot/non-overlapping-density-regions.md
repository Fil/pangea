---
source: https://observablehq.com/@observablehq/plot-non-overlapping-density-regions
index: true
---

# Non-overlapping density regions

By specifying a negative [weight](https://observablehq.com/plot/marks/density#density-options) for some points, we make them repulsive to the density contours—this technique limits overlapping and occlusion.

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
