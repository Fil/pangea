---
source: https://observablehq.com/@observablehq/plot-density-estimation
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Continuous histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Continuous histogram

This approximates a density estimation by [binning](https://observablehq.com/plot/transforms/bin) the data. If you are interested in a better evaluation of density, please upvote issue
[#1469](https://github.com/observablehq/plot/issues/1469).

```js echo
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.areaY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight", fillOpacity: 0.2})),
    Plot.lineY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight"})),
    Plot.ruleY([0])
  ]
});
```
