---
source: https://observablehq.com/@observablehq/plot-vertical-bars-rotated-labels
index: true
---

# Vertical bars, rotated labels

The [tickRotate](https://observablehq.com/plot/marks/axis#axis-options) axis option rotates the tick labels.

```js echo
const chart = Plot.plot({
  marginBottom: 60,
  x: {
    tickRotate: -30
  },
  y: {
    transform: (d) => d / 1000,
    label: "↑ Market value (US dollars, billions)",
    grid: 5
  },
  marks: [
    Plot.ruleY([0]),

    Plot.barY(brands, {
      x: "name",
      y: "value",
      sort: {x: "y", reverse: true, limit: 20},
      fill: "var(--theme-foreground-focus)"
    })
  ]
});

display(chart);
```

Data: Interbrand. Market value of 100 top global brands in 2018, millions of dollars.

```js echo
const brands = FileAttachment("../data/brands-2018.csv").csv({typed: true});
```
