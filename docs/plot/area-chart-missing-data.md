---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Area chart, missing data</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Area chart, missing data

The [area mark](/plot/marks/area), in blue, shows gaps for missing data—points where the value is NaN, undefined, or Infinite. A second area, in grey, has these data points filtered out altogether, resulting instead in linear interpolation for the gaps.

```js echo
Plot.plot({
  y: {grid: true, label: "Daily close ($)"},
  marks: [
    Plot.areaY(aaplMissing, {
      filter: (d) => !isNaN(d.Close),
      x: "Date",
      y1: "Close",
      fill: "#ccc"
    }),
    Plot.areaY(aaplMissing, {x: "Date", y1: "Close", fill: "steelblue"}),
    Plot.ruleY([0])
  ]
});
```

```js echo
const aaplMissing = aapl.map((d) => ({
  ...d,
  Close: d.Date.getUTCMonth() < 3 ? NaN : d.Close
})); // simulate gaps
```
