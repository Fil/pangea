---
source: https://observablehq.com/@observablehq/plot-window-and-map
index: true
---

# Difference stroke

Set the **z** option to null for [line](https://observablehq.com/plot/marks/line) (or [area](https://observablehq.com/@observablehq/plot-variable-fill-area)) charts that represent a single series of data with a varying color. Here a [window](https://observablehq.com/plot/transforms/window) transform with a _difference_ reducer is applied to the data and informs the stroke channel.

```js echo
const chart = Plot.plot({
  y: {grid: true},
  color: {scheme: "BuYlRd", domain: [-0.5, 0.5]},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(
      bls,
      Plot.map(
        {stroke: Plot.window({k: 2, reduce: "difference"})},
        {x: "date", y: "unemployment", z: "division", stroke: "unemployment"}
      )
    )
  ]
});

display(chart);
```

```js echo
const bls = FileAttachment("../data/bls-metro-unemployment.csv").csv({typed: true});
```
