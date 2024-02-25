---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Binned box plot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Binned box plot

The [box](https://observablehq.com/plot/marks/box) mark expects a quantitative dimension (for its extent, here, _y_, representing price), and optionally an ordinal dimension. The example below uses the [scale interval option]([plot](https://observablehq.com/plot/features/scales#interval) to convert carats (a quantitative dimension) into a usable ordinal dimension, on _fx_. If you are interested in ways to make this easier, please upvote [#1330](https://github.com/observablehq/plot/issues/1330).

```js echo
Plot.plot({
  marginLeft: 60,
  y: {
    grid: true,
    label: "↑ Price"
  },
  fx: {
    interval: 0.5,
    label: "Carats →",
    labelAnchor: "right",
    tickFormat: (x) => x.toFixed(1)
  },
  marks: [Plot.ruleY([0]), Plot.boxY(diamonds, {fx: "carat", y: "price"})]
});
```
