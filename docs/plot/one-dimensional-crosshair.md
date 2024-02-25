<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: One-dimensional crosshair</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# One-dimensional crosshair

If either **x** or **y** is not specified, the [crosshair](https://observablehq.com/plot/interactions/crosshair) is one-dimensional.


```js echo
Plot.plot({
  marks: [
    Plot.tickX(penguins, {x: "body_mass_g"}),
    Plot.crosshairX(penguins, {x: "body_mass_g", color: "red", opacity: 1})
  ]
})
```
