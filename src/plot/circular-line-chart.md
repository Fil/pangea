---
index: true
---

# Circular line chart

Data: Daily Sea Surface Temperature, Subpolar North Atlantic, [climatereanalyzer](https://climatereanalyzer.org/clim/sst_daily/?dm_id=natlsp)

```js echo
Plot.plot({
  width: 490,
  aspectRatio: 1,
  inset: 20,
  axis: null,
  style: {background: "black", color: "white"},
  color: {
    type: "linear",
    domain: [1982, 2022, 2023, 2024, 2032],
    range: ["white", "white", "pink", "lightblue", "lightblue"]
  },
  marks: [
    axes,
    Plot.line(
      data,
      radial({
        filter: (d) => !isNaN(d.temperature), // note: lots of Feb. 29 are NA
        x: "day_of_year",
        y: radius,
        period,
        stroke: "year",
        strokeWidth: (d) => (d.year < 1980 ? 0.07 : d.year < 2023 ? 0.15 : 2.5),
        z: null,
        tip: {
          fill: "#333",
          channels: {
            temperature: "temperature",
          },
          format: {
            temperature: d => `${d}°C`,
            stroke: String, // year
            strokeWidth: null,
            x: null,
            y: null
          }
        }
      })
    ),
    labels
  ]
})
```

Inspired by [Matthias Stahl](https://bsky.app/profile/higsch.com/post/3lap5k6rvxm2f) and [Sean Lynch](https://bsky.app/profile/techniq.dev/post/3lat66qk4es2v).

The radius as a function of the value; the values MUST be greater than 0 (or even 2) to ensure we don’t have an inversion:

```js echo
const min = Math.floor(d3.min(data, d => d.temperature));
const radius = (d) => d.temperature - min + 2;
```

This helper seems complicated, but actually makes things simpler since you only have to specify angle, period, and radius.

```js echo
function radial({ x, y, period = 1, ...options } = {}) {
  const [X, setX] = Plot.column(x);
  const [Y, setY] = Plot.column(x);
  return {
    ...Plot.transform({ x, y, ...options }, (data, facets) => {
      const A = Plot.valueof(data, x);
      const R = Plot.valueof(data, y);
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

Circular axes look like a target 🎯. Easiest way to create them is with a geo mark.

```js echo
const axes = [
  Plot.geo(
    {
      type: "MultiLineString",
      coordinates: [
        [[-8, 0], [-3, 0]], [[8, 0], [3, 0]],
        [[0, -8], [0, -3]], [[0, 3], [0, 8]]
      ]
    },
    {strokeOpacity: 0.2}
  ),
  d3.range(9).map((r) => Plot.geo(
    d3.geoCircle().radius(2 + r)(), {strokeOpacity: r ? 0.2 : 0.5}
  ))
];

const labels = [
  Plot.dot(d3.range(12), radial({
    x: (d) => d,
    y: 7.5,
    period: 12,
    fill: "black",
    stroke: "white",
    r: 13,
    strokeWidth: 0.75
  })),
  Plot.text(d3.range(12), radial({
    x: (d) => d,
    y: 7.5,
    period: 12,
    fill: "white",
    text: (d) => new Date(1, d, 2).toLocaleString('en-US', { month: 'short' })
  })),
  Plot.text(d3.range(8, 12).concat(14), {
    x: 0,
    y: (d) => -radius({temperature: d}),
    fill: "#ccc",
    stroke: "black",
    strokeWidth: 10,
    text: (d) => `${d}°C`
  })
];
```

This period ensures that all years (365 and bissextile 366 days) cover one circle.

```js echo
const period = (d) =>
  d3.utcDay.count(new Date(d.year, 1, 1), new Date(1 + d.year, 1, 1));
```

```js echo
const data = fetch("https://climatereanalyzer.org/clim/sst_daily/json_2clim/oisst2.1_natlsp_sst_day.json")
  .then(d => d.json())
  .then((v) => v.flatMap(
    ({name, data}) => Array.from(data,
      (value, day_of_year) => ({
        temperature: value === null ? NaN : value,
        year: +name,
        day_of_year
      })
    ))
  );
```
