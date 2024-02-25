---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: County boxes</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# County boxes

Geographic bounding boxes of U.S. counties, rendered as [rects](https://observablehq.com/plot/marks/rect) with the four coordinates _x₁_, _y₁_, _x₂_ and _y₂_.

```js echo
Plot.plot({
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
```

```js echo
const countyboxes = {
  const counties = topojson.feature(us, us.objects.counties).features;
  return counties.map((d) => d3.geoBounds(d).flat());
}
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```
