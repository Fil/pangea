---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Random walk</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Random walk

This [map transform](https://observablehq.com/plot/transforms/map) computes a cumulative sum (_cumsum_) of the values. Applied to a [random number generator](https://observablehq.com/@d3/d3-random#normal), this generates a random walk. Brownian movement in a single line of code!

```js echo
Plot.plot({
  marks: [Plot.ruleY([0]), Plot.lineY({length: 10000}, Plot.mapY("cumsum", {y: d3.randomNormal()}))]
});
```
