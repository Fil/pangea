---
source: https://observablehq.com/@observablehq/plot-simple-line-chart
index: true
---

# Line chart

The [line](https://observablehq.com/plot/marks/line) mark draws two-dimensional lines.

```js echo
Plot.lineY(aapl, {x: "Date", y: "Close"}).plot({y: {grid: true}})
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
