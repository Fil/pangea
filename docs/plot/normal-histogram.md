---
source: https://observablehq.com/@observablehq/plot-normal-histogram
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Normal histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Normal histogram

For a histogram, use the [binX](https://observablehq.com/plot/transforms/bin) transform with the [rectY](https://observablehq.com/plot/marks/rect) mark. Here we bin 10,000 random samples, generated on-the-fly into the _x_ channel from a [normal distribution](https://observablehq.com/@d3/d3-random#normal).

```js echo
Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()})).plot();
```
