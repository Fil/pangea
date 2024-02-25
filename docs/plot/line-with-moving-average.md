<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line with moving average</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line with moving average

The [window](https://observablehq.com/plot/transforms/window) transform can be used to draw a moving average atop points — here, global temperature readings. Source: [NASA Goddard Institute for Space Studies](https://data.giss.nasa.gov/gistemp/)

```js echo
Plot.plot({
  color: {scheme: "BuRd"},
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"}),
    Plot.lineY(gistemp, Plot.windowY(12, {x: "Date", y: "Anomaly"}))
  ]
})
```

```js echo
gistemp = FileAttachment("gistemp.csv").csv({typed: true})
```
