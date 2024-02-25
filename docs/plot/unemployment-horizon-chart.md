---
source: https://observablehq.com/@observablehq/plot-unemployment-horizon-chart
index: true
---

# Unemployment horizon chart

By layering colored [bands](https://observablehq.com/plot/marks/area), the horizon chart makes the most of a limited vertical space. For another example, see [Horizon chart](./horizon).

```js echo
const chart = Plot.plot({
  height: 720,
  axis: null,
  y: {domain: [0, step]},
  color: {scheme: dark ? "Cividis" : "YlGnBu"},
  facet: {data: industries, y: "industry"},
  marks: [
    d3.range(bands).map((i) =>
      Plot.areaY(industries, {
        x: "date",
        y: (d) => d.unemployed - i * step,
        fill: i,
        clip: true
      })
    ),
    Plot.text(
      industries,
      Plot.selectFirst({
        text: "industry",
        frameAnchor: "top-left",
        dx: 6,
        dy: 6
      })
    ),
    Plot.frame()
  ]
});

display(chart);
```

```js echo
const bands = 7;
const step = d3.max(industries, (d) => d.unemployed) / bands;
```

```js echo
const industries = FileAttachment("../data/industries.csv").csv({typed: true});
```

```js echo
import {dark} from "../components/dark.js";
```
