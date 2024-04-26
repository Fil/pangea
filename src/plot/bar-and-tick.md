---
source: https://observablehq.com/@observablehq/plot-bar-and-tick
index: true
---

# Bar and tick

A [tick](https://observablehq.com/plot/marks/tick) is convenient for stroking the upper bound of a [bar](https://observablehq.com/plot/marks/bar) for emphasis.

```js echo
const chart = Plot.plot({
  x: {label: null},
  y: {percent: true},
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fillOpacity: 0.2}),
    Plot.tickY(alphabet, {x: "letter", y: "frequency"}),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const alphabet = FileAttachment("../data/alphabet.csv").csv({typed: true});
```
