---
source: https://observablehq.com/@observablehq/plot-centroid-dot
index: true
---

# Centroid dot

The [centroid](https://observablehq.com/plot/transforms/centroid) and geoCentroid transforms work slightly differently—they allow to compute a single location for each geographic feature, which can be used, for example, to display a [dot](https://observablehq.com/plot/marks/dot).

```js echo
display(Plot.dot(counties, Plot.centroid()).plot({projection: "albers-usa"}));
```

```js echo
display(Plot.dot(counties, Plot.geoCentroid()).plot({projection: "albers-usa"}));
```

---

The difference between the centroid initializer and the geoCentroid transform is almost imperceptible. In the map below, which layers both approaches, only one dot near the bottom-right of the frame is noticeably different:

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.dot(counties, Plot.geoCentroid({stroke: "red"})),
    Plot.dot(counties, Plot.centroid({fill: "currentColor", r: 2}))
  ]
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
