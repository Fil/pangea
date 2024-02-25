<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: V-Counties</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# V-Counties

To label the U.S. counties with names starting with V—this is more interesting than it seems—we can use a [dot mark](https://observablehq.com/plot/marks/dot) and a [text mark](https://observablehq.com/plot/marks/text), in combination with a [centroid](https://observablehq.com/plot/transforms/centroid) transform.

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(countymesh, {strokeWidth: 0.1}),
    Plot.geo(statemesh, {strokeWidth: 0.5}),
    Plot.dot(
      counties,
      Plot.centroid({
        filter: (d) => d.properties.name.match(/^V/),
        fill: "currentColor",
        stroke: "white"
      })
    ),
    Plot.text(
      counties,
      Plot.centroid({
        filter: (d) => d.properties.name.match(/^V/),
        text: (d) => d.properties.name,
        fill: "currentColor",
        stroke: "white",
        frameAnchor: "left",
        dx: 6
      })
    )
  ]
})
```

```js echo
us = FileAttachment("us-counties-10m.json").json()
```

```js echo
counties = topojson.feature(us, us.objects.counties).features
```

```js echo
countymesh = topojson.mesh(us, us.objects.counties)
```

```js echo
statemesh = topojson.mesh(us, us.objects.states)
```
