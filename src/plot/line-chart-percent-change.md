---
source: https://observablehq.com/@observablehq/plot-line-chart-percent-change
index: true
---

# Line chart, percent change

The variant of a [line chart](./simple-line-chart) shows the change in price of Apple stock relative to ${basis.toFixed(2) === aapl[0].Close.toFixed(2) ? `its ${aapl[0].Date.toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}`: "the"} price of $${basis.toFixed(2)}. <br>The vertical [log scale](https://observablehq.com/plot/features/scales#continuous-scales) allows [accurate comparison](../d3/methods-of-comparison-compared); the [normalize transform](https://observablehq.com/plot/transforms/normalize) uses a custom basis, for interaction. Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js
const basis = view(
  Inputs.range(
    d3.extent(aapl, (d) => d.Close),
    {
      label: "Basis",
      value: aapl[0].Close,
      step: 0.01,
      format: (x) => x.toFixed(2)
    }
  )
);
```

```js echo
const chart = Plot.plot({
  width: 928,
  marginLeft: 45,
  y: {
    type: "log",
    tickFormat: (d) => `${d > 1 ? "+" : ""}${Math.round(100 * (d - 1))}%`,
    grid: true,
    ticks: 12
  },
  marks: [
    Plot.ruleY([1]),
    Plot.line(
      aapl,
      Plot.normalizeY(() => basis, {
        x: "Date",
        y: "Close",
        stroke: "steelblue"
      })
    )
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
