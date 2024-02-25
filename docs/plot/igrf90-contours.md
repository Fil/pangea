---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: IGRF90 contours</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# IGRF90 contours

The [contour](https://observablehq.com/plot/marks/contour) mark can derive contours from non-gridded data samples.

```js echo
Plot.contour(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90"}).plot({
  color: {type: "diverging"}
});
```

```js echo
const ca55 = FileAttachment("ca55-south.csv").csv({typed: true});
```
