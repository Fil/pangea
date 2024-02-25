---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Color crosshair</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Color crosshair

The **color** option of the [crosshair](https://observablehq.com/plot/interactions/crosshair) mark sets the fill color of the text and the stroke color of the rule. This option can be specified as a channel to reinforce a color encoding.

```js echo
Plot.plot({
  marks: [
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      stroke: "sex"
    }),
    Plot.crosshair(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      color: "sex",
      opacity: 0.5
    })
  ]
});
```
