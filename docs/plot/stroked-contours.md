---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Stroked contours</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Stroked contours

[Contours](https://observablehq.com/plot/marks/contour) default to a stroked outline of the region that contains values above each threshold.

```js echo
Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height
}).plot({aspectRatio: 1});
```

```js echo
const volcano = FileAttachment("volcano.json").json();
```
