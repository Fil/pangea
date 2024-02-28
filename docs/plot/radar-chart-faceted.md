---
source: https://observablehq.com/@observablehq/plot-radar-chart-faceted
author: Jeff Pettiross
index: true
---

# Radar chart, small multiples

[Radar charts](./radar-chart) are best saved for a single purpose: to spot a difference across multiple values among members of a domain. We recommend avoiding any other use of radar charts because they are easy to misinterpret. When using radar charts, show them side by side in small multiples (using [facets](https://observablehq.com/plot/features/facets)) instead of overlapping them in a single view.

This example shows 5 values from cars sold in the United States in 1979.

```js echo
const chart = Plot.plot({
  width: Math.max(width, 600),
  marginBottom: 10,
  projection: {
    type: "azimuthal-equidistant",
    rotate: [0, -90],
    // Note: 1.22° corresponds to max. percentage (1.0), plus some room for the labels
    domain: d3.geoCircle().center([0, 90]).radius(1.22)()
  },
  facet: {
    data: points,
    x: "fx",
    y: "fy",
    axis: null
  },
  marks: [
    // Facet name
    Plot.text(
      points,
      Plot.selectFirst({
        text: "name",
        frameAnchor: "bottom",
        fontWeight: 400,
        fontSize: 14
      })
    ),

    // grey discs
    Plot.geo([1.0, 0.8, 0.6, 0.4, 0.2], {
      geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
      stroke: "currentColor",
      fill: "currentColor",
      strokeOpacity: 0.2,
      fillOpacity: 0.02,
      strokeWidth: 0.5
    }),

    // white axes
    Plot.link(longitude.domain(), {
      x1: longitude,
      y1: 90 - 0.8,
      x2: 0,
      y2: 90,
      stroke: "var(--plot-background)",
      strokeOpacity: 0.5,
      strokeWidth: 2.5
    }),

    // tick labels
    Plot.text([0.4, 0.6, 0.8], {
      fx: 0,
      fy: 0,
      x: 180,
      y: (d) => 90 - d,
      dx: 2,
      textAnchor: "start",
      text: (d) => (d == 0.8 ? `${100 * d}th percentile` : `${100 * d}th`),
      fill: "currentColor",
      stroke: "var(--plot-background)",
      fontSize: 12
    }),

    // axes labels
    Plot.text(longitude.domain(), {
      fx: 0,
      fy: 0,
      x: longitude,
      y: 90 - 1.07,
      text: Plot.identity,
      lineWidth: 5,
      fontSize: 12
    }),

    // axes labels, initials
    Plot.text(longitude.domain(), {
      fx: 0,
      fy: 0,
      facet: "exclude",
      x: longitude,
      y: 90 - 1.09,
      text: (d) => d[0],
      lineWidth: 5
    }),

    // areas
    Plot.area(points, {
      x1: ({key}) => longitude(key),
      y1: ({value}) => 90 - value,
      x2: 0,
      y2: 90,
      fill: "#4269D0",
      fillOpacity: 0.25,
      stroke: "#4269D0",
      curve: "cardinal-closed"
    }),

    // points
    Plot.dot(points, {
      x: ({key}) => longitude(key),
      y: ({value}) => 90 - value,
      fill: "#4269D0",
      stroke: "var(--plot-background)"
    }),

    // interactive labels
    Plot.text(
      points,
      Plot.pointer({
        x: ({key}) => longitude(key),
        y: ({value}) => 90 - value,
        text: (d) => `${d.raw}\n(${Math.round(100 * d.value)}%)`,
        textAnchor: "start",
        dx: 4,
        fill: "currentColor",
        stroke: "var(--plot-background)",
        maxRadius: 10,
        fontSize: 12
      })
    )
  ]
});

display(chart);
```

```js echo
const cars = FileAttachment("../data/cars-selection.csv").csv({typed: true});
```

Normalize and flatten the data into as many points as there are dimensions:

```js echo
const points = d3
  .sort(cars, (d) => d.Price)
  .flatMap(({name, ...values}, i) =>
    Object.entries(values).map(([key, raw]) => ({
      name,
      key,
      raw,
      fx: (1 + i) % 4, // trellis (facets); we leave facet <0,0> empty for the legend
      fy: Math.floor((1 + i) / 4)
    }))
  );
for (const [, g] of d3.group(points, (d) => d.key)) {
  const m = d3.max(g, (d) => d.raw);
  for (const d of g) d.value = d.raw / m;
}
```

```js echo
const longitude = d3
  .scalePoint(new Set(Plot.valueof(points, "key")), [180, -180])
  .padding(0.5)
  .align(1);
```
