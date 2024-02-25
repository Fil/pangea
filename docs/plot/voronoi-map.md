---
source: https://observablehq.com/@observablehq/plot-voronoi-map
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Voronoi map</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Voronoi map

The [Delaunay and Voronoi](https://observablehq.com/plot/marks/delaunay) marks derive topologies from point clouds. And they are compatible with [projections](https://observablehq.com/plot/features/projections)!

```js echo
Plot.plot({
  width: 640,
  height: 640,
  inset: 2,
  projection: {
    type: "azimuthal-equal-area",
    rotate: [96, -40],
    clip: 24,
    domain: d3.geoCircle().center([-96, 40]).radius(24)()
  },
  marks: [
    Plot.geo(nation, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.dot(capitals, {
      x: "longitude",
      y: "latitude",
      r: 2.5,
      fill: "currentColor"
    }),
    Plot.voronoi(capitals, {
      x: "longitude",
      y: "latitude",
      clip: "sphere",
      title: "state",
      pointerEvents: "all"
    }),
    Plot.sphere({strokeWidth: 2})
  ]
});
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const capitals = FileAttachment("us-state-capitals.csv").csv({typed: true});
```
