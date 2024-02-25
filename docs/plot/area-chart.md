---
source: https://observablehq.com/@observablehq/plot-area-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Area chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Area chart

The [area](https://observablehq.com/plot/marks/area) mark draws the region between a baseline (**x1**, **y1**) and a topline (**x2**, **y2**) as in an area chart. Often the baseline represents _y_ = 0, and because the area mark interpolates between adjacent data points, typically both the x and y scales are quantitative or temporal.

```js echo
Plot.areaY(aapl, {x: "Date", y: "Close"}).plot();
```
