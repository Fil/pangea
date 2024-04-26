---
source: https://observablehq.com/@observablehq/plot-gradient-encoding
index: true
---

# Gradient encoding

A custom [function mark](https://observablehq.com/plot/features/marks) returns a [SVG gradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients) (generated with [Hypertext Literal](https://observablehq.com/@observablehq/htl) and based on the color scale), that can be referenced as a [funciri](https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#funciri) stroke color in the [line](https://observablehq.com/plot/marks/line) mark.

```js echo
const chart = Plot.plot({
  y: {nice: true},
  color: {domain: [45, 75], scheme: "turbo", legend: true, ticks: 7, label: "temperature (°F)"},
  marks: [
    Plot.line(sftemp, {
      x: "date",
      y: "high",
      stroke: "url(#gradient)",
      curve: "step-before"
    }),

    (_index, {y, color}) => htl.svg`<defs>
   <linearGradient id="gradient" gradientUnits="userSpaceOnUse"
     x1=0 x2=0 y1=${y(45)} y2=${y(75)}>${d3.ticks(0, 1, 10).map(
      (t) =>
        htl.svg`<stop
                  offset=${t * 100}%
                  stop-color=${color(45 * (1 - t) + 75 * t)} />`
    )}`
  ]
});

display(chart);
```

```js echo
const sftemp = FileAttachment("../data/sf-temperatures.csv").csv({typed: true});
```
