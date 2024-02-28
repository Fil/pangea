---
source: https://observablehq.com/@observablehq/plot-candlestick-chart
index: true
---

# Candlestick chart

A [ruleX](https://observablehq.com/plot/marks/rule) encodes a vertical extent at a given horizontal position. For more, read Zan Armstrong’s [Candlestick Chart](https://observablehq.com/@observablehq/observable-plot-candlestick) tutorial.

```js echo
const chart = Plot.plot({
  inset: 6,
  width: 928,
  grid: true,
  y: {label: "↑ Apple stock price ($)"},
  color: {domain: [-1, 0, 1], range: ["#e41a1c", "currentColor", "#4daf4a"]},
  marks: [
    Plot.ruleX(ticker, {
      x: "Date",
      y1: "Low",
      y2: "High"
    }),
    Plot.ruleX(ticker, {
      x: "Date",
      y1: "Open",
      y2: "Close",
      stroke: (d) => Math.sign(d.Close - d.Open),
      strokeWidth: 4,
      strokeLinecap: "round"
    })
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```

```js echo
const ticker = aapl.slice(-130);
```
