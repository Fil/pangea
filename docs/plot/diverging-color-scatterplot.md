---
source: https://observablehq.com/@observablehq/plot-diverging-color-scatterplot
index: true
---

# Diverging color scatterplot

This plot of global average surface temperature ([GISTEMP](https://data.giss.nasa.gov/gistemp/)) uses a _diverging_ _color_ scale to indicate the deviation from the 1951–1980 average in degrees Celsius. Each measurement is drawn with a [dot](https://observablehq.com/plot/marks/dot), and a ramp [legend](https://observablehq.com/plot/features/legend) allows the reader to interpret the color—which in this case is redundant with its _y_ position.

```js echo
const chart = Plot.plot({
  y: {
    grid: true,
    tickFormat: "+f",
    label: "↑ Surface temperature anomaly (°F)"
  },
  color: {
    ...(dark ? {type: "diverging", interpolate: interpolateBuGyRd} : {scheme: "BuRd"}),
    legend: true
  },
  marks: [Plot.ruleY([0]), Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"})]
});

display(chart);
```

```js echo
const gistemp = FileAttachment("../data/gistemp.csv").csv({typed: true});
```

```js echo
import {dark, interpolateBuGyRd} from "../components/dark.js";
```
