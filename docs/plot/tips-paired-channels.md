---
source: https://observablehq.com/@observablehq/plot-tips-paired-channels
index: true
---

# Tips, paired channels

The [tip mark](https://observablehq.com/plot/marks/tip) recognizes that **x1** & **x2** and **y1** & **y2** are paired channels. They can represent either an extent (_e.g.,_ the boundaries of the bins) or a length (_e.g.,_ the frequency).

```js echo
const chart = Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", tip: true})).plot();

display(chart);
```

This even works when stacking negative values, say to mirror the histogram instead of stacking it. (The tip displays negative frequency, but this is consistent with the _y_ axis.)

```js echo
const chart2 = Plot.rectY(
  olympians,
  Plot.binX(
    {y: "sum"},
    {
      x: "weight",
      y: (d) => (d.sex === "male" ? 1 : -1),
      fill: "sex",
      tip: true
    }
  )
).plot({y: {label: "Frequency"}});

display(chart2);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
