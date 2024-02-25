---
source: https://observablehq.com/@observablehq/plot-ribbon-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Ribbon chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Ribbon chart

Ordering [stacks](https://observablehq.com/plot/transforms/stack) by _value_ results in criss-crossing ribbons with the largest value on top. (Use **reverse** to put the smallest values on top.)

```js echo
Plot.plot({
  y: {
    grid: true,
    label: "↑ Annual revenue (billions, adj.)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {
      x: "year",
      y: "revenue",
      z: "format",
      fill: "group",
      order: "value"
    }),
    Plot.ruleY([0])
  ]
});
```

```js echo
const riaa = FileAttachment("riaa-us-revenue.csv").csv({typed: true});
```
