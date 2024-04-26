---
source: https://observablehq.com/@observablehq/plot-centroid-hexbin
index: true
---

# Centroid hexbin

Combine the [geoCentroid](https://observablehq.com/plot/transforms/centroid) and [hexbin](https://observablehq.com/plot/transforms/hexbin) transforms to measure the density of U.S. counties.

```js echo
const chart = Plot.dot(counties, Plot.hexbin({r: "count"}, Plot.geoCentroid())).plot({
  projection: "albers"
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
```
