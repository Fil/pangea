---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Function contour</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Function contour

The [contours](https://observablehq.com/plot/marks/contour) of a function of _x_ and _y_. To draw multiple functions jointly, see the [Faceted function contour](/@observablehq/plot-faceted-function-contour) notebook.

```js echo
Plot.plot({
  color: {type: "diverging"},
  aspectRatio: 1,
  marks: [
    Plot.contour({
      fill: peaks,
      stroke: "currentColor",
      x1: -3,
      x2: 3,
      y1: -2.2,
      y2: 2.2
    })
  ]
});
```

```js echo
// adapted from https://www.mathworks.com/help/matlab/ref/peaks.html
peaks = (y, x) =>
  3 * (1 - x) ** 2 * Math.exp(-x * x - (y + 1) ** 2) -
  10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-x * x - y * y) -
  (1 / 3) * Math.exp(-y * y - (x + 1) ** 2);
```
