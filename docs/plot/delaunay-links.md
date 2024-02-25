---
source: https://observablehq.com/@observablehq/plot-delaunay-links
index: true
---

# Delaunay links

It can be useful to color the links of the [Delaunay](https://observablehq.com/plot/marks/delaunay) graph based on some property of data, such as the body mass of penguins.

```js echo
const chart = Plot.plot({
  color: {legend: true},
  marks: [
    Plot.delaunayLink(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      stroke: "body_mass_g",
      strokeWidth: 1.5
    })
  ]
});

display(chart);
```

```js
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
