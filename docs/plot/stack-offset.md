<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Wiggle streamgraph</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Wiggle streamgraph

The *wiggle* **offset** translates [stacks](https://observablehq.com/plot/transforms/stack#stack-options) to minimize apparent movement. It is recommended for streamgraphs, and if used, changes the default **order** to inside-out; see [Byron & Wattenberg](http://leebyron.com/streamgraph/).

```js
viewof offset = Inputs.select(
  new Map([
    ["null", null],
    ["center", "center"],
    ["wiggle", "wiggle"]
  ]),
  { label: "offset", value: "wiggle" }
)
```

```js echo
Plot.plot({
  y: {
    grid: true,
    label: "↑ Annual revenue (billions, adj.)",
    transform: (d) => d / 1000
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset})
  ]
})
```

```js echo
riaa = FileAttachment("riaa-us-revenue.csv").csv({typed: true})
```
