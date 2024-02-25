<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Area chart with gradient</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Area chart with gradient

A custom [function mark](https://observablehq.com/plot/features/marks) returns a svg gradient (generated with [Hypertext Literal](https://observablehq.com/@observablehq/htl)), that can be referenced as a [funciri](https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#funciri) color in the [area](https://observablehq.com/plot/marks/area) mark.

```js echo
Plot.plot({
  y: {grid: true},
  marks: [
    () => htl.svg`<defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="20%" stop-color="steelblue" stop-opacity="0.5" />
        <stop offset="100%" stop-color="brown" stop-opacity="0" />
      </linearGradient>
    </defs>`,
    Plot.areaY(aapl, {x: "Date", y: "Close", fill: "url(#gradient)"}),
    Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "steelblue"}),
    Plot.ruleY([0])
  ]
})
```
