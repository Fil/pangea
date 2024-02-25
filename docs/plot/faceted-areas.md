---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Faceted areas</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Faceted areas

Small multiples, rendering different [facets](https://observablehq.com/plot/features/facets) (subsets of the complete dataset), facilitate comparison between modalities. Here, the evolution of the number of unemployed workers across industries.

```js echo
Plot.plot({
  height: 720,
  axis: null,
  marks: [
    Plot.areaY(industries, {x: "date", y: "unemployed", fy: "industry"}),
    Plot.text(
      industries,
      Plot.selectFirst({
        text: "industry",
        fy: "industry",
        frameAnchor: "top-left",
        dx: 6,
        dy: 6
      })
    ),
    Plot.frame()
  ]
});
```
