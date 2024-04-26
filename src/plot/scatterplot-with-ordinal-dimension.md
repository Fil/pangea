---
source: https://observablehq.com/@observablehq/plot-scatterplot-with-ordinal-dimension
index: true
---

# Scatterplot with ordinal dimension

A [dot](https://observablehq.com/plot/marks/dot) mark encoding three dimensions with various [scales](https://observablehq.com/plot/features/scales): _x_ is quantitative, _y_ and _stroke_ (color) are nominal.

```js echo
const chart = Plot.plot({
  marginLeft: 60,
  x: {inset: 10},
  y: {label: null},
  marks: [Plot.dot(penguins, {x: "body_mass_g", y: "species", stroke: "sex"})]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
