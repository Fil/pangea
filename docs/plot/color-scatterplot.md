<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Scatterplot with color</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Scatterplot with color

Two quantitative dimensions encoded to the *x* and *y* dimensions (see [scales](https://observablehq.com/plot/features/scales)), and a categorical dimension encoded to *stroke* (color), drawn with the [dot](https://observablehq.com/plot/marks/dot) mark.

```js echo
Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"}).plot()
```
