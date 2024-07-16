---
source: https://observablehq.com/@observablehq/plot-dow-jones-calendar
index: true
---

# Simple calendar

A faceted heatmap where the week of year is encoded as _x_, day of week as _y_, year as the _fy_ facet, and value as the fill color of each [cell](https://observablehq.com/plot/features/marks/cell). See also an [elaborate calendar](./calendar).

```js echo
const calendar = Plot.plot({
  padding: 0,
  x: {axis: null},
  y: {tickFormat: Plot.formatWeekday("en", "narrow"), tickSize: 0},
  fy: {tickFormat: ""},
  color: {
    ...(dark
      ? {
          type: "diverging",
          interpolate: interpolatePiDG
        }
      : {scheme: "PiYG"}),
    legend: true,
    label: "Daily change",
    tickFormat: "+%",
    domain: [-0.06, 0.06]
  },
  marks: [
    Plot.cell(dji, {
      x: (d) => d3.utcWeek.count(d3.utcYear(d.Date), d.Date),
      y: (d) => d.Date.getUTCDay(),
      fy: (d) => d.Date.getUTCFullYear(),
      fill: (d, i) => (i > 0 ? (d.Close - dji[i - 1].Close) / dji[i - 1].Close : NaN),
      title: (d, i) => (i > 0 ? (((d.Close - dji[i - 1].Close) / dji[i - 1].Close) * 100).toFixed(1) : NaN),
      inset: 0.5
    })
  ]
});

display(calendar);
```

```js echo
const dji = FileAttachment("../data/^DJI.csv").csv({typed: true});
```

```js echo
import {interpolatePiDG} from "/components/dark.js"
```
