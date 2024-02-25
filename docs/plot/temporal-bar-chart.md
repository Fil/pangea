---
source: https://observablehq.com/@observablehq/plot-temporal-bar-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Temporal bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Temporal bar chart

Use the [interval transform](https://observablehq.com/plot/transforms/interval) —here, expressed as the [rect](https://observablehq.com/plot/marks/rect) mark’s **interval** option— to convert a single time value in _x_ into an extent ⟨_x₁_, _x₂_⟩.

```js echo
Plot.plot({
  marks: [Plot.rectY(weather.slice(-42), {x: "date", y: "wind", interval: "day"}), Plot.ruleY([0])]
});
```
