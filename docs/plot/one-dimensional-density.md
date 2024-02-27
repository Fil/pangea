---
source: https://observablehq.com/@observablehq/plot-one-dimensional-density
index: true
---

# One-dimensional density

Although it is inherently two-dimensional, the [density](https://observablehq.com/plot/marks/density) mark is compatible with one-dimensional data. For a more accurate estimation of one-dimensional densities, please upvote issue [#1469](https://github.com/observablehq/plot/issues/1469).

```js echo
const chart = Plot.plot({
  height: 100,
  inset: 10,
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      stroke: "var(--theme-foreground-focus)",
      strokeWidth: 0.25,
      bandwidth: 10
    }),
    Plot.density(faithful, {
      x: "waiting",
      stroke: "var(--theme-foreground-focus)",
      thresholds: 4,
      bandwidth: 10
    }),
    Plot.dot(faithful, {x: "waiting", fill: "currentColor", r: 1.5})
  ]
});

display(chart);
```

```js echo
const faithful = FileAttachment("../data/faithful.tsv").tsv({typed: true});
```
