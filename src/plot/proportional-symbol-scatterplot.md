---
source: https://observablehq.com/@observablehq/plot-proportional-symbol-scatterplot
index: true
---

# Proportional symbol scatterplot

[Dots](https://observablehq.com/plot/marks/dot) with a radius [encoding](https://observablehq.com/plot/features/scales).

```js echo
const chart = Plot.plot({
  grid: true,
  x: {
    label: "Daily change (%) →",
    tickFormat: "+f",
    percent: true
  },
  y: {
    type: "log",
    label: "↑ Daily trading volume"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.dot(aapl, {
      x: (d) => (d.Close - d.Open) / d.Open,
      y: "Volume",
      r: "Volume"
    })
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
