---
source: https://observablehq.com/@observablehq/plot-stacked-percentages
index: true
---

# Stacked percentages

While the [bar](https://observablehq.com/plot/marks/bar) mark is implicitly [stacked](https://observablehq.com/plot/transforms/stack), the [text](https://observablehq.com/plot/marks/text) mark is not. This example uses an explicit stackX transform in both cases for clarity. See also [single stacked bar](./single-stacked-bar).

```js echo
const chart = Plot.plot({
  x: {percent: true},
  marks: [
    Plot.barX(alphabet, Plot.stackX({x: "frequency", fillOpacity: 0.3, inset: 0.5})),
    Plot.textX(alphabet, Plot.stackX({x: "frequency", text: "letter", inset: 0.5})),
    Plot.ruleX([0, 1])
  ]
});

display(chart);
```

```js echo
const alphabet = FileAttachment("../data/alphabet.csv").csv({typed: true});
```
