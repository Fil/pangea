---
source: https://observablehq.com/@observablehq/plot-dodge-penguins
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Dodge penguins</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Dodge penguins

Distribution of [Palmer penguins](https://allisonhorst.github.io/palmerpenguins/) body masses, [faceted](https://observablehq.com/plot/features/facets) by species, colored by sex, using the [dodge transform](https://observablehq.com/plot/transforms/dodge).

```js echo
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [Plot.dot(penguins, Plot.dodgeX("middle", {fx: "species", y: "body_mass_g", fill: "sex"}))]
});
```
