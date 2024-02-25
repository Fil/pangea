---
source: https://observablehq.com/@observablehq/plot-auto-mark-heatmap-2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Auto mark, heatmap 2</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Auto mark, heatmap 2

Given a quantitative dimension for _x_ and an ordinal dimension for _y_, the [auto](https://observablehq.com/plot/marks/auto) mark will create a heatmap from the [binned](https://observablehq.com/plot/transforms/bin) _x_ values, grouped by _y_.

```js echo
Plot.auto(olympians, {x: "weight", y: "sex", color: "count"}).plot();
```
