---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Default image scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Default image scatterplot

The default size of the [image](https://observablehq.com/plot/marks/image) mark is only 16×16 pixels. Data: [YouGov](https://today.yougov.com/topics/politics/articles-reports/2021/07/27/most-and-least-popular-us-presidents-according-ame)

```js echo
Plot.plot({
  aspectRatio: 1,
  grid: true,
  x: {label: "Favorable opinion (%) →"},
  y: {label: "↑ Unfavorable opinion (%)"},
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX([0]),
    Plot.image(presidents, {
      x: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"],
      y: (d) => d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      title: "Name"
    })
  ]
});
```

```js echo
const presidents = FileAttachment("us-president-favorability@2.csv").csv({
  typed: true
});
```
