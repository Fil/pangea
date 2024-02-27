---
source: https://observablehq.com/@observablehq/plot-line-with-moving-average
index: true
---

# Line with moving average

The [window](https://observablehq.com/plot/transforms/window) transform can be used to draw a moving average atop points — here, global temperature readings. Source: [NASA Goddard Institute for Space Studies](https://data.giss.nasa.gov/gistemp/)

```js echo
const chart = Plot.plot({
  color: dark ? {type: "diverging", interpolate: interpolateBuGyRd} : {scheme: "BuRd"},
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"}),
    Plot.lineY(gistemp, Plot.windowY(12, {x: "Date", y: "Anomaly"}))
  ]
});

display(chart);
```

```js echo
const gistemp = FileAttachment("../data/gistemp.csv").csv({typed: true});
```

```js echo
import {dark, interpolateBuGyRd} from "../components/dark.js";
```
