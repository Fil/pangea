---
source: https://observablehq.com/@observablehq/plot-world-projections
index: true
keywords: map
---

# World projections

No single [projection](https://observablehq.com/plot/features/projections) is best at everything. It is impossible, for example, for a projection to be both conformal (preserving angles) and equal-area (preserving relative surface areas).

```js
const projection = view(
  Inputs.select(
    [
      /* "albers", */
      "azimuthal-equal-area",
      "azimuthal-equidistant",
      /* "conic-conformal", */
      "conic-equal-area",
      "conic-equidistant",
      "equal-earth",
      "equirectangular",
      "gnomonic",
      /* "identity", */
      /* "reflect-y", */
      "mercator",
      "orthographic",
      "stereographic",
      "transverse-mercator"
    ],
    {label: "projection", value: "equirectangular"}
  )
);
```

```js echo
const chart = Plot.plot({
  projection,
  marks: [Plot.graticule(), Plot.geo(land, {fill: "currentColor"}), Plot.sphere()]
});

display(chart);
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const land = topojson.feature(world, world.objects.land);
```
