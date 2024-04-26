---
source: https://observablehq.com/@observablehq/plot-one-dimensional-pointing
index: true
---

# One-dimensional pointing

One-dimensional [pointing](https://observablehq.com/plot/interactions/pointer) makes even small bars or rects easily hoverable. If you switch the histogram below to two-dimensional pointing, you must hover near a rect’s centroid (shown in <span style="border-bottom: solid 2px red;">red</span>) to trigger a tip, whereas one-dimensional pointing triggers the tip anywhere in the chart.

```js
const tipmode = view(Inputs.radio(["xy", "x"], {value: "x", label: "Tip mode"}));
```

```js echo
const chart = Plot.plot({
  x: {label: "Daily volume (log₁₀)"},
  marks: [
    Plot.rectY(aapl, Plot.binX({y: "count"}, {x: (d) => Math.log10(d.Volume), thresholds: 40, tip: tipmode})),
    Plot.dot(
      aapl,
      Plot.stackY(Plot.binX({y: "count"}, {x: (d) => Math.log10(d.Volume), thresholds: 40, stroke: "red"}))
    )
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
