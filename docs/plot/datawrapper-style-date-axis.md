<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Datawrapper-style date axis
</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Datawrapper-style date axis

Plot’s time [axes](https://observablehq.com/plot/marks/axis) display month and year on two separate lines, [à la Datawrapper](https://academy.datawrapper.de/article/199-custom-date-formats-that-you-can-display-in-datawrapper).

```js echo
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.axisX({ticks: "3 months"}),
    Plot.gridX(),
    Plot.line(aapl, {x: "Date", y: "Close"})
  ]
})
```
