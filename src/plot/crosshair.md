---
source: https://observablehq.com/@observablehq/plot-crosshair
index: true
---

# Crosshair

The [crosshair mark](https://observablehq.com/plot/interactions/crosshair) uses the [pointer transform](https://observablehq.com/plot/interactions/pointer) internally to display a [rule](https://observablehq.com/plot/marks/rule) and a [text](https://observablehq.com/plot/marks/text) showing the **x** (horizontal↔︎ position) and **y** (vertical↕︎ position) value of the nearest data.

```js echo
const chart = Plot.plot({
  marks: [
    Plot.dot(olympians, {x: "weight", y: "height", stroke: "sex"}),
    Plot.crosshair(olympians, {x: "weight", y: "height"})
  ]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
