---
source: https://observablehq.com/@observablehq/plot-crosshairx
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: CrosshairX</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# CrosshairX

For charts which have a “dominant” dimension, such as time in a time-series chart, use the [crosshairX](https://observablehq.com/plot/interactions/crosshair) mark for the [pointerX](https://observablehq.com/plot/interactions/pointer#pointerx-options) transform.

```js echo
Plot.plot({
  style: "overflow: visible;",
  marks: [Plot.lineY(aapl, {x: "Date", y: "Close"}), Plot.crosshairX(aapl, {x: "Date", y: "Close"})]
});
```
