---
source: https://observablehq.com/@observablehq/plot-faceted-function-contour
index: true
---

# Faceted function contour

The [facets](https://observablehq.com/plot/features/facets) are passed as the third argument to the function of _x_ and _y_ for which we draw [contours](https://observablehq.com/plot/marks/contour). To draw a single function, see the simpler [Function contour](./function-contour) page. Note that all the facets share the same thresholds.

```js echo
const chart = Plot.plot({
  height: 580,
  color: {type: "diverging", scheme: "PuOr"},
  fx: {tickFormat: (f) => f?.name},
  fy: {tickFormat: (f) => f?.name},
  marks: [
    Plot.contour({
      fill: (x, y, {fx, fy}) => fx(x) * fy(y),
      fx: [sin, sin, lin, lin],
      fy: [cos, lin, lin, cos],
      x1: 0,
      y1: 0,
      x2: fourPi,
      y2: fourPi,
      interval: 0.2
    }),
    Plot.frame()
  ]
});

display(chart);
```

```js echo
const fourPi = 4 * Math.PI;
const lin = (x) => x / fourPi;
const sin = Math.sin;
const cos = Math.cos;
```
