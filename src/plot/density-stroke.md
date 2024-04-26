---
source: https://observablehq.com/@observablehq/plot-density-stroke
index: true
---

# Density stroke

The [density](https://observablehq.com/plot/marks/density) contours can be colored based on their value.

```js echo
const chart = Plot.plot({
  inset: 10,
  grid: true,
  x: {type: "log"},
  y: {type: "log"},
  marks: [Plot.density(diamonds, {x: "carat", y: "price", stroke: "density"})]
});

display(chart);
```

```js echo
const diamonds = FileAttachment("../data/diamonds.csv").csv({typed: true});
```
