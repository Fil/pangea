---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacked percentages</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacked percentages

While the [bar](https://observablehq.com/plot/marks/bar) mark is implicitly [stacked](https://observablehq.com/plot/transforms/stack), the [text](https://observablehq.com/plot/marks/text) mark is not. This example uses an explicit stackX transform in both cases for clarity.

```js echo
Plot.plot({
  x: {percent: true},
  marks: [
    Plot.barX(alphabet, Plot.stackX({x: "frequency", fillOpacity: 0.3, inset: 0.5})),
    Plot.textX(alphabet, Plot.stackX({x: "frequency", text: "letter", inset: 0.5})),
    Plot.ruleX([0, 1])
  ]
});
```
