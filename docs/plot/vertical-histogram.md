---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacked histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacked histogram

Olympic athletes [binned](https://observablehq.com/plot/transforms/bin) by weight, separately for each category (_sex_). The [rectY](https://observablehq.com/plot/marks/rect) mark showing the counts is implicitly [stacked](https://observablehq.com/plot/transforms/stack), avoiding occlusion. For an alternative, see [overlapping histogram](https://observablehq.com/@observablehq/plot-overlapping-histogram).

```js echo
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})), Plot.ruleY([0])]
});
```
