<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Major and minor axis ticks</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Major and minor axis ticks

The [axis](https://observablehq.com/plot/marks/axis) mark can be called several times with different options.

```js echo
Plot.plot({
  x: {nice: true},
  y: {grid: true},
  marks: [
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.axisX({ticks: "month", text: null, tickSize: 3}),
    Plot.axisX(),
    Plot.axisY({ticks: 50, tickSize: 3, text: null}),
    Plot.axisY()
  ]
})
```
