---
source: https://observablehq.com/@observablehq/plot-non-temporal-line-chart
index: true
---

# Non-temporal line chart

In this [line](https://observablehq.com/plot/marks/line) chart drawing the elevation profile of a Tour de France stage, the _x_ scale represents distance, not time.

```js echo
const chart = Plot.plot({
  x: {
    label: "Distance from stage start (km) →"
  },
  y: {
    label: "↑ Elevation (m)",
    grid: true
  },
  marks: [Plot.ruleY([0]), Plot.lineY(tdf, {x: "distance", y: "elevation"})]
});

display(chart);
```

```js echo
const tdf = FileAttachment("../data/tdf-stage-8-2017.csv").csv({typed: true});
```
