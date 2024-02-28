---
source: https://observablehq.com/@observablehq/plot-v-counties
index: true
---

# V-Counties

To label the U.S. counties with names starting with V—this is more interesting than it seems—we can use a [dot mark](https://observablehq.com/plot/marks/dot) and a [text mark](https://observablehq.com/plot/marks/text), in combination with a [centroid](https://observablehq.com/plot/transforms/centroid) transform.

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(countymesh, {strokeWidth: 0.1}),
    Plot.geo(statemesh, {strokeWidth: 0.5}),
    Plot.dot(
      counties,
      Plot.centroid({
        filter: (d) => d.properties.name.match(/^V/),
        fill: "currentColor",
        stroke: "var(--plot-background)"
      })
    ),
    Plot.text(
      counties,
      Plot.centroid({
        filter: (d) => d.properties.name.match(/^V/),
        text: (d) => d.properties.name,
        fill: "currentColor",
        stroke: "var(--plot-background)",
        textAnchor: "start",
        dx: 6
      })
    )
  ]
});

display(chart);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
const countymesh = topojson.mesh(us, us.objects.counties);
const statemesh = topojson.mesh(us, us.objects.states);
```
