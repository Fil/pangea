---
source: https://observablehq.com/@observablehq/plot-scatterplot/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Scatterplot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Scatterplot

Given a dataset with two quantitative dimensions, the [dot](https://observablehq.com/plot/marks/dot) mark creates a scatterplot.

```js echo
Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"}).plot();
```
