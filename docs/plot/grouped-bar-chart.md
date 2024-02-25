---
source: https://observablehq.com/@observablehq/plot-grouped-bar-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Grouped bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Grouped bar chart

[Facets](https://observablehq.com/plot/features/facets) group the bars by State; the _fx_ domain, representing States, is [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) by the sum total of the heights of the bars (in other words, by total population). Each facet is a simple bar chart, with the ordinal _x_ position ordered by age (_keys_).

```js echo
Plot.plot({
  x: {axis: null},
  y: {tickFormat: "s", grid: true},
  color: {scheme: "spectral", legend: true},
  marks: [
    Plot.barY(data, {
      x: "key",
      y: "population",
      fill: "key",
      fx: "state",
      sort: {x: null, color: null, fx: {value: "-y", reduce: "sum"}}
    }),
    Plot.ruleY([0])
  ]
});
```

```js echo
const data = FileAttachment("population-state-age.csv").csv({typed: true});
```
