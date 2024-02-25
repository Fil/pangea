<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Small grid contours</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Small grid contours

Part of the documentation for the [contour](https://observablehq.com/plot/marks/contour) mark.

```js echo
Plot.plot({
  grid: true,
  x: {domain: [0, grid.width], label: "column →"},
  y: {domain: [0, grid.height], label: "↑ row"},
  marks: [
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: Plot.identity,
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```

```js echo
Plot.plot({
  marks: [
    Plot.contour(grid.values, {
      width: grid.width,
      height: grid.height,
      fill: Plot.identity,
      interval: 5
    }),
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: "white",
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```

```js echo
grid = ({
  "width": 10,
  "height": 10,
  "values": [
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
     0,  2,  4,  6,  8, 10, 12, 14, 16, 18,
     0,  3,  6,  9, 12, 15, 18, 21, 24, 27,
     0,  4,  8, 12, 16, 20, 24, 28, 32, 36,
     0,  5, 10, 15, 20, 25, 30, 35, 40, 45,
     0,  6, 12, 18, 24, 30, 36, 42, 48, 54,
     0,  7, 14, 21, 28, 35, 42, 49, 56, 63,
     0,  8, 16, 24, 32, 40, 48, 56, 64, 72,
     0,  9, 18, 27, 36, 45, 54, 63, 72, 81
  ]
})
```
