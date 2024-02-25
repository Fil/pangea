# Plot: Faceted lollipop

[Facet](https://observablehq.com/plot/features/facets) [lollipops](https://observablehq.com/@observablehq/plot-lollipop) by category for an alternative to a [grouped bar chart](https://observablehq.com/@observablehq/plot-grouped-bar-chart).

```js echo
Plot.plot({
  marginLeft: 50,
  color: { domain: keys, scheme: "Warm", legend: true },
  facet: { data: population, x: "state" },
  y: { tickFormat: "s", grid: true },
  x: { axis: null, domain: keys },
  marks: [
    Plot.ruleX(population, {
      x: "key",
      y: "population",
      stroke: "key",
      strokeWidth: 3
    }),
    Plot.dot(population, {
      x: "key",
      y: "population",
      fill: "key",
      r: 5,
      sort: { fx: "y", reduce: "sum", reverse: true }
    }),
    Plot.ruleY([0])
  ]
})
```

```js echo
population = FileAttachment("us-state-population.csv").csv({typed: true})
```

```js echo
keys = d3.sort(new Set(population.map(d => d.key)), d => parseInt(d.match(/\d+/)[0]))
```
