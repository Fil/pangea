---
source: https://observablehq.com/@observablehq/plot-nyt-style-axes
index: true
---

# New York Times-style axes

[Axes](https://observablehq.com/plot/marks/axis) can be customized in myriad ways. See the comments in the code below for all the details.

```js echo
const chart = Plot.plot({
  round: true,
  marginLeft: 0, // don’t need left-margin since labels are inset
  x: {label: null, insetLeft: 36}, // reserve space for inset labels
  marks: [
    Plot.gridY({
      strokeDasharray: "0.75,2", // dashed
      strokeOpacity: 1 // opaque
    }),
    Plot.axisY({
      tickSize: 0, // don’t draw ticks
      dx: 38, // offset right
      dy: -6, // offset up
      lineAnchor: "bottom", // draw labels above grid lines
      tickFormat: (d, i, _) => (i === _.length - 1 ? `$${d}` : d)
    }),
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close", markerEnd: "dot"})
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
