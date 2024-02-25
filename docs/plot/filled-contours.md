---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Filled contours</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Filled contours

[Contours](https://observablehq.com/plot/marks/contour) can be filled with a color based on their value.

```js echo
Plot.plot({
  aspectRatio: 1,
  color: {
    legend: true,
    label: "Elevation (m)"
  },
  marks: [
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      fill: Plot.identity,
      stroke: "black"
    })
  ]
});
```

```js echo
const volcano = FileAttachment("volcano.json").json();
```
