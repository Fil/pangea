<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Hexbin heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Hexbin heatmap

Olympic athletes are placed on this heatmap according to their weight and height, [scaled](https://observablehq.com/plot/features/scales) by *x* and *y*. _Then_ their positions (in pixels) are binned into [hexagons](https://observablehq.com/plot/transforms/hexbin), which are filled with a *color* that encodes frequency.

```js echo
Plot
  .hexagon(olympians, Plot.hexbin({fill: "count"}, {x: "weight", y: "height", symbol: "square"}))
  .plot({color: {scheme: "YlGnBu"}})
```
