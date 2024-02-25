---
source: https://observablehq.com/@observablehq/plot-wrap-tick-labels
index: true
---

# Axis with wrapped labels

Use the [lineWidth](https://observablehq.com/plot/marks/axis#axis-options) option to wrap long tick labels.

```js echo
const chart = Plot.plot({
  y: {percent: true},
  marks: [
    Plot.axisX({label: null, lineWidth: 8, marginBottom: 40}),
    Plot.axisY({label: "↑ Responses (%)"}),
    Plot.barY(responses, {x: "name", y: "value"}),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const responses = [
  {name: "Family in feud with Zucker­bergs", value: 0.17},
  {name: "Committed 671 birthdays to memory", value: 0.19},
  {name: "Ex is doing too well", value: 0.1},
  {name: "High school friends all dead now", value: 0.15},
  {name: "Discovered how to “like” things mentally", value: 0.27},
  {name: "Not enough politics", value: 0.12}
];
```
