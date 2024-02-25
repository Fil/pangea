---
source: https://observablehq.com/@observablehq/plot-arealiney-custom-mark
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: arealineY custom mark</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# arealineY custom mark

Plot allows the creation of custom [composite marks](https://observablehq.com/plot/features/marks#marks-marks), such as this one comprising a rule, area, and line:

```js echo
function arealineY(data, {color, fillOpacity = 0.1, ...options} = {}) {
  return Plot.marks(
    Plot.ruleY([0]),
    Plot.areaY(data, {fill: color, fillOpacity, ...options}),
    Plot.lineY(data, {stroke: color, ...options})
  );
}
```

You can use this composite mark like any built-in mark:

```js echo
arealineY(aapl, {x: "Date", y: "Close", color: "steelblue"}).plot();
```
