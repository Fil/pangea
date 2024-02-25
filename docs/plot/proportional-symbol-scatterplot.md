---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Proportional symbol scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Proportional symbol scatterplot

[Dots](https://observablehq.com/plot/marks/dot) with a radius [encoding](https://observablehq.com/plot/features/scales).

```js echo
Plot.plot({
  grid: true,
  x: {
    label: "Daily change (%) →",
    tickFormat: "+f",
    percent: true
  },
  y: {
    type: "log",
    label: "↑ Daily trading volume"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.dot(aapl, {
      x: (d) => (d.Close - d.Open) / d.Open,
      y: "Volume",
      r: "Volume"
    })
  ]
});
```
