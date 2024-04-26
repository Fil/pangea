---
source: https://observablehq.com/@observablehq/plot-density-faceted
index: true
---

# Density, faceted

The [density](https://observablehq.com/plot/marks/density) mark uses the same thresholds across [facets](https://observablehq.com/plot/features/facets), ensuring comparability.

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
