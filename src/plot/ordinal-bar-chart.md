---
source: https://observablehq.com/@observablehq/plot-ordinal-bar-chart
index: true
---

# Ordinal bar chart

Use the [interval scale option](https://observablehq.com/plot/features/scales#interval) to make sure that missing data is not invisibly skipped:

```js echo
const chart = Plot.plot({
  height: 280,
  marginBottom: 35,
  x: {interval: "quarter", label: null},
  marks: [
    Plot.axisX({tickFormat: "Q%q", ticks: 30}),
    Plot.axisX({
      tickFormat: (d) => (d.getUTCMonth() === 3 ? `${d.getUTCFullYear()}` : ""),
      tickSize: 0,
      textAnchor: "start",
      ticks: 30,
      dy: 14
    }),
    Plot.barY(vacancies, {x: "month", y: "vacancies"}),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
// See https://observablehq.com/@observablehq/plot-job-vacancies
const vacancies = FileAttachment("../data/vacancies.csv")
  .csv({typed: true})
  .then((d) => d.slice(106, 127));
```
