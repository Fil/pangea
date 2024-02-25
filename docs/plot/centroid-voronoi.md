---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Centroid Voronoi</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Centroid Voronoi

A classic of creative mapping: take the [centroids](https://observablehq.com/plot/transforms/centroid) of geographic features, and compute their [voronoi](https://observablehq.com/plot/marks/delaunay) diagram.

```js echo
Plot.voronoi(counties, Plot.centroid()).plot({projection: "albers"});
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
