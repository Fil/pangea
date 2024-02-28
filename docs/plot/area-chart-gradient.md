---
source: https://observablehq.com/@observablehq/plot-area-chart-with-gradient
index: true
---

# Area chart with gradient

A custom [function mark](https://observablehq.com/plot/features/marks) returns a svg gradient (generated with [Hypertext Literal](https://observablehq.com/@observablehq/htl)), that can be referenced as a [funciri](https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#funciri) color in the [area](https://observablehq.com/plot/marks/area) mark.

```js echo
const chart = Plot.plot({
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
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
