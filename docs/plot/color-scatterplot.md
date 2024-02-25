---
source: https://observablehq.com/@observablehq/color-scatterplot
index: true
---

# Scatterplot with color

Two quantitative dimensions encoded to the _x_ and _y_ dimensions (see [scales](https://observablehq.com/plot/features/scales)), and a categorical dimension encoded to _stroke_ (color), drawn with the [dot](https://observablehq.com/plot/marks/dot) mark.

```js echo
const chart = Plot.dot(penguins, {
  x: "culmen_length_mm",
  y: "culmen_depth_mm",
  stroke: "species"
}).plot();

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
