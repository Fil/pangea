---
source: https://observablehq.com/@observablehq/plot-one-dimensional-crosshair
index: true
---

# One-dimensional crosshair

If either **x** or **y** is not specified, the [crosshair](https://observablehq.com/plot/interactions/crosshair) is one-dimensional.

```js echo
const chart = Plot.plot({
  marks: [
    Plot.tickX(penguins, {x: "body_mass_g"}),
    Plot.crosshairX(penguins, {x: "body_mass_g", color: "red", opacity: 1})
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
