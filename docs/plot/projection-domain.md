---
source: https://observablehq.com/@observablehq/plot-projection-domain
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Projection domain</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Projection domain

For maps that focus on a specific region, use the [projection](https://observablehq.com/plot/features/projections)’s **domain** option to zoom in. This should be a GeoJSON object. For example, you can use [d3.geoCircle](https://github.com/d3/d3-geo/blob/main/README.md#geoCircle) to generate a circle of a given radius centered at a given longitude and latitude. You can also use the **inset** options for a bit of padding around the **domain**.

```js
const radius = view(Inputs.range([10, 50], {step: 0.1, label: "radius"}));
```

```js echo
Plot.plot({
  projection: {
    type: "azimuthal-equidistant",
    rotate: [-9, -34],
    domain: circle,
    inset: 10
  },
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.3}),
    Plot.geo(circle, {stroke: "red", strokeWidth: 2}),
    Plot.frame()
  ]
});
```

```js echo
const circle = d3.geoCircle().center([9, 34]).radius(radius).precision(2)();
```

```js echo
const world = FileAttachment("countries-110m.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
