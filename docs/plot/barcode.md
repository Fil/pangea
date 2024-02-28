---
source: https://observablehq.com/@observablehq/plot-barcode
index: true
---

# Barcode chart

A barcode chart just adds a [tick](https://observablehq.com/plot/marks/tick) for each value; if the values overlap, use strokeOpacity to give a sense of density. In this example, the populations are [normalized](https://observablehq.com/plot/transforms/normalize) to reflect the percentage of each age class in every State.

```js echo
const chart = Plot.plot({
  x: {
    grid: true,
    label: "Population (%) →",
    percent: true
  },
  y: {
    domain: ages, // in age order
    reverse: true,
    label: "↑ Age (years)",
    labelAnchor: "top"
  },
  marks: [Plot.ruleX([0]), Plot.tickX(stateage, Plot.normalizeX("sum", {z: "state", x: "population", y: "age"}))]
});

display(chart);
```

```js echo
const wide = FileAttachment("../data/us-population-state-age.csv").csv({typed: true});
```

```js echo
const ages = wide.columns.slice(1);
const stateage = wide.flatMap(({name, ...values}) => ages.map((age) => ({state: name, age, population: values[age]})));
```
