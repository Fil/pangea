---
source: https://observablehq.com/@observablehq/plot-state-labels
index: true
---

# State labels

Add a label to U.S. states with a [text mark](https://observablehq.com/plot/marks/text) and a [centroid](https://observablehq.com/plot/transforms/centroid) transform.

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh),
    Plot.text(
      states,
      Plot.centroid({
        text: (d) => d.properties.name,
        fill: "currentColor",
        stroke: "var(--theme-background)"
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
const states = topojson.feature(us, us.objects.states).features;
const statemesh = topojson.mesh(us, us.objects.states);
```
