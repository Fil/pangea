---
source: https://observablehq.com/@observablehq/plot-band-chart-with-rule
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Band chart with rule</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Band chart with rule

A [ruleX](https://observablehq.com/plot/marks/rule) encodes a vertical extent at a given horizontal position.

```js echo
Plot.plot({
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
```

```js echo
const seattle = FileAttachment("seattle-weather.csv").csv({typed: true});
```
