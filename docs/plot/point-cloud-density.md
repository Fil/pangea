---
source: https://observablehq.com/@observablehq/plot-point-cloud-density
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Point cloud density</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Point cloud density

The [density](https://observablehq.com/plot/marks/density) mark shows the estimated density of two-dimensional point clouds.

```js echo
Plot.plot({
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
```

```js echo
const faithful = FileAttachment("faithful.tsv").tsv({typed: true});
```
