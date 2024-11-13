---
index: true
---

# Circular line chart

Inspired by https://bsky.app/profile/higsch.com/post/3lap5k6rvxm2f

```js echo
Plot.plot({
  width: 490,
  aspectRatio: 1,
  inset: 20,
  axis: null,
  style: { background: "black", color: "white" },
  color: {
    type: "linear",
    domain: [1940, 2022, 2023, 2024],
    range: ["white", "white", "pink", "lightblue"]
  },
  marks: [
    axes,
    Plot.line(
      data,
      radial({
        filter: (d) => !isNaN(d.value), // note: lots of Feb. 29 are NA
        angle: "day_of_year",
        radius: (d) => d.value - 10,
        period,
        stroke: "year",
        strokeWidth: (d) => (d.year < 1980 ? 0.07 : d.year < 2023 ? 0.15 : 2.5),
        z: null
      })
    )
  ]
})
```

```js echo
const data = d3.csv("https://raw.githubusercontent.com/higsch/data/main/daily_surface_temperatures/daily_surface_temperatures.csv", d3.autoType);
```

This helper seems complicated, but actually makes things simpler since you only have to specify angle, period, and radius.

```js echo
function radial({ angle, radius, period = 1, ...options } = {}) {
  const [X, setX] = Plot.column(angle);
  const [Y, setY] = Plot.column(angle);
  return {
    ...Plot.transform({ x: angle, y: radius, ...options }, (data, facets) => {
      const A = Plot.valueof(data, angle);
      const R = Plot.valueof(data, radius);
      const P = Plot.valueof(data, period);
      setX(A.map((a, i) => R[i] * Math.sin((2 * Math.PI * a) / P[i])));
      setY(A.map((a, i) => R[i] * Math.cos((2 * Math.PI * a) / P[i])));
      return { data, facets };
    }),
    x: X,
    y: Y
  };
}
```

Circular axes look like a target 🎯. Easiest way to create them is with a geo mark. (TODO: add month names)

```js echo
const axes = [
  Plot.geo(
    {
      type: "MultiLineString",
      coordinates: [
        [[-8, 0], [8, 0]],
        [[0, -8], [0, 8]]
      ]
    },
    {strokeOpacity: 0.2}
  ),
  d3.range(1, 9).map((r) => Plot.geo(
    d3.geoCircle().radius(r)(), {strokeOpacity: 0.2}
  )),
  Plot.dot(d3.range(12), radial({
    radius: 7.5,
    angle: (d) => d,
    period: 12,
    fill: "black",
    stroke: "white",
    r: 13,
    strokeWidth: 0.75
  })),
  Plot.text(d3.range(12), radial({
    radius: 7.5,
    angle: (d) => d,
    period: 12,
    fill: "white",
    text: (d) => new Date(1, d, 2).toLocaleString('en-US', { month: 'short' })
  }))
];
```

This period ensures that all years (365 and bissextile 366 days) cover one circle.

```js echo
const period = (d) =>
  d3.utcDay.count(new Date(d.year, 1, 1), new Date(1 + d.year, 1, 1));
```
