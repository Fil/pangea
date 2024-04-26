---
source: https://observablehq.com/@observablehq/plot-color-crosshair
index: true
---

# Color crosshair

The **color** option of the [crosshair](https://observablehq.com/plot/interactions/crosshair) mark sets the fill color of the text and the stroke color of the rule. This option can be specified as a channel to reinforce a color encoding.

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
