---
source: https://observablehq.com/@observablehq/plot-slope-chart
index: true
---

# Slope chart

Also known as a _slopegraph_, this chart shows change between two (or a few) discrete points in time. An _occlusion_ transform avoids label overlap. The values here are government receipts as a percentage of GDP. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
const chart = Plot.plot({
  height: 540,
  x: {axis: "top", type: "ordinal", tickFormat: "", inset: 90, label: null},
  y: {axis: null, inset: 20},
  marks: [
    Plot.line(receipts, {x: "year", y: "receipts", z: "country"}),
    d3
      .groups(receipts, (d) => d.year === 1970)
      .map(([left, receipts]) =>
        Plot.text(
          receipts,
          occlusionY({
            x: "year",
            y: "receipts",
            text: left ? (d) => `${d.country} ${d.receipts}` : (d) => `${d.receipts} ${d.country}`,
            textAnchor: left ? "end" : "start",
            dx: left ? -3 : 3,
            radius: 5.5
          })
        )
      )
  ],
  caption: "Current receipts of government as a percentage of gross domestic product"
});

display(chart);
```

```js echo
const receipts = FileAttachment("../data/gdp-receipts.csv").csv({typed: true});
```

```js echo
// https://github.com/observablehq/plot/pull/1957
import {occlusionY} from "../components/occlusion.js";
```
