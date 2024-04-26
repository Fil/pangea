---
source: https://observablehq.com/@observablehq/plot-data-based-axis
index: true
---

# Data-based axis

A vertical [axis](https://observablehq.com/plot/marks/axis) mark extends from the left (or from the right), but by specifying the _x_ channel, we can change the position where the labels are shown, and the extent of the corresponding [grid](https://observablehq.com/plot/marks/grid) lines.

```js echo
const chart = Plot.plot({
  marginRight: 0,
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.gridY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6}),
    Plot.axisY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6, textStroke: "var(--plot-background)"})
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
