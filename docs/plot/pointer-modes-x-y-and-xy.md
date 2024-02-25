---
source: https://observablehq.com/@observablehq/plot-pointer-modes-x-y-and-xy
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Pointer modes (x, y, and xy)</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Pointer modes (x, y, and xy)

The [pointer transform](https://observablehq.com/plot/interactions/pointer) supports both one- and two-dimensional pointing modes. The two-dimensional mode, **pointer**, is suitable for scatterplots and the general case: it finds the point closest to the pointer by measuring distance in _x_ and _y_. The one-dimensional modes, **pointerX** and **pointerY**, in contrast only consider distance in one dimension; this is desirable when a chart has a “dominant” dimension, such as time in a time-series chart, the binned quantitative dimension in a histogram, or the categorical dimension of a bar chart.

Try the different modes on the line chart below to get a feel for their behavior.

```js
const pointermode = view(Inputs.radio(["xy", "x", "y"], {value: "x", label: "Pointer mode"}));
```

```js echo
Plot.lineY(aapl, {x: "Date", y: "Close", tip: pointermode}).plot();
```
