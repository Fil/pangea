<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Single stacked bar</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Single stacked bar

The [text](https://observablehq.com/plot/marks/text) mark consumes the *x* channel, which is the midpoint of the [stacked](https://observablehq.com/plot/transforms/stack) positions *x1* and *x2*—putting the label in the middle of each bar. See also [Stacked percentages](/@observablehq/plot-stacked-percentages).

```js echo
Plot.plot({
  height: 100,
  x: {percent: true},
  marks: [
    Plot.barX(
      olympians,
      Plot.stackX(
        {order: "x", reverse: true},
        Plot.groupZ(
          {x: "proportion"},
          {z: "sport", fillOpacity: 0.2, inset: 0.5}
        )
      )
    ),
    Plot.text(
      olympians,
      Plot.filter(
        (D) => D.length > 200,
        Plot.stackX(
          {order: "x", reverse: true},
          Plot.groupZ(
            {x: "proportion", text: "first"},
            {z: "sport", text: "sport", rotate: 90}
          )
        )
      )
    ),
    Plot.ruleX([0, 1])
  ]
})
```
