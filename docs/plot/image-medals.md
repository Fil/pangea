<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Image medals</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Image medals

Showing the percentage of people today who have an opinion of past presidents using the [image](https://observablehq.com/plot/marks/image) mark (with the _r_ option set, to make images circular). Data from [YouGov](https://today.yougov.com/topics/politics/articles-reports/2021/07/27/most-and-least-popular-us-presidents-according-ame); inspired by [Robert Lesser](https://observablehq.com/@rlesser/when-presidents-fade-away).

```js echo
Plot.plot({
  x: {inset: 20, label: "First inauguration date →"},
  y: {insetTop: 4, grid: true, label: "↑ Any opinion (%)", tickFormat: "+f"},
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"] + d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      r: 20,
      preserveAspectRatio: "xMidYMin slice",
      title: "Name"
    })
  ]
})
```

```js echo
presidents = FileAttachment("us-president-favorability@1.csv").csv({typed: true})
```
