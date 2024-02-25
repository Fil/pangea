---
source: https://observablehq.com/@observablehq/plot-log-heatmap
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Log heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Log heatmap

This [heatmap](https://observablehq.com/plot/marks/raster) is using a log color [scale](https://observablehq.com/plot/features/scales), to better reflect variations in magnitude.

```js echo
Plot.plot({
  height: 630,
  x: {ticks: 10, tickFormat: "+f"},
  y: {ticks: 10, tickFormat: "+f"},
  color: {type: "log", scheme: "magma"},
  marks: [
    Plot.raster({
      fill: (x, y) =>
        (1 + (x + y + 1) ** 2 * (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2)) *
        (30 + (2 * x - 3 * y) ** 2 * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2)),
      x1: -2,
      y1: -2.5,
      x2: 2,
      y2: 1.5,
      pixelSize: 4
    }),
    Plot.ruleX([0], {strokeOpacity: 0.2}),
    Plot.ruleY([0], {strokeOpacity: 0.2}),
    Plot.frame()
  ]
});
```
