<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Albers-USA projection</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Albers-USA projection

Use the *albers-usa* projection for U.S.-centric maps. This projection is equal-area for the continental United States and Hawaii. Note however that the scale for Alaska is diminished: it is projected at 0.35× its true relative area.

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(nation),
    Plot.geo(statemesh, {strokeOpacity: 0.2})
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
