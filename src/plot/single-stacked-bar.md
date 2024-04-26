---
source: https://observablehq.com/@observablehq/plot-single-stacked-bar
index: true
---

# Single stacked bar

The [text](https://observablehq.com/plot/marks/text) mark consumes the _x_ channel, which is the midpoint of the [stacked](https://observablehq.com/plot/transforms/stack) positions _x1_ and _x2_—putting the label in the middle of each bar. See also [stacked percentages](./stacked-percentages).

```js echo
const chart = Plot.plot({
  height: 100,
  x: {percent: true},
  marks: [
    Plot.barX(
      olympians,
      Plot.stackX(
        {order: "x", reverse: true},
        Plot.groupZ({x: "proportion"}, {z: "sport", fillOpacity: 0.2, inset: 0.5})
      )
    ),
    Plot.text(
      olympians,
      Plot.filter(
        (D) => D.length > 200,
        Plot.stackX(
          {order: "x", reverse: true},
          Plot.groupZ({x: "proportion", text: "first"}, {z: "sport", text: "sport", rotate: 90})
        )
      )
    ),
    Plot.ruleX([0, 1])
  ]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
