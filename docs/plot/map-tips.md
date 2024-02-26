---
source: https://observablehq.com/@observablehq/plot-maps-tips
index: true
---

# Map and tips

The [centroid transform](https://observablehq.com/plot/transforms/centroid) can derive **x** and **y** channels from [geometries](https://observablehq.com/plot/marks/geo), thus allowing the placement of [tips](https://observablehq.com/plot/marks/tip).

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states),
    Plot.tip(
      states,
      Plot.geoCentroid({
        title: (d) => d.properties.name,
        anchor: "bottom",
        textPadding: 3
      })
    )
  ]
});

display(chart);
```

For interactive tips, just combine the [pointer](https://observablehq.com/plot/interactions/pointer) and [centroid](https://observablehq.com/plot/transforms/centroid) transforms:

```js echo
const chart2 = Plot.plot({
  projection: "albers-usa",
  marks: [Plot.geo(states), Plot.tip(states, Plot.pointer(Plot.geoCentroid({title: (d) => d.properties.name})))]
});

display(chart2);
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const states = topojson.feature(us, us.objects.states).features;
```
