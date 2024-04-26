---
source: https://observablehq.com/@observablehq/plot-image-dodge
index: true
---

# Image beeswarm (dodge)

The [image](https://observablehq.com/plot/marks/image) mark supports the _r_ option, and can be used with the [dodge](https://observablehq.com/plot/transforms/dodge) transform. Data: [YouGov](https://today.yougov.com/topics/politics/articles-reports/2021/07/27/most-and-least-popular-us-presidents-according-ame)

```js echo
const chart = Plot.plot({
  inset: 20,
  height: 280,
  marks: [
    Plot.image(
      presidents,
      Plot.dodgeY({
        x: "First Inauguration Date",
        r: 20, // clip to a circle
        preserveAspectRatio: "xMidYMin slice", // try not to clip heads
        src: "Portrait URL",
        title: "Name"
      })
    )
  ]
});

display(chart);
```

```js echo
const presidents = FileAttachment("../data/us-president-favorability.csv").csv({typed: true});
```
