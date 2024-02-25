---
source: https://observablehq.com/@observablehq/plot-stacking-order-and-reverse
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacking order and reverse</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacking order and reverse

The **order** and **reverse** options control the order in which the [stack](https://observablehq.com/plot/transforms/stack) transform stacks series.

```js
viewof order = Inputs.select(
  new Map([
    ["null", null],
    ["appearance", "appearance"],
    ["inside-out", "inside-out"],
    ["sum", "sum"],
    ["group", "group"],
    ["z", "z"]
  ]),
  { label: "order", value: "appearance" }
)
```

```js
const reverse = view(Inputs.toggle({label: "reverse"}));
```

```js echo
Plot.plot({
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
```

```js echo
const riaa = FileAttachment("riaa-us-revenue.csv").csv({typed: true});
```
