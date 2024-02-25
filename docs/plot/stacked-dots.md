---
source: https://observablehq.com/@observablehq/plot-stacked-dots
index: true
---

# Stacked dots

A [dot](https://observablehq.com/plot/marks/dot) mark, [stacked](https://observablehq.com/plot/transforms/stack) in two opposite directions.

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  x: {label: "Age (years)"},
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => (d.gender === "M" ? 1 : -1),
        fill: "gender",
        title: "full_name"
      })
    ),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const congress = FileAttachment("../data/us-congress-2023.csv").csv({typed: true});
```
