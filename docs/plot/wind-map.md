<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Wind map</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Wind map

[Vectors](https://observablehq.com/plot/marks/vector) on a grid can show both direction and intensity—in this case, the speed of winds.

```js echo
Plot.plot({
  inset: 10,
  aspectRatio: 1,
  color: {
    label: "Speed (m/s)",
    zero: true,
    legend: true
  },
  marks: [
    Plot.vector(wind, {
      x: "longitude",
      y: "latitude",
      rotate: ({u, v}) => Math.atan2(u, v) * 180 / Math.PI,
      length: ({u, v}) => Math.hypot(u, v),
      stroke: ({u, v}) => Math.hypot(u, v)
    })
  ]
})
```

```js echo
wind = FileAttachment("wind.csv").csv({typed: true})
```
