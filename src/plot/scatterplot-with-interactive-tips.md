---
source: https://observablehq.com/@observablehq/scatterplot-with-interactive-tips
index: true
---

# Scatterplot with interactive tips

Add **tip**: true to the [dot](https://observablehq.com/plot/marks/dot) mark for a default [interactive tip](https://observablehq.com/plot/features/interactions). Declare extra **channels** to add the relevant information in the [tip](https://observablehq.com/plot/marks/tip).

```js echo
const chart = Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot();

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
