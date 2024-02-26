---
source: https://observablehq.com/@observablehq/plot-shockwave
index: true
---

# Shockwave

The shockwave created by the explosion of the [Hunga Tonga–Hunga Haʻapai volcano](https://en.wikipedia.org/wiki/2021%E2%80%9322_Hunga_Tonga%E2%80%93Hunga_Ha%CA%BBapai_eruption_and_tsunami) on January 15, 2022, shown as a series of [geodesic circles](https://github.com/d3/d3-geo/blob/main/README.md#geoCircle) of increasing radius; see the [geo mark](https://observablehq.com/plot/marks/geo).

```js echo
const chart = Plot.plot({
  projection: {
    type: "equal-earth",
    rotate: [90, 0]
  },
  color: {
    legend: true,
    label: "Distance from Tonga (km)",
    transform: (d) => 111.2 * d, // degrees to km
    zero: true
  },
  marks: [
    Plot.geo(land),
    Plot.geo([0.5, 179.5].concat(d3.range(10, 171, 10)), {
      geometry: d3
        .geoCircle()
        .center([-175.38, -20.57])
        .radius((r) => r),
      stroke: (r) => r,
      strokeWidth: 2
    }),
    Plot.sphere()
  ]
});

display(chart);
```

```js echo
const world = FileAttachment("../data/world-110m-2020.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
