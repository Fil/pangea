---
source: https://observablehq.com/@observablehq/plot-ordinal-scatterplot
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Ordinal scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Ordinal scatterplot

A scatterplot [grouped](https://observablehq.com/plot/transforms/group) on two ordinal dimensions, with a radius [encoding](https://observablehq.com/plot/features/scales).

```js echo
Plot.plot({
  label: null,
  marginLeft: 60,
  height: 240,
  grid: true,
  r: {range: [0, 40]},
  marks: [Plot.dot(penguins, Plot.group({r: "count"}, {x: "species", y: "island", stroke: "sex"}))]
});
```
