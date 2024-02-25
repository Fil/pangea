<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Walmart density</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Walmart density

The [density](https://observablehq.com/plot/marks/density) mark supports projected data. For more accurate results, prefer an equal-area [projection](https://observablehq.com/plot/features/projections).

```js echo
Plot.plot({
  projection: "albers",
  color: {scheme: "YlGnBu"},
  style: "overflow: visible;",
  marks: [
    Plot.density(walmarts, {x: "longitude", y: "latitude", bandwidth: 10, fill: "density"}),
    Plot.geo(statemesh, {strokeOpacity: 0.3}),
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
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
statemesh = topojson.mesh(us, us.objects.states)
```

```js echo
walmarts = FileAttachment("walmarts.tsv").tsv({typed: true})
```
