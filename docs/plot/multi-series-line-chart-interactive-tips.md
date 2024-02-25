---
source: https://observablehq.com/@observablehq/plot-multi-series-line-chart-interactive-tips
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Multi-series line chart, interactive tips</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Multi-series line chart, interactive tips

The [pointerX transform](https://observablehq.com/plot/interactions/pointer) respects the dominant dimension (time) by finding the closest point on _x_, but disambiguates between series by also considering the _y_ dimension to breaks ties.

```js echo
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(industries, {
      x: "date",
      y: "unemployed",
      stroke: "industry",
      tip: "x"
    })
  ]
});
```
