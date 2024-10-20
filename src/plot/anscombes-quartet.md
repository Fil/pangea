---
source: https://observablehq.com/@observablehq/plot-anscombes-quartet
index: true
---

# Anscombe’s quartet

The **[facet](https://observablehq.com/plot/features/facets)** plot option is an alternative to the **fx** and **fy** mark options. It is useful when multiple marks share the same data, such as the [line](https://observablehq.com/plot/marks/line) and [dot](https://observablehq.com/plot/marks/dot) marks below.

```js echo
const chart = Plot.plot({
  grid: true,
  aspectRatio: 0.5,
  facet: {data: anscombe, x: "series"},
  marks: [Plot.frame(), Plot.line(anscombe, {x: "x", y: "y"}), Plot.dot(anscombe, {x: "x", y: "y"})]
});

display(chart);
```

```js echo
const anscombe = FileAttachment("../data/anscombe.csv").csv({typed: true});
```
