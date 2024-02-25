---
source: https://observablehq.com/@observablehq/plot-dodge-penguins
index: true
---

# Dodge penguins

Distribution of [Palmer penguins](https://allisonhorst.github.io/palmerpenguins/) body masses, [faceted](https://observablehq.com/plot/features/facets) by species, colored by sex, using the [dodge transform](https://observablehq.com/plot/transforms/dodge).

```js echo
const chart = Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [Plot.dot(penguins, Plot.dodgeX("middle", {fx: "species", y: "body_mass_g", fill: "sex"}))]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
