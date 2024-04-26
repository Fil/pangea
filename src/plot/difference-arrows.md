---
source: https://observablehq.com/@observablehq/plot-difference-arrows
index: true
---

# Difference arrows

The chart plots the difference between the number of male and female Olympic athletes by sport. Sports with more men are right-pointing orange [arrows](https://observablehq.com/plot/marks/arrow), while sports with more women (only gymnastics and fencing) are left-pointing blue arrows.

```js echo
const chart = Plot.plot({
  marginTop: 0,
  marginLeft: 100,
  y: {grid: true, label: null},
  color: {
    type: "categorical",
    domain: [-1, 1],
    unknown: "#aaa",
    transform: Math.sign,
    tickFormat: (c) => (c < 0 ? "female" : "male"),
    legend: true
  },
  marks: [
    Plot.ruleX([0]),
    Plot.link(
      olympians,
      Plot.groupY(
        {
          x1: (D) => d3.sum(D, (d) => d === "female"),
          x2: (D) => d3.sum(D, (d) => d === "male"),
          stroke: (D) => d3.sum(D, (d) => d === "male") - d3.sum(D, (d) => d === "female")
        },
        {
          y: "sport",
          x1: "sex",
          x2: "sex",
          markerStart: "dot",
          markerEnd: "arrow",
          sort: {y: "x2"},
          stroke: "sex",
          strokeWidth: 2
        }
      )
    )
  ]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
