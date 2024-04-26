---
source: https://observablehq.com/@observablehq/plot-text-spiral
index: true
---

# Text spiral

If both **x** and **y** are not defined, the [text](https://observablehq.com/plot/marks/text) mark assumes that the data is an iterable of points [[*x₁*, *y₁*], [*x₂*, *y₂*], …], allowing for [shorthand](https://observablehq.com/plot/features/shorthand). Furthermore, the default **text** channel is the associated datum’s index.

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  inset: 10,
  grid: true,
  marks: [Plot.text(d3.range(151).map((i) => [Math.sqrt(i) * Math.sin(i / 10), Math.sqrt(i) * Math.cos(i / 10)]))]
});

display(chart);
```
