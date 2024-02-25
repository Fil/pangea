---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Scatterplot with ordinal dimension</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Scatterplot with ordinal dimension

A [dot](https://observablehq.com/plot/marks/dot) mark encoding three dimensions with various [scales](https://observablehq.com/plot/features/scales): _x_ is quantitative, _y_ and _stroke_ (color) are nominal.

```js echo
Plot.plot({
  marginLeft: 60,
  x: {inset: 10},
  y: {label: null},
  marks: [Plot.dot(penguins, {x: "body_mass_g", y: "species", stroke: "sex"})]
});
```
