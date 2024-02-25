<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Barcode chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Barcode chart

A barcode chart just adds a [tick](https://observablehq.com/plot/marks/tick) for each value; if the values overlap, use strokeOpacity to give a sense of density. In this example, the populations are [normalized](https://observablehq.com/plot/transforms/normalize) to reflect the percentage of each age class in every State.

```js echo
Plot.plot({
  x: {
    grid: true,
    label: "Population (%) →",
    percent: true
  },
  y: {
    domain: stateage.ages, // in age order
    reverse: true,
    label: "↑ Age (years)",
    labelAnchor: "top"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.tickX(stateage, Plot.normalizeX("sum", {z: "state", x: "population", y: "age"}))
  ]
})
```

```js echo
wide = FileAttachment("us-population-state-age.csv").csv({ typed: true })
```

```js echo
stateage = {
  const ages = wide.columns.slice(1);
  const values = wide.flatMap(({name, ...values}) => ages.map((age) => ({state: name, age, population: values[age]})));
  values.ages = ages;
  return values;
}
```
