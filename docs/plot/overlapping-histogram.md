<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Overlapping histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Overlapping histogram

Olympic athletes [binned](https://observablehq.com/plot/transforms/bin) by weight, separately for each category (*sex*). You can opt-out of [rectY](https://observablehq.com/plot/marks/rect)’s implicit [stackY](https://observablehq.com/plot/transforms/stack) transform by specifying either **y1** or **y2**.

```js echo
Plot.plot({
  round: true,
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y2: "count"}, {x: "weight", fill: "sex", mixBlendMode: "multiply"})),
    Plot.ruleY([0])
  ]
})
```

The **mixBlendMode** option can be very slow to render if there are many elements, but is useful for avoiding occlusion. Alternatively, you can use a sort transform to draw the shortest rects on top.

```js echo
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.rectY(
      olympians,
      Plot.sort(
        {channel: "y2", order: "descending"}, // prevent occlusion 🌶️
        Plot.binX(
          {y2: "count"}, // opt-out of stacking
          {x: "weight", fill: "sex"}
        )
      )
    ),
    Plot.ruleY([0])
  ]
})
```

Or, as two interleaved histograms using insets:

```js echo
Plot.plot({
  round: true,
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {filter: (d) => d.sex === "male", x: "weight", fill: "sex", insetLeft: 4})),
    Plot.rectY(olympians, Plot.binX({y: "count"}, {filter: (d) => d.sex === "female", x: "weight", fill: "sex", insetRight: 4})),
    Plot.ruleY([0])
  ]
})
```
