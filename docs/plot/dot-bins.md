<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Dot histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Dot histogram

A [dot](https://observablehq.com/plot/marks/dot) mark with a radius [encoding](https://observablehq.com/plot/features/scales) representing the count of Olympic athletes, [binned](https://observablehq.com/plot/transforms/bin) by weight.

```js echo
Plot.plot({
  r: {range: [0, 14]},
  marks: [
    Plot.dot(olympians, Plot.binX({r: "count"}, {x: "weight"}))
  ]
})
```
