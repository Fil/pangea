---
source: https://observablehq.com/@observablehq/plot-two-dimensional-faceting
index: true
---

# Two-dimensional faceting

Small multiple charts help comparison across modalities. The horizontal↔︎ [facet](https://observablehq.com/plot/features/facets) shows sex (with the rightmost column representing penguins whose sex field is null, indicating missing data), while the vertical↕︎ facet shows species.

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const penguins = FileAttachment("penguins.csv").csv({typed: true});
```
