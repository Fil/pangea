---
source: https://observablehq.com/@observablehq/plot-one-dimensional-density
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: One-dimensional density</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# One-dimensional density

Although it is inherently two-dimensional, the [density](https://observablehq.com/plot/marks/density) mark is compatible with one-dimensional data. For a more accurate estimation of one-dimensional densities, please upvote issue [#1469](https://github.com/observablehq/plot/issues/1469).

```js echo
Plot.plot({
  height: 100,
  inset: 10,
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      stroke: "steelblue",
      strokeWidth: 0.25,
      bandwidth: 10
    }),
    Plot.density(faithful, {
      x: "waiting",
      stroke: "steelblue",
      thresholds: 4,
      bandwidth: 10
    }),
    Plot.dot(faithful, {x: "waiting", fill: "currentColor", r: 1.5})
  ]
});
```

```js echo
const faithful = FileAttachment("faithful.tsv").tsv({typed: true});
```
