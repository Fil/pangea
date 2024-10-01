---
source: https://observablehq.com/@observablehq/plot-cancer-survival-rates
index: true
---

# Cancer survival rates

A [slope chart](./slope-chart) with intermediate values. The values here are survival rate (in percents) for various cancers. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
const chart = Plot.plot({
  width: 800,
  height: 700,
  x: {
    axis: "top",
    type: "point",
    domain: ["5 Year", "10 Year", "15 Year", "20 Year"],
    inset: 60,
    label: null
  },
  y: {axis: null, inset: 20},
  marks: [
    Plot.line(cancer, {x: "year", y: "survival", z: "name"}),
    d3
      .groups(cancer, (d) => d.year)
      .map(([year, cancer]) =>
        Plot.text(
          cancer,
          occlusionY({
            x: "year",
            y: "survival",
            text:
              year === "5 Year"
                ? (d) => `${d.name} ${d.survival}`
                : year === "20 Year"
                ? (d) => `${d.survival} ${d.name}`
                : "survival",
            textAnchor: year === "5 Year" ? "end" : year === "20 Year" ? "start" : "middle",
            fill: "currentColor",
            stroke: "var(--plot-background)",
            strokeWidth: 5,
            dx: year === "5 Year" ? -3 : year === "20 Year" ? 3 : 0
          })
        )
      )
  ]
});

display(chart);
```

```js echo
// https://github.com/observablehq/plot/pull/1957
import {occlusionY} from "../components/occlusion.js";
```

```js echo
const cancer = FileAttachment("../data/cancer.csv").csv({typed: true});
```
