---
source: https://observablehq.com/@observablehq/plot-arrow-variation-chart
index: true
---

# Arrow variation chart

An [arrow](https://observablehq.com/plot/marks/arrow) connects the positions in 1980 and 2015 of each city on this population &times; inequality chart. Color [encodes](https://observablehq.com/plot/features/scales) variation.

```js echo
const chart = Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population →"
  },
  y: {
    label: "↑ Inequality",
    ticks: 4
  },
  color: {
    type: "diverging",
    ...(dark
      ? {interpolate: interpolateDivergent("#44f", "#f96", {pivot: d3.rgb(NaN, NaN, NaN), back: "#311"})}
      : {scheme: "BuRd"}),
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f"
  },
  marks: [
    Plot.arrow(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      bend: true,
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "var(--plot-background)",
      dy: -6
    })
  ]
});

display(chart);
```

```js echo
const metros = FileAttachment("../data/metros.csv").csv({typed: true});
```

```js echo
import {interpolateDivergent} from "../components/dark.js";
```
