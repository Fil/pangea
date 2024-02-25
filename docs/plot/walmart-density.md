---
source: https://observablehq.com/@observablehq/plot-walmart-density
index: true
---

# Walmart density

The [density](https://observablehq.com/plot/marks/density) mark supports projected data. For more accurate results, prefer an equal-area [projection](https://observablehq.com/plot/features/projections).

```js echo
const chart = Plot.plot({
  projection: "albers",
  color: {scheme: dark ? "turbo" : "YlGnBu"},
  style: "overflow: visible;",
  marks: [
    Plot.density(walmarts, {x: "longitude", y: "latitude", bandwidth: 10, fill: "density"}),
    Plot.geo(statemesh, {strokeOpacity: 0.3}),
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
  ]
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
const walmarts = FileAttachment("../data/walmarts.tsv").tsv({typed: true});
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const statemesh = topojson.mesh(us, us.objects.states);
```

```js echo
import {dark} from "../components/dark.js";
```
