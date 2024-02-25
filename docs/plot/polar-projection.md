---
source: https://observablehq.com/@observablehq/plot-polar-projection
index: true
---

# Polar projection

To demonstrate the extensibility of Plot’s [projection system](https://observablehq.com/plot/features/projections), this example explicitly defines an azimuthal equidistant projection that fits a designated rectangle.

```js echo
const chart = Plot.plot({
  width: 688,
  height: 688,
  projection: ({width, height}) =>
    d3
      .geoAzimuthalEquidistant()
      .rotate([0, 90])
      .translate([width / 2, height / 2])
      .scale(width)
      .clipAngle(40),
  marks: [Plot.graticule(), Plot.geo(land, {fill: "currentColor"}), Plot.frame()]
});

display(chart);
```

```js echo
const world = FileAttachment("../data/world-110m-2020.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
