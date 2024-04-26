---
source: https://observablehq.com/@observablehq/plot-non-faceted-marks
index: true
---

# Non-faceted marks

The entire population of penguins is repeated in each [facet](https://observablehq.com/plot/features/facets) as small gray dots, making it easier to see how each facet compares to the whole.

```js echo
const chart = Plot.plot({
  grid: true,
  marginRight: 60,
  facet: {label: null},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "#aaa",
      r: 1
    }),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species"
    })
  ]
});

display(chart);
```
