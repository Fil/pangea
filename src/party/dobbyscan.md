---
index: true
---

# Hello, dobbyscan

[Dobbyscan](https://github.com/mapbox/dobbyscan) is “a very fast density based clustering JavaScript library for geographic points. Implements a variation of DBSCAN with great circle distance metric.”

```js echo
import dobbyscan from "npm:dobbyscan";
```

```js
const radius = view(Inputs.range([0, 1000], {value: 350, step: 10, label: "radius (km)"}));
```

```js echo
Plot.plot({
  width,
  projection: "equal-earth",
  inset: 10,
  marks: [
    Plot.sphere(),
    Plot.dot(points, {fill: (_, i) => color(cluster.get(i)), r: 1.5}),
  ],
  caption: "Only clusters with 5 points or more are shown."
})
```

```js echo
const points = FileAttachment("/data/airports.csv").csv({typed: true})
  .then((data) => data.map((d) => [d.longitude, d.latitude]));
```

```js echo
// Compute the clusters.
const clusters = dobbyscan(
  d3.range(points.length),
  radius,
  (i) => points[i][0],
  (i) => points[i][1]
);

// Return a Map for fast lookups from point index to cluster id.
const cluster = new Map(
  clusters
    .filter((I) => I.length >= 5)
    .flatMap((I, c) => Array.from(I, (i) => [i, c]))
);
```

```js echo
const color = d3.scaleOrdinal().domain([undefined]).range([...d3.schemeObservable10].reverse());
```
