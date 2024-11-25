---
index: false
---

# Walmart: A Plot Story

```js
// temporary, for clip: geojson
const Plot = import("https://esm.sh/gh/observablehq/plot?bundle-deps");
```

```js echo
const walmarts = FileAttachment("/data/walmarts.tsv").tsv({typed: true})
```

${Inputs.table(walmarts, {select: false})}

```js echo
Plot.tickX(walmarts, {x: "date"}).plot()
```

```js echo
Plot.dot(walmarts, {x: "longitude", y: "latitude"}).plot()
```

```js echo
Plot.dot(walmarts, {x: "longitude", y: "latitude"}).plot({projection: "albers"})
```

```js echo
Plot.plot({
  projection: "albers",
  marks: [
    Plot.dot(walmarts, {x: "longitude", y: "latitude"}),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.voronoi(walmarts, {
      x: "longitude",
      y: "latitude",
     clip: nation
    }),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", fill: "red", r: 1.5}),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  color: {scheme: "blues"},
  marks: [
    Plot.density(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "density"
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  color: {legend: true, scheme: "blues", ticks: 1, label: "density", tickFormat: (d => d ? "Highest": "Lowest")},
  marks: [
    Plot.density(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "density",
      clip: nation
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
function coords(d) {
  return [d.longitude, d.latitude];
}
const first = walmarts[0];
```

```js echo
Plot.dot(walmarts, {
  x: "date",
  y: (d) => d3.geoDistance(coords(d), coords(first))
}).plot()
```

```js echo
Plot.dot(walmarts, {
  x: "date",
  y: (d) => d3.geoDistance(coords(d), coords(first)),
  r: 1,
  fill: d => d.longitude
}).plot({color: {scheme: "magma"}})
```

```js echo
import {feature, mesh} from "npm:topojson-client";
const us = await FileAttachment("../data/us-counties-10m.json").json();
const nation = feature(us, us.objects.nation);
const statemesh = mesh(us, us.objects.states);
```

```js echo
Plot.plot({
  projection: "albers",
  marks: [
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date"
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.rectY(walmarts, Plot.binX({y: "count"}, {x: "date", interval: "1 year"})).plot()
```

```js
Plot.plot({
  projection: "albers",
  marks: [
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      filter: d => d.date.getFullYear() === year
    }),
    Plot.geo(nation)
  ]
})
```

```js
const year = view(Inputs.range(d3.extent(walmarts, d => d.date.getFullYear()), {step: 1}))
```

```js echo run=false
Plot.plot({
  projection: "albers",
  marks: [
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      filter: d => d.date.getFullYear() === year
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      fx: (d) => `${(10 * Math.floor(d.date.getFullYear() / 10))}’s`
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.raster(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.raster(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      interpolate: "nearest"
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.raster(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      interpolate: "nearest",
      clip: nation
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  marks: [
    Plot.raster(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "date",
      interpolate: "random-walk",
      clip: nation
    }),
    Plot.geo(nation)
  ]
})
```

```js echo
Plot.plot({
  projection: "albers",
  width,
  color: {type: "utc", legend: true},
  marks: [
    Plot.contour(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: d => +d.date,
      interpolate: "random-walk",
      blur: 5,
      clip: nation
    }),
    Plot.geo(nation)
  ]
})
```
