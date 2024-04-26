---
source: https://observablehq.com/@observablehq/plot-density-estimation
index: true
---

# Continuous histogram

This approximates a density estimation by [binning](https://observablehq.com/plot/transforms/bin) the data. If you are interested in a better evaluation of density, please upvote issue
[#1469](https://github.com/observablehq/plot/issues/1469).

```js echo
const chart = Plot.plot({
  y: {grid: true},
  marks: [
    Plot.areaY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight", fillOpacity: 0.2})),
    Plot.lineY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight"})),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
