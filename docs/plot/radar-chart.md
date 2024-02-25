---
source: https://observablehq.com/@observablehq/plot-radar-chart
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Radar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Radar chart

We create a polar coordinate system with an azimuthal equidistant [projection](https://observablehq.com/plot/features/projections) centered on the North Pole. A point is encoded with its angle as longitude: _x_ = _angle_; and its length as colatitude: _y_ = 90&thinsp;&minus;&thinsp;_length_.

Note that overlapping areas make it difficult to compare, say, more than three objects. Instead, we suggest [radar charts as small multiples](https://observablehq.com/@observablehq/plot-radar-chart-faceted).

_Design inspiration: Nadieh Bremer, “[A different look for the d3.js radar chart](https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart/),” 2015._

```js echo
Plot.plot({
  width: 450,
  projection: {
    type: "azimuthal-equidistant",
    rotate: [0, -90],
    // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
    domain: d3.geoCircle().center([0, 90]).radius(0.625)()
  },
  color: {legend: true},
  marks: [
    // grey discs
    Plot.geo([0.5, 0.4, 0.3, 0.2, 0.1], {
      geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
      stroke: "black",
      fill: "black",
      strokeOpacity: 0.3,
      fillOpacity: 0.03,
      strokeWidth: 0.5
    }),

    // white axes
    Plot.link(longitude.domain(), {
      x1: longitude,
      y1: 90 - 0.57,
      x2: 0,
      y2: 90,
      stroke: "white",
      strokeOpacity: 0.5,
      strokeWidth: 2.5
    }),

    // tick labels
    Plot.text([0.3, 0.4, 0.5], {
      x: 180,
      y: (d) => 90 - d,
      dx: 2,
      textAnchor: "start",
      text: (d) => `${100 * d}%`,
      fill: "currentColor",
      stroke: "white",
      fontSize: 8
    }),

    // axes labels
    Plot.text(longitude.domain(), {
      x: longitude,
      y: 90 - 0.57,
      text: Plot.identity,
      lineWidth: 5
    }),

    // areas
    Plot.area(points, {
      x1: ({key}) => longitude(key),
      y1: ({value}) => 90 - value,
      x2: 0,
      y2: 90,
      fill: "name",
      stroke: "name",
      curve: "cardinal-closed"
    }),

    // points
    Plot.dot(points, {
      x: ({key}) => longitude(key),
      y: ({value}) => 90 - value,
      fill: "name",
      stroke: "white"
    }),

    // interactive labels
    Plot.text(
      points,
      Plot.pointer({
        x: ({key}) => longitude(key),
        y: ({value}) => 90 - value,
        text: (d) => `${(100 * d.value).toFixed(0)}%`,
        textAnchor: "start",
        dx: 4,
        fill: "currentColor",
        stroke: "white",
        maxRadius: 10
      })
    ),

    // interactive opacity on the areas
    () =>
      svg`<style>
          g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
          g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
          g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
      `
  ]
});
```

```js echo
const phones = FileAttachment("phones.csv").csv({typed: true});
```

Flatten the data into as many points as there are dimensions:

```js echo
const points = phones.flatMap(({name, ...values}) =>
  Object.entries(values).map(([key, value]) => ({name, key, value}))
);
```

This intermediate point scale distributes the data axes onto longitudes, starting at 180 and winding back to one step before &minus;180. This task would be unnecessary if we had a native polar coordinate system, please vote up issue [#133](https://github.com/observablehq/plot/issues/133).

```js echo
const longitude = d3
  .scalePoint(new Set(Plot.valueof(points, "key")), [180, -180])
  .padding(0.5)
  .align(1);
```
