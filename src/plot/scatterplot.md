---
source: https://observablehq.com/@observablehq/plot-scatterplot/2
index: true
---

# Scatterplot

Given a dataset with two quantitative dimensions, the [dot](https://observablehq.com/plot/marks/dot) mark creates a scatterplot.

```js echo
const chart = Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"}).plot();

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
