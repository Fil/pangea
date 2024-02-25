---
source: https://observablehq.com/@observablehq/plot-non-temporal-line-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Non-temporal line chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Non-temporal line chart

In this [line](https://observablehq.com/plot/marks/line) chart drawing the elevation profile of a Tour de France stage, the _x_ scale represents distance, not time.

```js echo
Plot.plot({
  x: {
    label: "Distance from stage start (km) →"
  },
  y: {
    label: "↑ Elevation (m)",
    grid: true
  },
  marks: [Plot.ruleY([0]), Plot.lineY(tdf, {x: "distance", y: "elevation"})]
});
```

```js echo
const tdf = FileAttachment("tdf-stage-8-2017.csv").csv({typed: true});
```
