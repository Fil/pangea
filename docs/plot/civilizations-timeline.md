---
source: https://observablehq.com/@observablehq/plot-civilizations-timeline
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot:  Civilizations timeline</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Civilizations timeline

A [bar](https://observablehq.com/plot/marks/bar) mark with explicit _x1_ and _x2_ channels, marking the start and end of civilizations.

```js echo
Plot.plot({
  marginLeft: 130,
  axis: null,
  x: {
    axis: "top",
    grid: true,
    tickFormat: (x) => (x < 0 ? `${-x} BC` : `${x} AD`)
  },
  marks: [
    Plot.barX(civilizations, {
      x1: "start",
      x2: "end",
      y: "civilization",
      sort: {y: "x1"}
    }),
    Plot.text(civilizations, {
      x: "start",
      y: "civilization",
      text: "civilization",
      textAnchor: "end",
      dx: -3
    })
  ]
});
```

```js echo
const civilizations = FileAttachment("civilizations.csv").csv({typed: true});
```
