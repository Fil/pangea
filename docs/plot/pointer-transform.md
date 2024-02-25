---
source: https://observablehq.com/@observablehq/plot-pointer-transform
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Pointer transform</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Pointer transform

The [pointer transform](https://observablehq.com/plot/interactions/pointer) is not limited to the [tip mark](https://observablehq.com/plot/marks/tip). Below, it is used to filter a filled <span style="border-bottom: solid 2px red;">red</span> dot behind a stroked <span style="border-bottom: solid 2px currentColor;">black</span> dot. As you hover the chart, only the closest red dot to the pointer is rendered. If you remove the pointer transform by toggling the checkbox, all the red dots will be visible.

```js
const pointered = view(Inputs.toggle({label: "Use pointer", value: true}));
```

```js echo
Plot.plot({
  marks: [
    Plot.dot(
      penguins,
      pointered
        ? Plot.pointer({
            x: "culmen_length_mm",
            y: "culmen_depth_mm",
            fill: "red",
            r: 8
          })
        : {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "red", r: 8}
    ),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
});
```
