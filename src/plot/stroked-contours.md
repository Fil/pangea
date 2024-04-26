---
source: https://observablehq.com/@observablehq/plot-stroked-contours
index: true
---

# Stroked contours

[Contours](https://observablehq.com/plot/marks/contour) default to a stroked outline of the region that contains values above each threshold.

```js echo
const chart = Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height
}).plot({aspectRatio: 1});

display(chart);
```

```js echo
const volcano = FileAttachment("../data/volcano.json").json();
```
