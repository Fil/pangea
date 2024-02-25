---
source: https://observablehq.com/@observablehq/plot-hexbin-text
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Hexbin text</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Hexbin text

Olympic athletes are placed on this [heatmap](https://observablehq.com/@observablehq/plot-olympians-hexbin) according to their weight and height, [scaled](https://observablehq.com/plot/features/scales) by _x_ and _y_. _Then_ their positions (in pixels) are grouped into [hexagonal bins](https://observablehq.com/plot/transforms/hexbin), which are represented by a [text](https://observablehq.com/plot/marks/text) mark showing the count.

```js echo
Plot.text(olympians, Plot.hexbin({text: "count"}, {x: "weight", y: "height"})).plot();
```
