---
source: https://observablehq.com/@observablehq/plot-vertical-bars-rotated-labels
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Vertical bars, rotated labels</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Vertical bars, rotated labels

The [tickRotate](https://observablehq.com/plot/marks/axis#axis-options) axis option rotates the tick labels.

```js echo
Plot.plot({
  marginBottom: 60,
  x: {
    tickRotate: -30
  },
  y: {
    transform: (d) => d / 1000,
    label: "↑ Market value (US dollars, billions)",
    grid: 5
  },
  marks: [
    Plot.ruleY([0]),

    Plot.barY(brands, {
      x: "name",
      y: "value",
      sort: {x: "y", reverse: true, limit: 20},
      fill: "steelblue"
    })
  ]
});
```

Data: Interbrand. Market value of 100 top global brands in 2018, millions of dollars.

```js echo
const brands = FileAttachment("brands-2018.csv").csv({typed: true});
```
