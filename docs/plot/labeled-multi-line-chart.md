---
source: https://observablehq.com/@observablehq/plot-labeled-multi-line-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Labeled multi-line chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Labeled multi-line chart

The [selectLast](https://observablehq.com/plot/transforms/select) transform can be used to label the last point in each series of a multi-series [line](https://observablehq.com/plot/marks/line) chart.

```js echo
Plot.plot({
  style: "overflow: visible;",
  y: {grid: true},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(stocks, {x: "Date", y: "Close", stroke: "Symbol"}),
    Plot.text(
      stocks,
      Plot.selectLast({
        x: "Date",
        y: "Close",
        z: "Symbol",
        text: "Symbol",
        textAnchor: "start",
        dx: 3
      })
    )
  ]
});
```

The cell below merges four CSV files, adding the symbol for each stock as the first column for each row.

```js echo
const stocks = [
  ["AAPL", await FileAttachment("aapl.csv").csv({typed: true})],
  ["AMZN", await FileAttachment("amzn.csv").csv({typed: true})],
  ["GOOG", await FileAttachment("goog.csv").csv({typed: true})],
  ["IBM", await FileAttachment("ibm.csv").csv({typed: true})]
].flatMap(([Symbol, values]) => values.map((d) => ({Symbol, ...d})));
```
