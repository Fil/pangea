<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Horizontal bar chart with a label</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Horizontal bar chart with a label

Here is one way to set labels atop a [bar](https://observablehq.com/plot/marks/bar) mark; for more, see [these variants](https://observablehq.com/@observablehq/plot-labelled-horizontal-bar-chart-variants). Data: Interbrand. Market value of 10 top global brands in 2018, in millions of dollars. 

```js echo
Plot.plot({
  marginLeft: 90,
  x: { axis: null },
  y: { label: null },
  marks: [
    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: { y: "x", reverse: true, limit: 10 }
    }),

    Plot.text(brands, {
      text: d => `${Math.floor(d.value / 1000)} B`,
      y: "name",
      x: "value",
      textAnchor: "end",
      dx: -3,
      fill: "white"
    })
  ]
})
```

```js echo
brands = FileAttachment("brands-2018.csv").csv({typed: true})
```
