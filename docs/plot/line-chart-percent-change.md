<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line chart, percent change</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line chart, percent change

The variant of a [line chart](/@observablehq/plot-simple-line-chart?intent=fork) shows the change in price of Apple stock relative to ${basis.toFixed(2) === aapl[0].Close.toFixed(2) ? `its ${aapl[0].Date.toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}`: "the"} price of $${basis.toFixed(2)}. <br>The vertical [log scale](https://observablehq.com/plot/features/scales#continuous-scales) allows [accurate comparison](/@mbostock/methods-of-comparison-compared); the [normalize transform](/plot/transforms/normalize) uses a custom basis, for interaction. Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js
viewof basis = Inputs.range(d3.extent(aapl, d => d.Close), {label: "Basis", value: aapl[0].Close, step: 0.01, format: x => x.toFixed(2)})
```

```js echo
Plot.plot({
  width: 928,
  marginLeft: 45,
  y: {type: "log", tickFormat: d => `${d > 1 ? "+" : ""}${Math.round(100 * (d - 1))}%`, grid: true, ticks: 12},
  marks: [
    Plot.ruleY([1]),
    Plot.line(aapl, Plot.normalizeY(() => basis, {x: "Date", y: "Close", stroke: "steelblue"}))
  ]
})
```
