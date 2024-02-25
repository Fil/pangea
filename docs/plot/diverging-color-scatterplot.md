<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Diverging color scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Diverging color scatterplot

This plot of global average surface temperature ([GISTEMP](https://data.giss.nasa.gov/gistemp/)) uses a *diverging* *color* scale to indicate the deviation from the 1951–1980 average in degrees Celsius. Each measurement is drawn with a [dot](https://observablehq.com/plot/marks/dot), and a ramp [legend](https://observablehq.com/plot/features/legend) allows the reader to interpret the color—which in this case is redundant with its *y* position.

```js echo
Plot.plot({
  y: {
    grid: true,
    tickFormat: "+f",
    label: "↑ Surface temperature anomaly (°F)"
  },
  color: {
    scheme: "BuRd",
    legend: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
  ]
})
```

```js echo
gistemp = FileAttachment("gistemp.csv").csv({typed: true})
```
