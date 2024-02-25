---
source: https://observablehq.com/@observablehq/plot-sorted-groups
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Germany traffic patterns</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Germany traffic patterns

The [group](https://observablehq.com/plot/transforms/group) [transform](https://observablehq.com/plot/features/transforms) groups by location and applies a median reducer to position the red tick on _x_. The [sort mark option](https://observablehq.com/plot/features/scales#sort-mark-option) then orders _y_ by that derived value. Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js echo
Plot.plot({
  marginLeft: 120,
  x: {label: "Vehicles per hour (thousands) →", transform: (x) => x / 1000},
  y: {label: null},
  marks: [
    Plot.ruleX([0]),
    Plot.tickX(traffic, {x: "vehicles", y: "location", strokeOpacity: 0.3}),
    Plot.tickX(
      traffic,
      Plot.groupY(
        {x: "median"},
        {
          x: "vehicles",
          y: "location",
          stroke: "red",
          strokeWidth: 4,
          sort: {y: "x"}
        }
      )
    )
  ]
});
```

```js echo
const traffic = FileAttachment("traffic.csv").csv({typed: true});
```
