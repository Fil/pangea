<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Arrow variation chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Arrow variation chart

An [arrow](https://observablehq.com/plot/marks/arrow) connects the positions in 1980 and 2015 of each city on this population &times; inequality chart. Color [encodes](https://observablehq.com/plot/features/scales) variation.

```js echo
Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population →"
  },
  y: {
    label: "↑ Inequality",
    ticks: 4
  },
  color: {
    scheme: "BuRd",
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f"
  },
  marks: [
    Plot.arrow(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      bend: true,
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "white",
      dy: -6
    })
  ]
})
```

```js echo
metros = FileAttachment("metros.csv").csv({typed: true})
```
