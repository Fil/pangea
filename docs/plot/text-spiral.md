<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Text spiral</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Text spiral

If both **x** and **y** are not defined, the [text](https://observablehq.com/plot/marks/text) mark assumes that the data is an iterable of points [[*x₁*, *y₁*], [*x₂*, *y₂*], …], allowing for [shorthand](https://observablehq.com/plot/features/shorthand). Furthermore, the default **text** channel is the associated datum’s index.

```js echo
Plot.plot({
  aspectRatio: 1,
  inset: 10,
  grid: true,
  marks: [
    Plot.text(d3.range(151).map((i) => [
      Math.sqrt(i) * Math.sin(i / 10),
      Math.sqrt(i) * Math.cos(i / 10)
    ]))
  ]
})
```
