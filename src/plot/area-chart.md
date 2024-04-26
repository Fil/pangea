---
source: https://observablehq.com/@observablehq/plot-area-chart
index: true
---

# Area chart

The [area](https://observablehq.com/plot/marks/area) mark draws the region between a baseline (**x1**, **y1**) and a topline (**x2**, **y2**) as in an area chart. Often the baseline represents _y_ = 0, and because the area mark interpolates between adjacent data points, typically both the x and y scales are quantitative or temporal.

```js echo
display(Plot.areaY(aapl, {x: "Date", y: "Close"}).plot());
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
