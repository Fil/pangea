---
source: https://observablehq.com/@observablehq/plot-vertical-histogram
index: true
---

# Stacked histogram

Olympic athletes [binned](https://observablehq.com/plot/transforms/bin) by weight, separately for each category (_sex_). The [rectY](https://observablehq.com/plot/marks/rect) mark showing the counts is implicitly [stacked](https://observablehq.com/plot/transforms/stack), avoiding occlusion. For an alternative, see [overlapping histogram](./overlapping-histogram).

```js echo
const chart = Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})), Plot.ruleY([0])]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
