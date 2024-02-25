---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Centroid hexbin</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Centroid hexbin

Combine the [geoCentroid](https://observablehq.com/plot/transforms/centroid) and [hexbin](https://observablehq.com/plot/transforms/hexbin) transforms to measure the density of U.S. counties.

```js echo
Plot.dot(counties, Plot.hexbin({r: "count"}, Plot.geoCentroid())).plot({
  projection: "albers"
});
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
