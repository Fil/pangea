<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Map small multiples</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Map small multiples

Plot’s [projection](https://observablehq.com/plot/features/projections) system is compatible with its [faceting](https://observablehq.com/plot/features/facets) system. Below, a comic strip of sorts shows the locations of Walmart store openings in past decades.

```js echo
Plot.plot({
  marginLeft: 0,
  marginRight: 0,
  projection: "albers",
  fx: {
    interval: d3.utcYear.every(10),
    tickFormat: (d) => `${d.getUTCFullYear()}’s`,
    label: null
  },
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.1}),
    Plot.geo(nation),
    Plot.dot(walmarts, {fx: "date", x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
  ]
})
```

```js echo
walmarts = FileAttachment("walmarts.tsv").tsv({typed: true})
```

```js echo
us = FileAttachment("us-counties-10m.json").json()
```

```js echo
statemesh = topojson.mesh(us, us.objects.states)
```

```js echo
nation = topojson.feature(us, us.objects.nation)
```
