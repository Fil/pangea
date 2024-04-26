---
source: https://observablehq.com/@observablehq/plot-county-boxes
index: true
keywords: map
---

# County boxes

Geographic bounding boxes of U.S. counties, rendered as [rects](https://observablehq.com/plot/marks/rect) with the four coordinates _x₁_, _y₁_, _x₂_ and _y₂_.

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.rect(countyboxes, {
      x1: "0", // or ([x1]) => x1
      y1: "1", // or ([, y1]) => y1
      x2: "2", // or ([,, x2]) => x2
      y2: "3", // or ([,,, y2]) => y2
      stroke: "currentColor"
    })
  ]
});

display(chart);
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
const countyboxes = counties.map((d) => d3.geoBounds(d).flat());
```

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```
