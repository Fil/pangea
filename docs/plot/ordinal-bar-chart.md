---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Ordinal bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Ordinal bar chart

Use the [interval scale option](https://observablehq.com/plot/features/scales#interval) to make sure that missing data is not invisibly skipped:

```js echo
Plot.plot({
  height: 280,
  marginBottom: 35,
  x: {interval: "quarter", label: null},
  marks: [
    Plot.axisX({tickFormat: "Q%q"}),
    Plot.axisX({
      tickFormat: (d) => (d.getUTCMonth() === 3 ? `${d.getUTCFullYear()}` : ""),
      tickSize: 0,
      textAnchor: "start",
      dy: 14
    }),
    Plot.barY(vacancies, {x: "month", y: "vacancies"}),
    Plot.ruleY([0])
  ]
});
```

```js echo
// See https://observablehq.com/@observablehq/plot-job-vacancies
vacancies = FileAttachment("vacancies.csv")
  .csv({typed: true})
  .then((d) => d.slice(106, 127));
```
