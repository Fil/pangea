---
source: https://observablehq.com/@observablehq/plot-horizon
index: true
---

# Horizon chart

Horizon charts are an alternative to [ridgeline plots](./ridgeline-plot) and small-multiple area charts that allow greater precision for a given vertical space by using colored bands. These charts can be used with diverging color scales to differentiate positive and negative values. Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js
const bands = view(Inputs.range([2, 8], {step: 1, label: "Bands"}));
```

```js echo
const chart = Plot.plot({
  height: 1100,
  width: 928,
  x: {axis: "top"},
  y: {domain: [0, step], axis: null},
  fy: {axis: null, domain: traffic.map((d) => d.location), padding: 0.05},
  color: {
    type: "ordinal",
    range: dark ? [...d3.schemeGreens[bands + 1]].reverse() : d3.schemeGreens[bands],
    label: "Vehicles per hour",
    tickFormat: (i) => ((i + 1) * step).toLocaleString("en"),
    legend: true
  },
  marks: [
    d3.range(bands).map((band) =>
      Plot.areaY(traffic, {
        x: "date",
        y: (d) => d.vehicles - band * step,
        fy: "location",
        fill: band,
        sort: "date",
        clip: true
      })
    ),
    Plot.axisFy({
      frameAnchor: "left",
      dx: -28,
      fill: "currentColor",
      textStroke: "var(--plot-background)",
      label: null
    })
  ]
});

display(chart);
```

```js echo
const traffic = FileAttachment("../data/traffic.csv").csv({typed: true});
```

```js echo
const step = (d3.max(traffic, (d) => d.vehicles) / bands).toPrecision(2);
```

```js echo
import {dark} from "../components/dark.js";
```
