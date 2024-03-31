---
source: https://observablehq.com/@observablehq/plot-projection-domain
index: true
---

# Projection domain

For maps that focus on a specific region, use the [projection](https://observablehq.com/plot/features/projections)’s **domain** option to zoom in. This should be a GeoJSON object. For example, you can use [d3.geoCircle](https://github.com/d3/d3-geo/blob/main/README.md#geoCircle) to generate a circle of a given radius centered at a given longitude and latitude. You can also use the **inset** options for a bit of padding around the **domain**.

```js
const radius = view(Inputs.range([10, 50], {step: 0.1, label: "radius"}));
```

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const circle = d3.geoCircle().center([9, 34]).radius(radius).precision(2)();
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas@0.1.0/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
