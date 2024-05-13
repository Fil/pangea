# Ternary diagrams

In [The ABC of mobility](https://www.sciencedirect.com/science/article/pii/S0160412024001272), _Environment International_,
volume 185, March 2024, Rafael Prieto-Curiel and Juan P. Ospina use ternary diagrams (aka ternary plots) to organize ${data.length} cities according to the proportion of people who commute to work by active means (walking, biking), public transport (bus), or by car.

Each city is represented by a dot with a size proportional to its population, and color corresponding to its region. The position is defined by a ternary (A = Active, B = Public transport, and C = car).

```js echo
const chart = Plot.plot({
  width,
  projection: {type: ternary.projection, inset: 32},
  marks: [
    Plot.sphere(),
    ternary.graticule(),
    ternary.tickLabels(),
    ternary.labels(["Driving", "Active mobility", "Public transport"]),
    Plot.dot(data, {
      x: "car",
      y: "active",
      r: "population",
      fill: "region",
      fillOpacity: 0.9,
      stroke: "var(--plot-background)",
      strokeWidth: 0.5,
      tip: {channels: {City: (d) => `${d.city}, ${d.country}`}}
    })
  ]
});

display(chart);
```

---

For more information on the _ternary_ component, see [this notebook](https://observablehq.com/@fil/ternary-plot).

```js
display(
  Plot.plot({
    width: 350,
    projection: {type: ternary.projection, inset: 25},
    marks: [Plot.sphere(), ternary.graticule(), ternary.tickLabels(), ternary.labels(["A", "B", "C"])]
  })
);
```

```js echo
import * as ternary from "/components/ternary.js";
```

```js echo
const data = FileAttachment("/data/mobility.csv").csv({typed: true});
```
