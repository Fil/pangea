---
source: https://observablehq.com/@observablehq/plot-ribbon-chart
index: true
---

# Ribbon chart

Ordering [stacks](https://observablehq.com/plot/transforms/stack) by _value_ results in criss-crossing ribbons with the largest value on top. (Use **reverse** to put the smallest values on top.)

```js echo
const chart = Plot.plot({
  width,
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
      order: "value",
      curve: "monotone-x",
      stroke: "var(--plot-background)"
    }),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const riaa = FileAttachment("../data/riaa-us-revenue.csv").csv({typed: true});
```
