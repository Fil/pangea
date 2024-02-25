<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Seattle temperature temporal heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Seattle temperature temporal heatmap

A calendar with a [cell](https://observablehq.com/plot/marks/cell) for each day (*x*) of each month (*y*), [colored](https://observablehq.com/plot/features/scales#color-scales) by maximum temperature on that day.

```js echo
Plot.plot({
  padding: 0,
  y: {tickFormat: Plot.formatMonth("en", "short")},
  marks: [
    Plot.cell(seattle, Plot.group({fill: "max"}, {
      x: (d) => d.date.getUTCDate(),
      y: (d) => d.date.getUTCMonth(),
      fill: "temp_max",
      inset: 0.5
    }))
  ]
})
```

```js echo
seattle = FileAttachment("seattle-weather.csv").csv({ typed: true })
```
