<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Image beeswarm</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Image beeswarm (dodge)

The [image](https://observablehq.com/plot/marks/image) mark supports the *r* option, and can be used with the [dodge](https://observablehq.com/plot/transforms/dodge) transform. data: [YouGov](https://today.yougov.com/topics/politics/articles-reports/2021/07/27/most-and-least-popular-us-presidents-according-ame)

```js echo
Plot.plot({
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
})
```

```js echo
presidents = FileAttachment("us-president-favorability@2.csv").csv({typed: true})
```
