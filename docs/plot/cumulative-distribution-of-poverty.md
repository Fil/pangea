<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Cumulative distribution of poverty</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Cumulative distribution of poverty

Each [rect](https://observablehq.com/plot/marks/rect) represents a country: _x_ encodes the country’s population, while _y_ encodes the proportion of that population living in poverty; hence area represents the number of people living in poverty. Rects are [stacked](https://observablehq.com/plot/transforms/stack) along _x_ in order of descending _y_. Inspired by [Max Roser](https://ourworldindata.org/poverty-minimum-growth-needed).

```js echo
Plot.plot({
  x: {label: "Population (millions) →"},
  y: {percent: true, label: "↑ Proportion living on less than $30 per day (%)"},
  marks: [
    Plot.rectY(povcalnet, Plot.stackX({
      filter: (d) => ["N", "A"].includes(d.CoverageType),
      x: "ReqYearPopulation",
      order: "HeadCount",
      reverse: true,
      y2: "HeadCount", // y2 to avoid stacking by y
      title: (d) => `${d.CountryName}\n${(d.HeadCount * 100).toFixed(1)}%`,
      insetLeft: 0.2,
      insetRight: 0.2
    })),
    Plot.ruleY([0])
  ]
})
```

```js echo
povcalnet = FileAttachment("povcalnet.csv").csv({typed: true})
```
