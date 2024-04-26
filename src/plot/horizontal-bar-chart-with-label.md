---
source: https://observablehq.com/@observablehq/plot-horizontal-bar-chart-with-label
index: true
---

# Horizontal bar chart with a label

Here is one way to set labels atop a [bar](https://observablehq.com/plot/marks/bar) mark; for more, see [these variants](./labelled-horizontal-bar-chart-variants). Data: Interbrand. Market value of 10 top global brands in 2018, in millions of dollars.

```js echo
const chart = Plot.plot({
  marginLeft: 90,
  x: {axis: null},
  y: {label: null},
  marks: [
    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: {y: "x", reverse: true, limit: 10}
    }),

    Plot.text(brands, {
      text: (d) => `${Math.floor(d.value / 1000)} B`,
      y: "name",
      x: "value",
      textAnchor: "end",
      dx: -3,
      fill: "var(--plot-background)"
    })
  ]
});

display(chart);
```

```js echo
const brands = FileAttachment("../data/brands-2018.csv").csv({typed: true});
```
