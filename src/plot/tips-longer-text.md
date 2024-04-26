---
source: https://observablehq.com/@observablehq/plot-tips-longer-text
index: true
---

# Interactive tips with longer text

The [tip mark](https://observablehq.com/plot/marks/tip) supports the **title** channel for longer texts.

```js echo
const chart = Plot.plot({
  grid: true,
  marks: [
    Plot.dot(olympians, {
      x: "weight",
      y: "height",
      fy: "sex",
      sort: (d) => !!d.info,
      strokeOpacity: (d) => (d.info ? 1 : 0.02)
    }),
    Plot.tip(
      olympians,
      Plot.pointer({
        x: "weight",
        y: "height",
        fy: "sex",
        filter: (d) => d.info,
        title: (d) => [d.name, d.info].join("\n\n")
      })
    )
  ]
});

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
