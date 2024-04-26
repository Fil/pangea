---
source: https://observablehq.com/@observablehq/plot-band-chart-with-rule
index: true
---

# Band chart with rule

A [ruleX](https://observablehq.com/plot/marks/rule) encodes a vertical extent at a given horizontal position.

```js echo
const chart = Plot.plot({
  y: {grid: true, label: "↑ Temperature (°C)"},
  color: {scheme: "BuRd"},
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(seattle, {
      x: "date",
      y1: "temp_min",
      y2: "temp_max",
      stroke: "temp_min"
    })
  ]
});

display(chart);
```

```js echo
const seattle = FileAttachment("../data/seattle-weather.csv").csv({typed: true});
```
