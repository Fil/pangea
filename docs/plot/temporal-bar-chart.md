---
source: https://observablehq.com/@observablehq/plot-temporal-bar-chart
index: true
---

# Temporal bar chart

Use the [interval transform](https://observablehq.com/plot/transforms/interval) —here, expressed as the [rect](https://observablehq.com/plot/marks/rect) mark’s **interval** option— to convert a single time value in _x_ into an extent ⟨_x₁_, _x₂_⟩.

```js echo
const chart = Plot.plot({
  marks: [Plot.rectY(weather.slice(-42), {x: "date", y: "wind", interval: "day"}), Plot.ruleY([0])]
});

display(chart);
```

```js echo
const weather = FileAttachment("../data/seattle-weather.csv").csv({typed: true});
```
