---
source: https://observablehq.com/@observablehq/plot-centroid-voronoi
index: true
---

# Centroid Voronoi

A classic of creative mapping: take the [centroids](https://observablehq.com/plot/transforms/centroid) of geographic features, and compute their [voronoi](https://observablehq.com/plot/marks/delaunay) diagram.

```js echo
const chart = Plot.voronoi(counties, Plot.centroid()).plot({projection: "albers"});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
