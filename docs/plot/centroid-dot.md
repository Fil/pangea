---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Centroid dot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Centroid dot

The [centroid](https://observablehq.com/plot/transforms/centroid) and geoCentroid transforms work slightly differently—they allow to compute a single location for each geographic feature, which can be used, for example, to display a [dot](https://observablehq.com/plot/marks/dot).

```js echo
Plot.dot(counties, Plot.centroid()).plot({projection: "albers-usa"});
```

```js echo
Plot.dot(counties, Plot.geoCentroid()).plot({projection: "albers-usa"});
```

---

The difference between the centroid initializer and the geoCentroid transform is almost imperceptible. In the map below, which layers both approaches, only one dot near the bottom-right of the frame is noticeably different:

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.dot(counties, Plot.geoCentroid({stroke: "red"})),
    Plot.dot(counties, Plot.centroid({fill: "currentColor", r: 2}))
  ]
});
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
