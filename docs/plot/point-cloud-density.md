---
source: https://observablehq.com/@observablehq/plot-point-cloud-density
index: true
---

# Point cloud density

The [density](https://observablehq.com/plot/marks/density) mark shows the estimated density of two-dimensional point clouds.

```js echo
const chart = Plot.plot({
  inset: 10,
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      y: "eruptions",
      stroke: "steelblue",
      strokeWidth: 0.25
    }),
    Plot.density(faithful, {
      x: "waiting",
      y: "eruptions",
      stroke: "steelblue",
      thresholds: 4
    }),
    Plot.dot(faithful, {
      x: "waiting",
      y: "eruptions",
      fill: "currentColor",
      r: 1.5
    })
  ]
});

display(chart);
```

```js echo
const faithful = FileAttachment("../data/faithful.tsv").tsv({typed: true});
```
