---
source: https://observablehq.com/@observablehq/plot-earthquake-globe
index: true
---

# Earthquake globe

[Projections](https://observablehq.com/plot/features/projections) and live data!

```js
const longitude = view(Inputs.range([-180, 180], {label: "longitude", step: 1, value: 90}));
```

```js echo
const chart = Plot.plot({
  projection: {type: "orthographic", rotate: [-longitude, -30]},
  r: {transform: (d) => Math.pow(10, d)}, // convert Richter to amplitude
  style: "overflow: visible;", // allow dots to escape
  marks: [
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.sphere(),
    Plot.dot(earthquakes, {
      x: "longitude",
      y: "latitude",
      r: "magnitude",
      stroke: "red",
      fill: "red",
      fillOpacity: 0.2
    })
  ]
});

display(chart);
```

```js echo
const world = FileAttachment("../data/world-110m-2020.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```

```js echo
const earthquakes = fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson")
  .then((d) => d.json())
  .then((d) =>
    d.features.map((f) => {
      const c = d3.geoCentroid(f);
      return {magnitude: f.properties.mag, longitude: c[0], latitude: c[1]};
    })
  );
```
