---
source: https://observablehq.com/@observablehq/plot-normalized-stack
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Normalized stack</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Normalized stack

Use the _normalize_ **offset** to rescale each [stack](https://observablehq.com/plot/transforms/stack#stack-options) to fill [0, 1]. Percentages are shown with the scale’s [percent](https://observablehq.com/plot/features/scales#scale-transforms) option.

```js echo
Plot.plot({
  y: {
    label: "↑ Annual revenue (%)",
    percent: true
  },
  marks: [
    Plot.areaY(
      riaa,
      Plot.stackY(
        {offset: "normalize", order: "group", reverse: true},
        {x: "year", y: "revenue", z: "format", fill: "group"}
      )
    ),
    Plot.ruleY([0, 1])
  ]
});
```

```js echo
const riaa = FileAttachment("riaa-us-revenue.csv").csv({typed: true});
```
