---
source: https://observablehq.com/@observablehq/plot-stacking-order-and-reverse
index: true
---

# Stacking order and reverse

The **order** and **reverse** options control the order in which the [stack](https://observablehq.com/plot/transforms/stack) transform stacks series.

```js
const order = view(
  Inputs.select(
    new Map([
      ["null", null],
      ["appearance", "appearance"],
      ["inside-out", "inside-out"],
      ["sum", "sum"],
      ["group", "group"],
      ["z", "z"]
    ]),
    {label: "order", value: "appearance"}
  )
);
const reverse = view(Inputs.toggle({label: "reverse"}));
```

```js echo
const chart = Plot.plot({
  y: {
    grid: true,
    label: "↑ Annual revenue (billions, adj.)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  color: {legend: true},
  marks: [
    Plot.areaY(riaa, Plot.stackY({order, reverse}, {x: "year", y: "revenue", z: "format", fill: "group"})),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const riaa = FileAttachment("../data/riaa-us-revenue.csv").csv({typed: true});
```
