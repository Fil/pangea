---
source: https://observablehq.com/@observablehq/plot-choropleth
index: true
---

# Choropleth

Unemployment rate by U.S. county, August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables). We use the [geo mark](https://observablehq.com/plot/marks/geo) to paint each county with a color representing the unemployment rate, and render a white mesh of the states boundaries on top. A [centroid transform](https://observablehq.com/plot/transforms/centroid) and extra channels support [interactive tips](https://observablehq.com/plot/features/interactions). See the [D3 version](../d3/choropleth).

```js echo
const chart = Plot.plot({
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
    Plot.geo(
      counties,
      Plot.centroid({
        fill: (d) => unemployment.get(d.id),
        tip: true,
        channels: {
          County: (d) => d.properties.name,
          State: (d) => statemap.get(d.id.slice(0, 2)).properties.name
        }
      })
    ),
    Plot.geo(states, {stroke: "var(--theme-background)"})
  ]
});

display(chart);
```

In the _unemployment_ dataset, we don’t use automatic type inference for CSV (_a.k.a._, typed: true) as that would coerce the FIPS identifiers to numbers, which then wouldn’t match the identifiers in our GeoJSON. However, we still want to coerce the _rate_ values to numbers, so we do that explicitly. While we’re at it, we store the values in a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object for fast lookups.

```js echo
const unemployment = new Map(
  (await FileAttachment("../data/unemployment-by-county.csv").csv()).map((d) => [d.id, +d.rate])
);
```

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles, 2017 edition. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The _counties_ feature collection is all U.S. counties, using the five-digit FIPS identifier. The _statemap_ lets us lookup the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers.

```js echo
const us = FileAttachment("../data/counties-albers-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties);
const states = topojson.feature(us, us.objects.states);
const statemap = new Map(states.features.map((d) => [d.id, d]));
```

The _statemesh_ is just the internal borders between states, _i.e._, everything but the coastlines and country borders. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets. (Try removing the last argument to topojson.mesh below to see the effect.)

```js echo
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
```
