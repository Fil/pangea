<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: ggplot2-style axes</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# ggplot2-style axes

The [frame](https://observablehq.com/plot/marks/frame) and [grid](https://observablehq.com/plot/marks/grid) marks allow for a full customization of the chart’s background, à la [ggplot2](https://ggplot2.tidyverse.org/).

```js echo
Plot.plot({
  inset: 10,
  marks: [
    Plot.frame({fill: "#eaeaea"}),
    Plot.gridY({stroke: "white", strokeOpacity: 1}),
    Plot.gridX({stroke: "white", strokeOpacity: 1}),
    Plot.line(aapl, {x: "Date", y: "Close", stroke: "black"})
  ]
})
```
