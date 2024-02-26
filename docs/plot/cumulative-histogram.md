---
source: https://observablehq.com/@observablehq/plot-cumulative-histogram
index: true
---

# Cumulative histogram

If _cumulative_ is &minus;1, each [bin](https://observablehq.com/plot/transforms/bin) represents the number of athletes above a given weight; if &plus;1, below a given weight.

```js
const cumulative = view(
  Inputs.radio(
    new Map([
      ["−1", -1],
      ["+1", 1]
    ]),
    {label: "cumulative", value: 1}
  )
);
```

```js echo
const chart = Plot.plot({
  marginLeft: 60,
  y: {grid: true},
  marks: [Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", cumulative})), Plot.ruleY([0])]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
