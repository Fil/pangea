---
source: https://observablehq.com/@observablehq/plot-parcoords
index: true
---

# Parallel coordinates

Each quantitative dimension of the _cars_ dataset is normalized and mapped to a different (parallel) axis with a dedicated [D3 scale](https://github.com/d3/d3-scale). [Lines](https://observablehq.com/plot/marks/line) connect the positions of a car across dimensions. Axes are rendered with explicit [rules](https://observablehq.com/plot/marks/rule) and [text](https://observablehq.com/plot/marks/text) marks.

```js
const color = view(Inputs.select(dimensions, {label: "color by"}));
```

```js echo
// Reshape wide data to make it tidy.
const points = dimensions.flatMap((dimension) =>
  cars.map(({[dimension]: value}, index) => ({index, dimension, value}))
);

// Compute normalization scales for each dimension.
const scales = new Map(
  dimensions.map((dimension) => [dimension, d3.scaleLinear().domain(d3.extent(cars, (d) => d[dimension]))])
);

// Compute ticks for each dimension.
const ticks = dimensions.flatMap((dimension) => {
  return scales
    .get(dimension)
    .ticks(7)
    .map((value) => ({dimension, value}));
});

const chart = Plot.plot({
  marginLeft: 104,
  marginRight: 20,
  x: {axis: null},
  y: {padding: 0.1, domain: dimensions, label: null, tickPadding: 9},
  color: {
    ...(dark
      ? {
          type: "diverging",
          interpolate: interpolateOrDBu
        }
      : {scheme: "BrBG"}),
    type: "linear",
    reverse: true,
    legend: true
  },
  marks: [
    Plot.ruleY(dimensions),
    Plot.lineX(points, {
      x: ({dimension, value}) => scales.get(dimension)(value),
      y: "dimension",
      z: "index",
      stroke: ({index}) => cars[index][color],
      strokeWidth: 0.5,
      strokeOpacity: 0.5
    }),
    Plot.text(ticks, {
      x: ({dimension, value}) => scales.get(dimension)(value),
      y: "dimension",
      text: "value",
      fill: "currentColor",
      stroke: "var(--plot-background)",
      strokeWidth: 3
    })
  ]
});

display(chart);
```

```js echo
const dimensions = cars.columns.slice(1);
```

```js echo
const cars = FileAttachment("../data/cars.csv").csv({typed: true});
```

```js echo
import {dark, interpolateOrDBu} from "../components/dark.js";
```
