---
source: https://observablehq.com/@observablehq/plot-dot-heatmap
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Dot heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Dot heatmap

The [bin](https://observablehq.com/plot/transforms/bin) transform aggregates data along two quantitative axes _x_ and _y_. The result can be displayed by a [dot](https://observablehq.com/plot/marks/dot) mark with a _radius_ encoding the number of elements in each bin.

```js echo
Plot.plot({
  r: {range: [0, 6]}, // generate slightly smaller dots
  marks: [Plot.dot(olympians, Plot.bin({r: "count"}, {x: "weight", y: "height"}))]
});
```

Each bin can be further grouped by category (here, by _sex_):

```js echo
Plot.plot({
  r: {range: [0, 6]},
  marks: [Plot.dot(olympians, Plot.bin({r: "count"}, {x: "weight", y: "height", stroke: "sex"}))]
});
```
