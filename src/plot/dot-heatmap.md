---
source: https://observablehq.com/@observablehq/plot-dot-heatmap
index: true
---

# Dot heatmap

The [bin](https://observablehq.com/plot/transforms/bin) transform aggregates data along two quantitative axes _x_ and _y_. The result can be displayed by a [dot](https://observablehq.com/plot/marks/dot) mark with a _radius_ encoding the number of elements in each bin.

```js echo
const chart = Plot.plot({
  r: {range: [0, 6]}, // generate slightly smaller dots
  marks: [Plot.dot(olympians, Plot.bin({r: "count"}, {x: "weight", y: "height"}))]
});

display(chart);
```

Each bin can be further grouped by category (here, by _sex_):

```js echo
const chart2 = Plot.plot({
  r: {range: [0, 6]},
  marks: [
    Plot.dot(
      olympians,
      Plot.bin({r: "count"}, {x: "weight", y: "height", stroke: "sex", mixBlendMode: dark ? "screen" : "multiply"})
    )
  ]
});

display(chart2);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
