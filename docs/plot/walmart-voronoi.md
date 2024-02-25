<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Walmart Voronoi</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Walmart Voronoi

The [Voronoi](https://observablehq.com/plot/marks/delaunay) diagram of the Walmart stores in the contiguous U.S. shows the catchment area of each point.

```js echo
Plot.plot({
  projection: "albers",
  marks: [
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", fill: "currentColor", r: 1}),
    Plot.voronoiMesh(walmarts, {x: "longitude", y: "latitude"})
  ]
})
```

```js echo
us = FileAttachment("us-counties-10m.json").json()
```

```js echo
nation = topojson.feature(us, us.objects.nation)
```

```js echo
walmarts = FileAttachment("walmarts.tsv").tsv({typed: true})
```
