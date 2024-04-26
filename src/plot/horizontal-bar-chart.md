---
source: https://observablehq.com/@observablehq/plot-horizontal-bar-chart
index: true
---

# Horizontal bar chart

The ordinal dimension (letters) is, in this case, explicitly [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) according to the _x_ dimension, _i.e._ the size of each bar, instead of following the natural order (alphabetical) of its domain.

```js echo
const chart = Plot.plot({
  x: {
    axis: "top",
    grid: true,
    percent: true
  },
  marks: [Plot.ruleX([0]), Plot.barX(alphabet, {x: "frequency", y: "letter", sort: {y: "x", reverse: true}})]
});

display(chart);
```

```js echo
const alphabet = FileAttachment("../data/alphabet.csv").csv({typed: true});
```
