---
source: https://observablehq.com/@observablehq/plot-faceted-function-contour
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Faceted function contour</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Faceted function contour

The [facets](https://observablehq.com/plot/features/facets) are passed as the third argument to the function of _x_ and _y_ for which we draw [contours](https://observablehq.com/plot/marks/contour). To draw a single function, see the simpler [Function contour](/@observablehq/plot-function-contour) notebook. Note that all the facets share the same thresholds.

```js echo
Plot.plot({
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
```

```js echo
function lin(x) {
  return x / fourPi;
}
```

```js echo
const sin = Math.sin;
```

```js echo
const cos = Math.cos;
```

```js echo
const fourPi = 4 * Math.PI;
```
