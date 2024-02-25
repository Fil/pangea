---
source: https://observablehq.com/@observablehq/plot-polar-projection
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Polar projection</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Polar projection

To demonstrate the extensibility of Plot’s [projection system](https://observablehq.com/plot/features/projections), this example explicitly defines an azimuthal equidistant projection that fits a designated rectangle.

```js echo
Plot.plot({
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
```

```js echo
const world = FileAttachment("countries-110m.json").json();
```

```js echo
const land = topojson.feature(world, world.objects.land);
```
