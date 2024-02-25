<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Olympians grouped bar chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Olympians grouped bar chart

The *color* scale, which also represents _sex_, is redundant with *x*, allowing us to suppress the *x* axis and instead rely on the color [legend](https://observablehq.com/plot/features/legends) to help the reader understand the chart’s encodings. The [facets](https://observablehq.com/plot/features/facets) (representing _sports_) are separated by making the *x* [scale](https://observablehq.com/plot/features/scales)’s paddingOuter option a bit larger than the default. 

```js echo
Plot.plot({
  marginBottom: 100,
  fx: {padding: 0, label: null, tickRotate: 90, tickSize: 6},
  x: {axis: null, paddingOuter: 0.2},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y2: "count"}, {x: "sex", fx: "sport", fill: "sex"})),
    Plot.ruleY([0])
  ]
})
```
