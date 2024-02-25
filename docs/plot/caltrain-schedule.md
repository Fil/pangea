---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stem-and-leaf plot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stem-and-leaf plot

[Stack](https://observablehq.com/plot/transforms/stack) a [text](https://observablehq.com/plot/marks/text) mark to display a neat schedule for the Caltrain.

```js echo
Plot.plot({
  width: 240,
  axis: null,
  x: {type: "point"},
  y: {type: "point", domain: d3.range(4, 25)},
  color: {
    domain: "NLB",
    range: ["currentColor", "peru", "brown"],
    legend: true
  },
  marks: [
    Plot.text([[0.5, 4]], {
      text: ["Northbound"],
      textAnchor: "start",
      dx: 16
    }),
    Plot.text([[-0.5, 4]], {
      text: ["Southbound"],
      textAnchor: "end",
      dx: -16
    }),
    Plot.text(d3.range(5, 25), {
      x: 0,
      y: Plot.identity,
      text: (y) => `${y % 12 || 12}${y % 24 >= 12 ? "p" : "a"}`
    }),
    Plot.text(
      caltrain,
      Plot.stackX2({
        x: (d) => (d.orientation === "N" ? 1 : -1),
        y: "hours",
        fill: "type",
        text: "minutes"
      })
    ),
    Plot.ruleX([-0.5, 0.5])
  ]
});
```

```js echo
const caltrain = FileAttachment("caltrain.csv").csv({typed: true});
```
