---
source: https://observablehq.com/@observablehq/plot-job-vacancies
index: true
---

# Job vacancies

This area chart uses an [interval](https://observablehq.com/plot/transforms/interval) transform to avoid interpolation for the values missing in the original dataset. Data: [Australian Bureau of Statistics](https://www.abs.gov.au/statistics/labour/jobs/job-vacancies-australia/may-2022), 30 June 2022.

```js echo
const chart = Plot.plot({
  width,
  y: {label: "↑ Job vacancies, seasonally adj. (thousands)", grid: true},
  marks: [
    Plot.areaY(vacancies, {
      x: "month",
      y: "vacancies",
      curve: "step-before",
      interval: "quarter",
      fill: "var(--theme-foreground-focus)"
    }),
    Plot.lineY(vacancies, {
      x: "month",
      y: "vacancies",
      curve: "step-before",
      interval: "quarter"
    }),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const vacancies = FileAttachment("../data/vacancies.csv").csv({typed: true});
```
