---
source: https://observablehq.com/@observablehq/plot-colored-stacked-bar-chart
index: true
---

# Stacked unit chart

Each penguin in the dataset is represented by a [bar](https://observablehq.com/plot/marks/bar) of width _x_ = 1; bars are implicitly [stacked](https://observablehq.com/plot/transforms/stack), resulting in this unit chart.

```js echo
const chart = Plot.plot({
  marginLeft: 60,
  x: {label: "Frequency →"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(penguins, {
      y: "species",
      x: 1,
      inset: 0.5,
      fill: "body_mass_g",
      sort: "body_mass_g"
    }),
    Plot.ruleX([0])
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
