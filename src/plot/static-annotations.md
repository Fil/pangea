---
source: https://observablehq.com/@observablehq/plot-static-annotations
index: true
---

# Static annotations

The [tip mark](https://observablehq.com/plot/marks/tip) can be used for static annotations, say to draw attention to elements of interest or to add context.

```js echo
const chart = Plot.plot({
  y: {grid: true},
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.tip(
      [
        `Apple stock reaches a new high of $133 on Feb. 23, 2015. The release of the first Apple Watch, slated for April, is hotly anticipated.`
      ],
      {x: new Date("2015-02-23"), y: 133, dy: -3, anchor: "bottom"}
    ),
    Plot.tip(
      [
        `Apple stock drops 8% after the company misses Q2 revenue targets and reports declining iPhone sales. It reaches a two-year low of $90.34 on May 12.`
      ],
      {x: new Date("2016-05-12"), y: 90.34, dy: 3, anchor: "top"}
    )
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
