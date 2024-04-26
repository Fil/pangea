---
source: https://observablehq.com/@observablehq/plot-linear-regression-simpson
index: true
keywords: Linear regression
---

# Simpson’s paradox

If you measure the relationship between culmen depth and length in a mixed population of penguins, it is [positively correlated](https://observablehq.com/plot/marks/linear-regression) in each of the three species (bigger penguins with the longer culmens also tend to have the deeper ones); however, the Gentoo population has a smaller aspect ratio of depth against length, and the overall correlation across the three species is negative. This is called [Simpson’s paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox), and it applies to any data that contains underlying populations with different properties or outcomes.

```js echo
const chart = Plot.plot({
  grid: true,
  color: {legend: true},
  marks: [
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "species"
    }),
    Plot.linearRegressionY(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      stroke: "species"
    }),
    Plot.linearRegressionY(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm"
    })
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
