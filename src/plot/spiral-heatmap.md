---
source:
index: true
---

# Spiral heatmap

Like https://observablehq.com/@tomshanley/spiral-heatmap, but using Plot. Data: monthly passenger car production in Germany, from the Makeover Monday series.

(todo: [&lt;textPath>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath))

```js echo
Plot.plot({
  width: 450,
  projection: {
    type: "azimuthal-equidistant",
    rotate: [0, -90],
    domain: d3.geoCircle().center([0, 90]).radius(90 - 75)()
  },
  color: {
    scheme: "RdYlGn",
    type: "linear",
    nice: true,
    legend: true,
    tickFormat: "s"
  },
  marks: [
    Plot.geo(data, {
      fill: "value",
      geometry: ({ date }) => ({
        type: "Polygon",
        coordinates: [
          [
            ...d3
              .pairs([
                [lon(monthsSince(date)), lat(monthsSince(date))],
                [lon(1 + monthsSince(date)), lat(1 + monthsSince(date))],
                [lon(1 + monthsSince(date)), lat(1 + monthsSince(date)) - 1],
                [lon(monthsSince(date)), lat(monthsSince(date)) - 1],
                [lon(monthsSince(date)), lat(monthsSince(date))]
              ])
              .flatMap(interpolateEquirectangular),
            [lon(monthsSince(date)), lat(monthsSince(date))]
          ].reverse()
        ]
      })
    }),
    Plot.geo(
      {
        type: "LineString",
        coordinates: interpolateEquirectangular(
          [0, 12 * 10].map((t) => [lon(t), lat(t)])
        )
      },
      { stroke: "var(--plot-background)", strokeWidth: 2 }
    ),
    Plot.text(d3.utcYear.range(...extent), {
      dx: 2,
      x: lon(0),
      y: (date) => lat(6 + monthsSince(date)),
      text: (d) => String(d.getUTCFullYear()),
      fill: "#000",
      stroke: "#fff",
      strokeOpacity: 0.15,
      textAnchor: "start",
      rotate: (date) => 10 - monthsSince(date) / 14 // !texPath would be better
    }),
    Plot.text(
      d3.utcMonth.range(d3.utcYear(extent[1]), d3.utcYear.offset(extent[1], 1)),
      {
        x: (date) => lon(0.5 + monthsSince(date)),
        y: (date) => lat(10.5 * 12),
        text: (d) => Plot.formatMonth()(d.getUTCMonth()),
        fill: "currentColor",
        stroke: "var(--plot-background)",
        strokeOpacity: 0.2,
        fontWeight: "bold",
        rotate: (date) => 180 - lon(0.5 + monthsSince(date))
      }
    )
  ]
})
```

```js echo
const data = FileAttachment("../data/car-production.csv").csv({ typed: true });
```

```js echo
const extent = d3.extent(data, (d) => d.date);
const monthsSince = (d) => d3.utcMonth.count(extent[0], d);

// map dates to a location on the sphere
const domain = extent.map((d) => monthsSince(d3.utcYear(d)));

// 1 year = -360 degrees of longitude and -1 degree of latitude;
// you can change this, but then change the -1 in the geometry transform.
const lon = d3.scaleLinear(domain, [180, 180 - 360 * d3.utcYear.count(extent[0], extent[1])]);
const lat = d3.scaleUtc(domain, [86, 78]);

// This function interpolates along the parallels instead of great arcs. It would
// be easier if we could include it in the projection.
function interpolateEquirectangular([[x1, y1], [x2, y2]]) {
  const precision = 2; // degrees
  return x2 === x1
    ? [
        [x1, y1],
        [x2, y2]
      ]
    : d3
        .ticks(0, 1, 2 + Math.abs(x2 - x1) / precision)
        .map((t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
}
```