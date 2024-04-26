---
source: https://observablehq.com/@observablehq/plot-cumulative-distribution-of-poverty
index: true
---

# Cumulative distribution of poverty

Each [rect](https://observablehq.com/plot/marks/rect) represents a country: _x_ encodes the country’s population, while _y_ encodes the proportion of that population living in poverty; hence area represents the number of people living in poverty. Rects are [stacked](https://observablehq.com/plot/transforms/stack) along _x_ in order of descending _y_. Inspired by [Max Roser](https://ourworldindata.org/poverty-minimum-growth-needed).

```js echo
const chart = Plot.plot({
  x: {label: "Population (millions) →"},
  y: {
    percent: true,
    label: "↑ Proportion living on less than $30 per day (%)"
  },
  marks: [
    Plot.rectY(
      povcalnet,
      Plot.stackX({
        filter: (d) => ["N", "A"].includes(d.CoverageType),
        x: "ReqYearPopulation",
        order: "HeadCount",
        reverse: true,
        y2: "HeadCount", // y2 to avoid stacking by y
        title: (d) => `${d.CountryName}\n${(d.HeadCount * 100).toFixed(1)}%`,
        insetLeft: 0.2,
        insetRight: 0.2
      })
    ),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const povcalnet = FileAttachment("../data/povcalnet.csv").csv({typed: true});
```
