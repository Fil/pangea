---
source: https://observablehq.com/@observablehq/plot-hexbin-map
index: true
---

# Hexbin map

The [hexbin](https://observablehq.com/plot/transforms/hexbin) transform works with Plot’s [projection system](https://observablehq.com/plot/features/projections). Below, hexagon size represents the number of nearby Walmart stores, while color represents the date the first nearby Walmart store opened. (The first Walmart opened in Rogers, Arkansas.)

```js echo
const chart = Plot.plot({
  projection: "albers",
  r: {range: [0, 16]},
  color: {scheme: "spectral", label: "First year opened", legend: true},
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.5}),
    Plot.geo(nation),
    Plot.dot(walmarts, Plot.hexbin({r: "count", fill: "min"}, {x: "longitude", y: "latitude", fill: "date"}))
  ]
});

display(chart);
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const statemesh = topojson.feature(us, us.objects.states);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const walmarts = FileAttachment("../data/walmarts.tsv").tsv({typed: true});
```
