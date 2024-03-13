---
source: https://observablehq.com/@observablehq/plot-olympians-hexbin
index: true
---

# Hexbin heatmap

Olympic athletes are placed on this heatmap according to their weight and height, [scaled](https://observablehq.com/plot/features/scales) by _x_ and _y_. _Then_ their positions (in pixels) are binned into [hexagons](https://observablehq.com/plot/transforms/hexbin), which are filled with a _color_ that encodes frequency.

```js echo
const chart = Plot.hexagon(
  olympians,
  Plot.hexbin(
    {fill: "count"},
    {
      x: "weight",
      y: "height",
      symbol: "square"
    }
  )
).plot({color: {scheme: dark ? "turbo" : "YlGnBu"}});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```

