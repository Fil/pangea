---
source: https://observablehq.com/@observablehq/plot-continuous-dimensions-heatmap
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Quantitative dimensions heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Quantitative dimensions heatmap

Given two quantitative dimensions for _x_ and _y_, use the [bin](https://observablehq.com/plot/transforms/bin) transform to create a heatmap.

```js echo
Plot.plot({
  height: 640,
  marginLeft: 44,
  color: {
    scheme: "bupu",
    type: "symlog"
  },
  marks: [Plot.rect(diamonds, Plot.bin({fill: "count"}, {x: "carat", y: "price", thresholds: 100}))]
});
```
