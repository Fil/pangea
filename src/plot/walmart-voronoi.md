---
source: https://observablehq.com/@observablehq/plot-walmart-voronoi
index: true
---

# Walmart Voronoi

The [Voronoi](https://observablehq.com/plot/marks/delaunay) diagram of the Walmart stores in the contiguous U.S. shows the catchment area of each point.

```js echo
const chart = Plot.plot({
  projection: "albers",
  marks: [
    Plot.geo(nation),
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "currentColor",
      r: 1
    }),
    Plot.voronoiMesh(walmarts, {x: "longitude", y: "latitude"})
  ]
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const walmarts = FileAttachment("../data/walmarts.tsv").tsv({typed: true});
```
