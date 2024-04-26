---
source: https://observablehq.com/@observablehq/plot-density-weighted
index: true
---

# Density skew (weight) interactive

Using a variable weight, we can make the [density](https://observablehq.com/plot/marks/density) mark progressively ignore some points and take others into account.

```js
const skew = view(Inputs.range([-1, 1], {label: "skew (-F/+M)", step: 0.01}));
```

```js echo
const chart = Plot.plot({
  inset: 10,
  color: {legend: true},
  marks: [
    Plot.density(
      penguins.filter((d) => d.sex),
      {
        weight: (d) => (d.sex === "FEMALE" ? 1 - skew : 1 + skew),
        x: "flipper_length_mm",
        y: "culmen_length_mm",
        strokeOpacity: 0.5,
        clip: true
      }
    ),
    Plot.dot(
      penguins.filter((d) => d.sex),
      {
        x: "flipper_length_mm",
        y: "culmen_length_mm",
        stroke: "sex",
        strokeOpacity: (d) => (d.sex === "FEMALE" ? 1 - skew : 1 + skew)
      }
    ),
    Plot.frame()
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
