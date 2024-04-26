---
source: https://observablehq.com/@observablehq/plot-voronoi-map
index: true
---

# Voronoi map

The [Delaunay and Voronoi](https://observablehq.com/plot/marks/delaunay) marks derive topologies from point clouds. And they are compatible with [projections](https://observablehq.com/plot/features/projections)!

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const capitals = FileAttachment("../data/us-state-capitals.csv").csv({typed: true});
```
