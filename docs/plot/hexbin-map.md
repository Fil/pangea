<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Hexbin map</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Hexbin map

The [hexbin](https://observablehq.com/plot/transforms/hexbin) transform works with Plot’s [projection system](https://observablehq.com/plot/features/projections). Below, hexagon size represents the number of nearby Walmart stores, while color represents the date the first nearby Walmart store opened. (The first Walmart opened in Rogers, Arkansas.)

```js echo
Plot.plot({
  projection: "albers",
  r: {range: [0, 16]},
  color: {scheme: "spectral", label: "First year opened", legend: true},
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.5}),
    Plot.geo(nation),
    Plot.dot(walmarts, Plot.hexbin({r: "count", fill: "min"}, {x: "longitude", y: "latitude", fill: "date"}))
  ]
})
```

```js echo
nation = topojson.feature(us, us.objects.nation)
```

```js echo
statemesh = topojson.feature(us, us.objects.states)
```

```js echo
us = FileAttachment("us-counties-10m.json").json()
```

```js echo
walmarts = FileAttachment("walmarts.tsv").tsv({typed: true})
```
