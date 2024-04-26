---
source: https://observablehq.com/@observablehq/plot-stacked-area-chart
index: true
---

# Stacked area chart

The [areaY](https://observablehq.com/plot/marks/area) mark implicitly [stacks](https://observablehq.com/plot/features/stack) the areas vertically, avoiding occlusion and allowing the reader to make sense of the total as well as of the parts.

```js echo
const chart = Plot.plot({
  marginLeft: 50,
  width: 928,
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, {
      x: "date",
      y: "unemployed",
      fill: "industry",
      title: "industry"
    }),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const unemployment = FileAttachment("../data/unemployment.csv").csv({typed: true});
```
