---
source: https://observablehq.com/@observablehq/plot-line-chart-interactive-tip
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line chart, interactive tip</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line chart, interactive tip

```js echo
Plot.lineY(aapl, {x: "Date", y: "Close", tip: true}).plot({
  y: {grid: true}
});
```

The above code uses the tip [mark option](https://observablehq.com/plot/features/marks#mark-options); the code can be written more explicitly with a [tip mark](https://observablehq.com/plot/marks/tip) and a [pointer transform](https://observablehq.com/plot/interactions/pointer):

```js
Plot.plot({
  y: {grid: true},
  marks: [Plot.lineY(aapl, {x: "Date", y: "Close"}), Plot.tip(aapl, Plot.pointerX({x: "Date", y: "Close"}))]
});
```
