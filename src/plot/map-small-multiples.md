---
source: https://observablehq.com/@observablehq/plot-map-small-multiples
index: true
---

# Map small multiples

Plot’s [projection](https://observablehq.com/plot/features/projections) system is compatible with its [faceting](https://observablehq.com/plot/features/facets) system. Below, a comic strip of sorts shows the locations of Walmart store openings in past decades.

```js echo
const chart = Plot.plot({
  width,
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
    Plot.dot(walmarts, {
      fx: "date",
      x: "longitude",
      y: "latitude",
      r: 1,
      fill: "currentColor"
    })
  ]
});

display(chart);
```

```js echo
const walmarts = FileAttachment("../data/walmarts.tsv").tsv({typed: true});
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const statemesh = topojson.mesh(us, us.objects.states);
const nation = topojson.feature(us, us.objects.nation);
```
