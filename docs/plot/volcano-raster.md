---
source: https://observablehq.com/@observablehq/plot-volcano-raster
index: true
keywords: map
---

# Volcano raster

A [raster](https://observablehq.com/plot/marks/raster) mark directly reading an array of elevation values.

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  color: {label: "Elevation (m)", legend: true},
  marks: [
    Plot.raster(volcano.values, {
      width: volcano.width,
      height: volcano.height
    })
  ]
});

display(chart);
```

```js echo
const volcano = FileAttachment("../data/volcano.json").json();
```
