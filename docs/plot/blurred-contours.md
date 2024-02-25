---
source: https://observablehq.com/@observablehq/plot-blurred-contours
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Blurred contours</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Blurred contours

Use the contour mark’s [blur](https://observablehq.com/plot/marks/contour) option for smoother isolines.

```js echo
Plot.contour(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  blur: 4
}).plot({color: {type: "diverging"}});
```

```js echo
const ca55 = FileAttachment("ca55-south.csv").csv({typed: true});
```
