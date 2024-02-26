---
source: https://observablehq.com/@observablehq/plot-hexbin-text
index: true
---

# Hexbin text

Olympic athletes are placed on this [heatmap](./olympians-hexbin) according to their weight and height, [scaled](https://observablehq.com/plot/features/scales) by _x_ and _y_. _Then_ their positions (in pixels) are grouped into [hexagonal bins](https://observablehq.com/plot/transforms/hexbin), which are represented by a [text](https://observablehq.com/plot/marks/text) mark showing the count.

```js echo
const chart = Plot.text(olympians, Plot.hexbin({text: "count"}, {x: "weight", y: "height"})).plot();

display(chart);
```
