---
index: true
---

# Treemap

Introduced by [Ben Shneiderman](http://www.cs.umd.edu/hcil/treemap-history/), treemaps recursively partition space into rectangles according to each node’s associated value. D3 supports several treemap [tiling methods](https://d3js.org/d3-hierarchy/treemap#treemap-tiling). See also [nested](./nested-treemap), [zoomable](./zoomable-treemap) and [animated](./animated-treemap) treemaps, and the [bubble chart](./bubble-chart). If your data is flat, see the [treemap, CSV](https://observablehq.com/@d3/treemap-stratify?intent=fork) variant.

```js
const tile = view(
  Inputs.select(
    new Map([
      ["binary", d3.treemapBinary],
      ["squarify", d3.treemapSquarify],
      ["slice-dice", d3.treemapSliceDice],
      ["slice", d3.treemapSlice],
      ["dice", d3.treemapDice]
    ]),
    {label: "Tiling method", value: d3.treemapBinary}
  )
);
```

```js
const key = Swatches(chart.scales.color);
display(key);
```

```js echo
const chart = Treemap(data, {
  width,
  label: (d) => `${d.name}\n${d.value.toLocaleString("en")}`,
  value: (d) => d.value,
  height: width,
  tile,
  group: (d) => d.branch
});
display(chart);
```

```js echo
const data = display(await FileAttachment("../data/flare.json").json());
for (const branches of data.children) {
  for (const {data} of d3.hierarchy(branches)) data.branch = branches.name;
}
```

```js echo
import {Swatches} from "../components/color-legend.js";
import {Treemap} from "../components/treemap.js";
```
