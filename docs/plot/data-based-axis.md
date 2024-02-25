<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Data-based axis</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Data-based axis

A vertical [axis](https://observablehq.com/plot/marks/axis) mark extends from the left (or from the right), but by specifying the *x* channel, we can change the position where the labels are shown, and the extent of the corresponding [grid](https://observablehq.com/plot/marks/grid) lines.

```js echo
Plot.plot({
  marginRight: 0,
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.gridY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6}),
    Plot.axisY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6, textStroke: "var(--vp-c-bg)"})
  ]
})
```
