---
source: https://observablehq.com/@observablehq/plot-ggplot2-style-axes
index: true
---

# ggplot2-style axes

The [frame](https://observablehq.com/plot/marks/frame) and [grid](https://observablehq.com/plot/marks/grid) marks allow for a full customization of the chart’s background, à la [ggplot2](https://ggplot2.tidyverse.org/).

```js echo
const chart = Plot.plot({
  inset: 10,
  marks: [
    Plot.frame({fill: "currentColor", fillOpacity: 0.15}),
    Plot.gridY({stroke: "var(--theme-background)", strokeOpacity: 1}),
    Plot.gridX({stroke: "var(--theme-background)", strokeOpacity: 1}),
    Plot.line(aapl, {x: "Date", y: "Close", stroke: "currentColor"})
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
