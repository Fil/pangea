---
source: https://observablehq.com/@observablehq/plot-faceted-lollipop
index: true
---

# Small multiple lollipop

[Facet](https://observablehq.com/plot/features/facets) [lollipops](./lollipop) by category for an alternative to a [grouped bar chart](./grouped-bar-chart).

```js echo
const chart = Plot.plot({
  marginLeft: 50,
  color: {domain: keys, scheme: "Warm", legend: true},
  facet: {data: population, x: "state"},
  y: {tickFormat: "s", grid: true},
  x: {axis: null, domain: keys},
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
      sort: {fx: "y", reduce: "sum", reverse: true}
    }),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const population = FileAttachment("../data/population-state-age.csv").csv({
  typed: true
});
```

```js
display(population);
```

```js echo
const keys = d3.sort(new Set(population.map((d) => d.key)), (d) => parseInt(d.match(/\d+/)[0]));
```
