---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Symbol channel</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Symbol channel

When an ordinal _color_ scale is used redundantly with a [_symbol_](https://observablehq.com/plot/marks/dot.html) scale, the _symbol_ [legend](https://observablehq.com/plot/features/legend.html) will incorporate the color encoding. This is more accessible than using color alone, particularly for readers with color vision deficiency.

```js echo
Plot.plot({
  grid: true,
  x: {label: "Body mass (g) →"},
  y: {label: "↑ Flipper length (mm)"},
  symbol: {legend: true},
  marks: [
    Plot.dot(penguins, {
      x: "body_mass_g",
      y: "flipper_length_mm",
      stroke: "species",
      symbol: "species"
    })
  ]
});
```
