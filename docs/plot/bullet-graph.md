---
source: https://observablehq.com/@observablehq/plot-bullet-graph
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Bullet graph</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Bullet graph

## California COVID-19 disparities

Data: Ben Welsh (17 May, 2020), [“Tracking coronavirus in California”](https://www.latimes.com/projects/california-coronavirus-cases-tracking-outbreak/), _Los Angeles Times_ (see the [original notebook](https://observablehq.com/@datadesk/california-covid-19-disparities-bullet-graph)). This version uses two [bar](https://observablehq.com/plot/marks/bar) marks, one for the background (proportion of the general population) and one for the data (proportion of Covid-19 cases). Compare to [Bullet graph II](/@fil/bullet-graph-2).

For more details on bullet graph designs, see [Wikipedia](https://en.wikipedia.org/wiki/Bullet_graph).

```js echo
Plot.plot({
  width,
  height: 200,
  facet: {
    data,
    x: "race",
    label: "Proportion of COVID-19 cases (color) vs. share of population (gray), by race and age"
  },
  x: {
    axis: "top",
    grid: true,
    ticks: d3.range(0, 51, 10),
    tickFormat: (d) => (d === 50 ? `${d}%` : `${d}`),
    tickSize: 0
  },
  y: {
    label: null,
    domain: ["80+", "65-79", "50-64", "35-49", "18-34", "0-17"]
  },
  color: {scheme: "dark2"},
  marks: [
    Plot.barX(data, {
      x: "population_percent",
      y: "age",
      fill: "#ddd",
      insetTop: 2,
      insetBottom: 2
    }),
    Plot.barX(data, {
      x: "cases_percent",
      y: "age",
      fill: "race",
      sort: {fx: "x", reverse: true},
      insetTop: 6,
      insetBottom: 6
    })
  ]
});
```

```js
Inputs.table(data);
```

```js echo
const data = FileAttachment("covid.csv").csv({typed: true});
```
