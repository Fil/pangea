<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Difference stroke</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Difference stroke

Set the **z** option to null for [line](https://observablehq.com/plot/marks/line) (or [area](https://observablehq.com/@observablehq/plot-variable-fill-area)) charts that represent a single series of data with a varying color. Here a [window](https://observablehq.com/plot/transforms/window) transform with a *difference* reducer is applied to the data and informs the stroke channel.

```js echo
Plot.plot({
  y: {grid: true},
  color: {scheme: "BuYlRd", domain: [-0.5, 0.5]},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(
      bls,
      Plot.map(
        {stroke: Plot.window({k: 2, reduce: "difference"})},
        {x: "date", y: "unemployment", z: "division", stroke: "unemployment"}
      )
    )
  ]
})
```

```js echo
bls = FileAttachment("bls-metro-unemployment.csv").csv({typed: true})
```
