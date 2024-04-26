---
source: https://observablehq.com/@observablehq/plot-labeled-multi-line-chart
index: true
---

# Labeled multi-line chart

The [selectLast](https://observablehq.com/plot/transforms/select) transform can be used to label the last point in each series of a multi-series [line](https://observablehq.com/plot/marks/line) chart.

```js echo
const chart = Plot.plot({
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

display(chart);
```

The cell below merges four CSV files, adding the symbol for each stock as the first column for each row.

```js echo
const stocks = [
  ["AAPL", await FileAttachment("../data/aapl.csv").csv({typed: true})],
  ["AMZN", await FileAttachment("../data/amzn.csv").csv({typed: true})],
  ["GOOG", await FileAttachment("../data/goog.csv").csv({typed: true})],
  ["IBM", await FileAttachment("../data/ibm.csv").csv({typed: true})]
].flatMap(([Symbol, values]) => values.map((d) => ({Symbol, ...d})));
```
