---
source: https://observablehq.com/@observablehq/plot-ordinal-scatterplot
index: true
---

# Ordinal scatterplot

A scatterplot [grouped](https://observablehq.com/plot/transforms/group) on two ordinal dimensions, with a radius [encoding](https://observablehq.com/plot/features/scales).

```js echo
const chart = Plot.plot({
  label: null,
  marginLeft: 60,
  height: 240,
  grid: true,
  r: {range: [0, 40]},
  marks: [Plot.dot(penguins, Plot.group({r: "count"}, {x: "species", y: "island", stroke: "sex"}))]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
