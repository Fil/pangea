---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Candlestick chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Candlestick chart

A [ruleX](https://observablehq.com/plot/marks/rule) encodes a vertical extent at a given horizontal position. For more, read Zan Armstrong’s [Candlestick Chart](/@observablehq/observable-plot-candlestick) tutorial.

```js echo
Plot.plot({
  inset: 6,
  width: 928,
  grid: true,
  y: {label: "↑ Apple stock price ($)"},
  color: {domain: [-1, 0, 1], range: ["#e41a1c", "#000000", "#4daf4a"]},
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
```

```js echo
const ticker = aapl.slice(-130);
```
