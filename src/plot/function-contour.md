---
source: https://observablehq.com/@observablehq/plot-function-contour
index: true
---

# Function contour

The [contours](https://observablehq.com/plot/marks/contour) of a function of _x_ and _y_. To draw multiple functions jointly, see [Faceted function contour](./faceted-function-contour).

```js echo
const chart = Plot.plot({
  color: {type: "diverging"},
  aspectRatio: 1,
  marks: [
    Plot.contour({
      fill: peaks,
      stroke: "black",
      x1: -3,
      x2: 3,
      y1: -2.2,
      y2: 2.2
    })
  ]
});

display(chart);
```

```js echo
// adapted from https://www.mathworks.com/help/matlab/ref/peaks.html
const peaks = (y, x) =>
  3 * (1 - x) ** 2 * Math.exp(-x * x - (y + 1) ** 2) -
  10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-x * x - y * y) -
  (1 / 3) * Math.exp(-y * y - (x + 1) ** 2);
```
