---
source: https://observablehq.com/@observablehq/plot-vertical-bar-chart
index: true
---

# Vertical bar chart

The ordinal dimension (letters) is, in this case, explicitly [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) according to the _y_ dimension, _i.e._ the size of each bar, instead of following the natural order (alphabetical) of its domain.

```js echo
const chart = Plot.plot({
  y: {
    grid: true,
    percent: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.barY(alphabet, {
      x: "letter",
      y: "frequency",
      sort: {x: "y", reverse: true}
    })
  ]
});

display(chart);
```

```js echo
const alphabet = FileAttachment("../data/alphabet.csv").csv({typed: true});
```
