<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Choropleth</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Choropleth

Unemployment rate by U.S. county, August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables). We use the [geo mark](https://observablehq.com/plot/marks/geo) to paint each county with a color representing the unemployment rate, and render a white mesh of the states boundaries on top. A [centroid transform](https://observablehq.com/plot/transforms/centroid) and extra channels support [interactive tips](https://observablehq.com/plot/features/interactions). See the [D3 version](/@d3/choropleth/2).

```js echo
Plot.plot({
  width: 975,
  height: 610,
  projection: "identity",
  color: {
    type: "quantize",
    n: 9,
    domain: [1, 10],
    scheme: "blues",
    label: "Unemployment rate (%)",
    legend: true
  },
  marks: [
    Plot.geo(counties, Plot.centroid({
      fill: d => unemployment.get(d.id),
      tip: true,
      channels: {
        County: d => d.properties.name,
        State: d => statemap.get(d.id.slice(0,2)).properties.name
      }
    })),
    Plot.geo(states, {stroke: "white"})
  ]
})
```

In the *unemployment* dataset, we don’t use automatic type inference for CSV (*a.k.a.*, typed: true) as that would coerce the FIPS identifiers to numbers, which then wouldn’t match the identifiers in our GeoJSON. However, we still want to coerce the *rate* values to numbers, so we do that explicitly. While we’re at it, we store the values in a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object for fast lookups.

```js echo
unemployment = new Map((await FileAttachment("unemployment-x.csv").csv()).map(d => [d.id, +d.rate]))
```

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles, 2017 edition. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The *counties* feature collection is all U.S. counties, using the five-digit FIPS identifier. The *statemap* lets us lookup the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers.

```js echo
us = FileAttachment("counties-albers-10m.json").json()
```

```js echo
counties = topojson.feature(us, us.objects.counties)
```

```js echo
states = topojson.feature(us, us.objects.states)
```

```js echo
statemap = new Map(states.features.map(d => [d.id, d]))
```

The *statemesh* is just the internal borders between states, *i.e.*, everything but the coastlines and country borders. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets. (Try removing the last argument to topojson.mesh below to see the effect.)

```js echo
statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b)
```
