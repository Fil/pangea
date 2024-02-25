---
source: https://observablehq.com/@observablehq/plot-crosshair
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Crosshair</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Crosshair

The [crosshair mark](https://observablehq.com/plot/interactions/crosshair) uses the [pointer transform](https://observablehq.com/plot/interactions/pointer) internally to display a [rule](https://observablehq.com/plot/marks/rule) and a [text](https://observablehq.com/plot/marks/text) showing the **x** (horizontal↔︎ position) and **y** (vertical↕︎ position) value of the nearest data.

```js echo
Plot.plot({
  marks: [
    Plot.dot(olympians, {x: "weight", y: "height", stroke: "sex"}),
    Plot.crosshair(olympians, {x: "weight", y: "height"})
  ]
});
```
