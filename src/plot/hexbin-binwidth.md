---
source: https://observablehq.com/@observablehq/plot-hexbin-binwidth
index: true
---

# Hexbin binWidth option

Olympic athletes are placed on this [heatmap](./olympians-hexbin) according to their weight and height, [scaled](https://observablehq.com/plot/features/scales) by _x_ and _y_. _Then_ their positions (in pixels) are grouped into [hexagonal bins](https://observablehq.com/plot/transforms/hexbin), which are represented with a _radius_ that encodes frequency. The **binWidth** option (default 20) defines the distance between centers of neighboring hexagons in pixels.

```js
const binWidth = view(Inputs.range([0.5, 40], {value: 20, label: "binWidth", step: 0.1}));
```

```js echo
const chart = Plot.dot(olympians, Plot.hexbin({r: "count"}, {x: "weight", y: "height", binWidth})).plot();

display(chart);
```
