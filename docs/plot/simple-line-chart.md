---
source: https://observablehq.com/@observablehq/plot-simple-line-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Simple line chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Simple line chart

The [line](https://observablehq.com/plot/marks/line) mark draws two-dimensional lines.

```js echo
Plot.lineY(aapl, {x: "Date", y: "Close"}).plot({y: {grid: true}});
```
