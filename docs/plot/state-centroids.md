---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: State centroids</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# State centroids

Mark the [centroid](https://observablehq.com/plot/transforms/centroid) of each U.S. state with a [dot](https://observablehq.com/plot/marks/dot) and an interactive [tip](https://observablehq.com/plot/marks/tip).

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.2}),
    Plot.geo(nation),
    Plot.dot(states, Plot.centroid({fill: "red", stroke: "white"})),
    Plot.tip(states, Plot.pointer(Plot.centroid({title: (d) => d.properties.name})))
  ]
});
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const states = topojson.feature(us, us.objects.states).features;
```

```js echo
const statemesh = topojson.mesh(us, us.objects.states);
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```
