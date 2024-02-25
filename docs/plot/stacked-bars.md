<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacked bars</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacked bars

Group and count data sharing the same *x* base (here, the island where penguins were counted) and *fill* color (their species). The [bar](https://observablehq.com/plot/marks/bar) mark implicitly [stacks](https://observablehq.com/plot/transforms/stack) values, avoiding occlusion between bars and allowing to a part-to-whole comparison on a given *x*.

```js
Plot.barY(
  penguins,
  Plot.groupX({ y: "count" }, { x: "island", fill: "species" })
).plot({ color: { legend: true } })
```
