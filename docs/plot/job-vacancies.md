---
source: https://observablehq.com/@observablehq/plot-job-vacancies
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Job vacancies</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Job vacancies

This area chart uses an [interval](https://observablehq.com/plot/transforms/interval) transform to avoid interpolation for the values missing in the original dataset. Data: [Australian Bureau of Statistics](https://www.abs.gov.au/statistics/labour/jobs/job-vacancies-australia/may-2022), 30 June 2022.

```js echo
Plot.plot({
  width,
  y: {label: "↑ Job vacancies, seasonally adj. (thousands)", grid: true},
  marks: [
    Plot.areaY(vacancies, {
      x: "month",
      y: "vacancies",
      curve: "step-before",
      interval: "quarter",
      fill: "pink"
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
```

```js echo
const vacancies = FileAttachment("vacancies.csv").csv({typed: true});
```
