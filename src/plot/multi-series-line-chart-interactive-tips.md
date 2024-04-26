---
source: https://observablehq.com/@observablehq/plot-multi-series-line-chart-interactive-tips
index: true
---

# Multi-series line chart, interactive tips

The [pointerX transform](https://observablehq.com/plot/interactions/pointer) respects the dominant dimension (time) by finding the closest point on _x_, but disambiguates between series by also considering the _y_ dimension to breaks ties.

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const industries = FileAttachment("../data/industries.csv").csv({typed: true});
```
