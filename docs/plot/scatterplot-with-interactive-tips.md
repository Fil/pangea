<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Scatterplot with interactive tips</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Scatterplot with interactive tips

Add **tip**: true to the [dot](https://observablehq.com/plot/marks/dot) mark for a default [interactive tip](https://observablehq.com/plot/features/interactions). Declare extra **channels** to add the relevant information in the [tip](https://observablehq.com/plot/marks/tip).

```js echo
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot()
```
