---
source: https://observablehq.com/@observablehq/plot-crosshairx
index: true
---

# CrosshairX

For charts which have a “dominant” dimension, such as time in a time-series chart, use the [crosshairX](https://observablehq.com/plot/interactions/crosshair) mark for the [pointerX](https://observablehq.com/plot/interactions/pointer#pointerx-options) transform.

```js echo
const chart = Plot.plot({
  style: "overflow: visible;",
  marks: [Plot.lineY(aapl, {x: "Date", y: "Close"}), Plot.crosshairX(aapl, {x: "Date", y: "Close"})]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
