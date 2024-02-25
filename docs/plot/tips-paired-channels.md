---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Tips, paired channels</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Tips, paired channels

The [tip mark](https://observablehq.com/plot/marks/tip) recognizes that **x1** & **x2** and **y1** & **y2** are paired channels. They can represent either an extent (_e.g.,_ the boundaries of the bins) or a length (_e.g.,_ the frequency).

```js echo
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", tip: true})).plot();
```

This even works when stacking negative values, say to mirror the histogram instead of stacking it. (The tip displays negative frequency, but this is consistent with the _y_ axis.)

```js echo
Plot.rectY(
  olympians,
  Plot.binX(
    {y: "sum"},
    {
      x: "weight",
      y: (d) => (d.sex === "male" ? 1 : -1),
      fill: "sex",
      tip: true
    }
  )
).plot({y: {label: "Frequency"}});
```
