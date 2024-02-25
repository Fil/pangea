---
source: https://observablehq.com/@observablehq/plot-shockwave
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Shockwave</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Shockwave

The shockwave created by the explosion of the [Hunga Tonga–Hunga Haʻapai volcano](https://en.wikipedia.org/wiki/2021%E2%80%9322_Hunga_Tonga%E2%80%93Hunga_Ha%CA%BBapai_eruption_and_tsunami) on January 15, 2022, shown as a series of [geodesic circles](https://github.com/d3/d3-geo/blob/main/README.md#geoCircle) of increasing radius; see the [geo mark](https://observablehq.com/plot/marks/geo).

```js echo
Plot.plot({
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
```

```js echo
const world = FileAttachment("countries-110m.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
