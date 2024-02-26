---
source: https://observablehq.com/@observablehq/plot-filled-contours
index: true
---

# Filled contours

[Contours](https://observablehq.com/plot/marks/contour) can be filled with a color based on their value.

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  color: {
    legend: true,
    label: "Elevation (m)"
  },
  marks: [
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      fill: Plot.identity,
      stroke: "black"
    })
  ]
});

display(chart);
```

```js echo
const volcano = FileAttachment("../data/volcano.json").json();
```
