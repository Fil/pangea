---
source: https://observablehq.com/@observablehq/plot-overlapping-density-estimations
index: true
---

# Overlapping density estimations

This chart [bins](https://observablehq.com/plot/transforms/bin) the data to estimate their density. If you are interested in a better evaluation of density, please upvote issue
[#1469](https://github.com/observablehq/plot/issues/1469).

```js echo
const chart = Plot.plot({
  height: 300,
  marginLeft: 60,
  y: {axis: null},
  x: {nice: true},
  fy: {domain: ["FEMALE", "MALE"]}, // excludes N/A
  color: {legend: true},
  facet: {data: penguins, y: "sex"},
  marks: [
    Plot.areaY(
      penguins,
      Plot.binX(
        {y2: "proportion"}, // using y2 to avoid areaY’s implicit stacking
        {
          x: "culmen_length_mm",
          fill: "species",
          fillOpacity: 0.1,
          thresholds: 10,
          curve: "natural"
        }
      )
    ),
    Plot.ruleY([0]),
    Plot.lineY(
      penguins,
      Plot.binX(
        {y: "proportion"},
        {
          x: "culmen_length_mm",
          stroke: "species",
          thresholds: 10,
          curve: "natural"
        }
      )
    )
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
