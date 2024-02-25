---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Density stroke</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Density stroke

The [density](https://observablehq.com/plot/marks/density) contours can be colored based on their value.

```js echo
Plot.plot({
  inset: 10,
  grid: true,
  x: {type: "log"},
  y: {type: "log"},
  marks: [Plot.density(diamonds, {x: "carat", y: "price", stroke: "density"})]
});
```
