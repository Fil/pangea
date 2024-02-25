---
source: https://observablehq.com/@observablehq/plot-major-and-minor-axis-ticks
index: true
---

# Major and minor axis ticks

The [axis](https://observablehq.com/plot/marks/axis) mark can be called several times with different options.

```js echo
const chart = Plot.plot({
  x: {nice: true},
  y: {grid: true},
  marks: [
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.axisX({ticks: "month", text: null, tickSize: 3}),
    Plot.axisX(),
    Plot.axisY({ticks: 50, tickSize: 3, text: null}),
    Plot.axisY()
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
