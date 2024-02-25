<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Bar and tick</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Bar and tick

A [tick](https://observablehq.com/plot/marks/tick) is convenient for stroking the upper bound of a [bar](https://observablehq.com/plot/marks/bar) for emphasis.

```js echo
Plot.plot({
  x: {label: null},
  y: {percent: true},
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fillOpacity: 0.2}),
    Plot.tickY(alphabet, {x: "letter", y: "frequency"}),
    Plot.ruleY([0])
  ]
})
```
