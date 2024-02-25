<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacked dots</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacked dots

A [dot](https://observablehq.com/plot/marks/dot) mark, [stacked](https://observablehq.com/plot/transforms/stack) in two opposite directions.


```js echo
Plot.plot({
  aspectRatio: 1,
  x: {label: "Age (years)"},
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name"
      })
    ),
    Plot.ruleY([0])
  ]
})
```

```js echo
congress = FileAttachment("us-congress-2023.csv").csv({typed: true})
```
