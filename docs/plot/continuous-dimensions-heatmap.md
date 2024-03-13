---
source: https://observablehq.com/@observablehq/plot-continuous-dimensions-heatmap
index: true
---

# Quantitative dimensions heatmap

Given two quantitative dimensions for _x_ and _y_, use the [bin](https://observablehq.com/plot/transforms/bin) transform to create a heatmap.

```js echo
const chart = Plot.plot({
  height: 640,
  marginLeft: 44,
  color: {
    scheme: dark ? "turbo" : "bupu",
    type: "symlog"
  },
  marks: [Plot.rect(diamonds, Plot.bin({fill: "count"}, {x: "carat", y: "price", thresholds: 100}))]
});

display(chart);
```

```js echo
const diamonds = FileAttachment("../data/diamonds.csv").csv({typed: true});
```
