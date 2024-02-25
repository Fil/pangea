---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Pre-binned histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Pre-binned histogram

This is for demonstration only; you wouldn’t normally bin “by hand” as shown here, but rather use the [bin](https://observablehq.com/plot/transforms/bin) transform.

```js echo
Plot.rectY(bins, {x1: "x0", x2: "x1", y2: "length"}).plot();
```

```js echo
const bins = d3
  .bin()
  .thresholds(80)
  .value((d) => d.weight)(olympians);
```
