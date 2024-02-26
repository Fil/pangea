---
source: https://observablehq.com/@observablehq/plot-state-centroids
index: true
---

# State centroids

Mark the [centroid](https://observablehq.com/plot/transforms/centroid) of each U.S. state with a [dot](https://observablehq.com/plot/marks/dot) and an interactive [tip](https://observablehq.com/plot/marks/tip).

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.2}),
    Plot.geo(nation),
    Plot.dot(states, Plot.centroid({fill: "red", stroke: "white"})),
    Plot.tip(states, Plot.pointer(Plot.centroid({title: (d) => d.properties.name})))
  ]
});

display(chart);
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const states = topojson.feature(us, us.objects.states).features;
const statemesh = topojson.mesh(us, us.objects.states);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```
