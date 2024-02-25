<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: World projections</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# World projections

No single [projection](https://observablehq.com/plot/features/projections) is best at everything. It is impossible, for example, for a projection to be both conformal (preserving angles) and equal-area (preserving relative surface areas).

```js
viewof projection = Inputs.select(
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
  { label: "projection", value: "equirectangular" }
)
```

```js echo
Plot.plot({
  projection,
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor"}),
    Plot.sphere()
  ]
})
```

```js echo
world = FileAttachment("countries-110m.json").json()
```

```js echo
land = topojson.feature(world, world.objects.land)
```
