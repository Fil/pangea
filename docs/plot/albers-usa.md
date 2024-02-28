---
source: https://observablehq.com/@observablehq/plot-albers-usa-projection
index: true
---

# Albers-USA projection

Use the _albers-usa_ projection for U.S.-centric maps. This projection is equal-area for the continental United States and Hawaii. Note however that the scale for Alaska is diminished: it is projected at 0.35× its true relative area.

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [Plot.geo(nation), Plot.geo(statemesh, {strokeOpacity: 0.2})]
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const statemesh = topojson.mesh(us, us.objects.states);
```
