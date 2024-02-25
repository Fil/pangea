---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Map and tips</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Map and tips

The [centroid transform](https://observablehq.com/plot/transforms/centroid) can derive **x** and **y** channels from [geometries](https://observablehq.com/plot/marks/geo), thus allowing the placement of [tips](https://observablehq.com/plot/marks/tip).

```js echo
Plot.plot({
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
```

For interactive tips, just combine the [pointer](https://observablehq.com/plot/interactions/pointer) and [centroid](https://observablehq.com/plot/transforms/centroid) transforms:

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [Plot.geo(states), Plot.tip(states, Plot.pointer(Plot.geoCentroid({title: (d) => d.properties.name})))]
});
```

```js echo
const us = FileAttachment("us-counties-10m@1.json").json();
```

```js echo
const states = topojson.feature(us, us.objects.states).features;
```
