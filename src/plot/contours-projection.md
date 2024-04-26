---
source: https://observablehq.com/@observablehq/plot-contours-projection
index: true
---

# Contours & projection

When [contours](https://observablehq.com/plot/marks/contour) are applied to samples with [projected](https://observablehq.com/plot/features/projections) coordinates, it is useful to [clip](https://observablehq.com/plot/features/marks#mark-options) the mark to the sphere.

```js echo
const chart = Plot.plot({
  projection: "equal-earth",
  color: {
    scheme: "BuPu",
    domain: [0, 6],
    legend: true,
    label: "Water vapor (cm)"
  },
  marks: [
    Plot.contour(vapor, {
      fill: Plot.identity,
      width: 360,
      height: 180,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      blur: 1,
      stroke: "black",
      strokeWidth: 0.5,
      clip: "sphere"
    }),
    Plot.sphere({stroke: "black"})
  ]
});

display(chart);
```

```js echo
const vapor = FileAttachment("../data/water-vapor.csv")
  .csv({array: true})
  .then((rows) => rows.flat().map((x) => (x === "99999.0" ? NaN : +x)));
```
