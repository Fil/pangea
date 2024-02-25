---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stacked area chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stacked area chart

The [areaY](https://observablehq.com/plot/marks/area) mark implicitly [stacks](https://observablehq.com/plot/features/stack) the areas vertically, avoiding occlusion and allowing the reader to make sense of the total as well as of the parts.

```js echo
Plot.plot({
  marginLeft: 50,
  width: 928,
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, {
      x: "date",
      y: "unemployed",
      fill: "industry",
      title: "industry"
    }),
    Plot.ruleY([0])
  ]
});
```

```js echo
const unemployment = FileAttachment("unemployment.csv").csv({typed: true});
```
