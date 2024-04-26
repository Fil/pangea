---
source: https://observablehq.com/@observablehq/plot-image-scatterplot
index: true
---

# Image scatterplot

Showing the net favorability of past presidents among people today using the [image](https://observablehq.com/plot/marks/image) mark. Data from [YouGov](https://today.yougov.com/topics/politics/articles-reports/2021/07/27/most-and-least-popular-us-presidents-according-ame); inspired by [Robert Lesser](https://observablehq.com/@rlesser/when-presidents-fade-away).

```js echo
const chart = Plot.plot({
  inset: 20,
  x: {label: "First inauguration date →"},
  y: {grid: true, label: "↑ Net favorability (%)", tickFormat: "+f"},
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) =>
        d["Very Favorable %"] + d["Somewhat Favorable %"] - d["Very Unfavorable %"] - d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      width: 40,
      title: "Name"
    })
  ]
});

display(chart);
```

```js echo
const presidents = FileAttachment("../data/us-president-favorability.csv").csv({
  typed: true
});
```
