---
source: https://observablehq.com/@observablehq/plot-voronoi-scatterplot
index: true
---

# Voronoi scatterplot

The [voronoi](https://observablehq.com/plot/marks/voronoi) mark computes the region closest to each point.

```js echo
const chart = Plot.plot({
  color: {legend: true},
  marks: [
    Plot.voronoi(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
      fillOpacity: 0.2,
      stroke: "var(--plot-background)"
    }),
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species"
    })
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
