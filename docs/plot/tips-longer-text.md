<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Interactive tips with longer text</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Interactive tips with longer text

The [tip mark](https://observablehq.com/plot/marks/tip) supports the **title** channel for longer texts.

```js echo
Plot.plot({
  grid: true,
  marks: [
    Plot.dot(olympians, {
      x: "weight",
      y: "height",
      fy: "sex",
      sort: (d) => !!d.info,
      stroke: (d) => d.info ? "currentColor" : "#aaa"
    }),
    Plot.tip(olympians, Plot.pointer({
      x: "weight",
      y: "height",
      fy: "sex",
      filter: (d) => d.info,
      title: (d) => [d.name, d.info].join("\n\n")
    }))
  ]
})

```
