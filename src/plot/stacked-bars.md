---
source: https://observablehq.com/@observablehq/plot-stacked-bars
index: true
---

# Stacked bars

Group and count data sharing the same _x_ base (here, the island where penguins were counted) and _fill_ color (their species). The [bar](https://observablehq.com/plot/marks/bar) mark implicitly [stacks](https://observablehq.com/plot/transforms/stack) values, avoiding occlusion between bars and allowing to a part-to-whole comparison on a given _x_.

```js
const chart = Plot.barY(penguins, Plot.groupX({y: "count"}, {x: "island", fill: "species"})).plot({
  color: {legend: true}
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
