---
source: https://observablehq.com/@observablehq/plot-prebinned-histogram
index: true
---

# Pre-binned histogram

This is for demonstration only; you wouldn’t normally bin “by hand” as shown here, but rather use the [bin](https://observablehq.com/plot/transforms/bin) transform.

```js echo
display(Plot.rectY(bins, {x1: "x0", x2: "x1", y2: "length", insetLeft: 1}).plot());
```

```js echo
const bins = d3
  .bin()
  .thresholds(80)
  .value((d) => d.weight)(olympians);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
