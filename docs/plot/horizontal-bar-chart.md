<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Horizontal bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Horizontal bar chart

The ordinal dimension (letters) is, in this case, explicitly [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) according to the *x* dimension, *i.e.* the size of each bar, instead of following the natural order (alphabetical) of its domain.

```js echo
Plot.plot({
  x: {
    axis: "top",
    grid: true,
    percent: true
  },
  marks: [
    Plot.ruleX([0]),
    Plot.barX(alphabet, {x: "frequency", y: "letter", sort: {y: "x", reverse: true}})
  ]
})
```
