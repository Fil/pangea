---
source: https://observablehq.com/@observablehq/plot-window-reduce
index: true
---

# Plot: window reducers

The [window](https://observablehq.com/plot/transforms/window) transform computes a moving window of _k_ values, and then derives summary statistics from the current window, say to compute rolling averages, rolling medians, rolling minimums, or rolling maximums.

```js echo
const chart = Plot.plot({
  y: {
    grid: true,
    label: "↑ Temperature (°F)"
  },
  marks: [
    Plot.lineY(sftemp, {x: "date", y: "low", strokeOpacity: 0.3}),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "min"}, {x: "date", y: "low", stroke: "blue"})),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "max"}, {x: "date", y: "low", stroke: "red"})),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "median"}, {x: "date", y: "low"}))
  ]
});

display(chart);
```

```js echo
const sftemp = FileAttachment("../data/sf-temperatures.csv").csv({typed: true});
```
