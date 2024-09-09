---
index: true
---

# display-p3

## make the most of your modern screens

This page uses the OKLCH color space and colors in the P3 gamut to create vivid charts. It looks better in dark mode!

If you have ideas for charts that are better suited to this type of colors, please contact me! I'd love to see maps in vivid colors.

```js echo
const palette = [
  "oklch(67.43% 0.235 359.85)",
  "oklch(94.98% 0.195 117.83)",
  "oklch(87.64% 0.236 149.83)",
  "oklch(50.06% 0.281 269.72)",
  "oklch(90.22% 0.152 171.4)",
  "oklch(85.99% 0.171 94.53)",
  "oklch(87.28% 0.25 148.25)",
  "oklch(45.33% 0.312 264.07)",
  "oklch(61.21% 0.245 7.77)",
  "oklch(88.26% 0.21 120.25)",
];
```

```js echo
Plot.barY(penguins, Plot.groupX({y: "count"}, {
  x: "island",
  fill: "species"
})).plot({
  color: {range: palette}
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
  color: {range: palette}
})
```
