---
index: true
theme: dark
---

# display-p3

## make the most of your modern screens

```js echo
Plot.barY(penguins, Plot.groupX({y: "count"}, {
  x: "island",
  fill: "species"
})).plot({
  color: {
    range: d3.range(80, 360, 75).map(i => `oklch(1.0 0.5 ${i})`)
  }
})
```

The **raster** mark needs [PR #2145](https://github.com/observablehq/plot/pull/2145).

```js echo
// locally installed by adding to package.json:
// "@observablehq/plot": "https://github.com/observablehq/plot#fil/colorSpace-hack",
import * as Plot from "@observablehq/plot";
```

```js echo
Plot.raster(penguins, {
  x: "body_mass_g",
  y: "culmen_length_mm",
  fill: "species",
  pixelSize: 20,
  imageRendering: "pixelated",
  colorSpace: "display-p3"
}).plot({
  color: {
    range: d3.range(80, 360, 75).map(i => `oklch(1.0 0.5 ${i})`)
  }
})
```
