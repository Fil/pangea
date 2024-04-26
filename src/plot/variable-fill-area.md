---
source: https://observablehq.com/@observablehq/plot-variable-fill-area
index: true
---

# Variable fill area

Set the **z** option to null for [area](https://observablehq.com/plot/marks/area) (or [line](./window-and-map)) charts that represent a single series of data with a varying color.

```js echo
const chart = Plot.plot({
  color: {
    type: "log",
    legend: true
  },
  marks: [Plot.areaY(aapl, {x: "Date", y: "Close", fill: "Volume", z: null}), Plot.ruleY([0])]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
