---
source: https://observablehq.com/@observablehq/plot-blurred-contours
index: true
---

# Blurred contours

Use the contour mark’s [blur](https://observablehq.com/plot/marks/contour) option for smoother isolines.

```js echo
const chart = Plot.contour(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  blur: 4
}).plot({color: {type: "diverging"}});

display(chart);
```

```js echo
const ca55 = FileAttachment("../data/ca55-south.csv").csv({typed: true});
```
