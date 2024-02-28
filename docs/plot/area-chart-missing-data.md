---
source: https://observablehq.com/@observablehq/plot-area-chart-missing-data
index: true
---

# Area chart, missing data

The [area mark](../area), <span style="border-bottom: 2px var(--theme-foreground-focus) solid">highlighted</span>, shows gaps for missing data—points where the value is NaN, undefined, or Infinite. A second area, in <span style="border-bottom: 2px var(--theme-foreground-faintest) solid">grey</span>, has these data points filtered out altogether, resulting instead in linear interpolation for the gaps.

```js echo
const chart = Plot.plot({
  y: {grid: true, label: "Daily close ($)"},
  marks: [
    Plot.areaY(aaplMissing, {
      filter: (d) => !isNaN(d.Close),
      x: "Date",
      y1: "Close",
      fill: "var(--theme-foreground-faintest)"
    }),
    Plot.areaY(aaplMissing, {x: "Date", y1: "Close", fill: "var(--theme-foreground-focus)"}),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```

```js echo
const aaplMissing = aapl.map((d) => ({
  ...d,
  Close: d.Date.getUTCMonth() < 3 ? NaN : d.Close
})); // simulate gaps
```
