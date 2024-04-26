---
source: https://observablehq.com/@observablehq/plot-igrf90-contours
index: true
---

# IGRF90 contours

The [contour](https://observablehq.com/plot/marks/contour) mark can derive contours from non-gridded data samples.

```js echo
const chart = Plot.contour(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90"}).plot({
  color: {type: "diverging"}
});

display(chart);
```

```js echo
const ca55 = FileAttachment("../data/ca55-south.csv").csv({typed: true});
```
