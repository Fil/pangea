---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Vertical bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Vertical bar chart

The ordinal dimension (letters) is, in this case, explicitly [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) according to the _y_ dimension, _i.e._ the size of each bar, instead of following the natural order (alphabetical) of its domain.

```js echo
Plot.plot({
  y: {
    grid: true,
    percent: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.barY(alphabet, {
      x: "letter",
      y: "frequency",
      sort: {x: "y", reverse: true}
    })
  ]
});
```
