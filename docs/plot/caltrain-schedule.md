---
source: https://observablehq.com/@observablehq/plot-caltrain-schedule
index: false
draft: true
---

# Stem-and-leaf plot

## Caltrain schedule

[Stack](https://observablehq.com/plot/transforms/stack) a [text](https://observablehq.com/plot/marks/text) mark to display a neat schedule for the Caltrain.

```js echo
const chart = Plot.plot({
  width: 240,
  axis: null,
  x: {type: "point"},
  y: {type: "point", domain: d3.range(4, 25)},
  color: {
    domain: "NLB",
    range: dark ? ["currentColor", "orange", "#ff6622"] : ["currentColor", "peru", "brown"],
    legend: true
  },
  marks: [
    Plot.text([[0.5, 4]], {
      text: ["Northbound"],
      textAnchor: "start",
      dx: 16
    }),
    Plot.text([[-0.5, 4]], {
      text: ["Southbound"],
      textAnchor: "end",
      dx: -16
    }),
    Plot.text(d3.range(5, 25), {
      x: 0,
      y: Plot.identity,
      text: (y) => `${y % 12 || 12}${y % 24 >= 12 ? "p" : "a"}`
    }),
    Plot.text(
      caltrain,
      Plot.stackX2({
        x: (d) => (d.orientation === "N" ? 1 : -1),
        y: "hours",
        fill: "type",
        text: "minutes"
      })
    ),
    Plot.ruleX([-0.5, 0.5])
  ]
});

display(chart);
```

```js echo
const caltrain = FileAttachment("../data/caltrain-schedule.csv").csv({typed: true});
```

```js echo
import {dark} from "../components/dark.js";
```
