---
source: https://observablehq.com/@observablehq/plot-line-chart-with-gaps
index: true
---

# Line with missing data

If some channel values are undefined (or null or NaN), gaps will appear between adjacent points of a [line](https://observablehq.com/plot/marks/line) mark. To demonstrate, below we set the **y** value to NaN for the first three months of each year.

```js echo
const chart = Plot.plot({
  y: {
    grid: true
  },
  marks: [Plot.lineY(aapl, {x: "Date", y: (d) => (d.Date.getUTCMonth() < 3 ? NaN : d.Close)})]
});

display(chart);
```

Contrast with a chart where missing values have been filtered out:

```js echo
const chart2 = Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {filter: (d) => d.Date.getUTCMonth() >= 3, x: "Date", y: "Close", strokeOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: (d) => (d.Date.getUTCMonth() < 3 ? NaN : d.Close)})
  ]
});
display(chart2);
```
