---
source: https://observablehq.com/@observablehq/plot-line-chart-with-markers
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line chart with markers</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line chart with markers

Use [markers](https://observablehq.com/plot/features/markers) to indicate the data points that are interpolated by the [line](https://observablehq.com/plot/marks/line) mark.

```js echo
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(crimea, {
      x: "date",
      y: "deaths",
      stroke: "cause",
      marker: true
    })
  ]
});
```

```js echo
const crimea = {
  const data = await FileAttachment("crimean-war.csv").csv({typed: true});
  return data.columns.slice(2).flatMap((cause) => data.map(({date, [cause]: deaths}) => ({date, cause, deaths}))); // pivot taller
}
```
