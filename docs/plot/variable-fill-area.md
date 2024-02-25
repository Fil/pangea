<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Variable fill area</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Variable fill area

Set the **z** option to null for [area](https://observablehq.com/plot/marks/area) (or [line](https://observablehq.com/@observablehq/plot-window-and-map)) charts that represent a single series of data with a varying color.

```js echo
Plot.plot({
  color: {
    type: "log",
    legend: true
  },
  marks: [
    Plot.areaY(aapl, {x: "Date", y: "Close", fill: "Volume", z: null}),
    Plot.ruleY([0])
  ]
})
```
