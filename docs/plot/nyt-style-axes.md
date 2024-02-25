---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: New York Times-style axes</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# New York Times-style axes

[Axes](https://observablehq.com/plot/marks/axis) can be customized in myriad ways. See the comments in the code below for all the details.

```js echo
Plot.plot({
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
```
