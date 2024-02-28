---
source: https://observablehq.com/@observablehq/plot-background-image
index: true
---

# Background image

Visualizes [Kristen Gorman’s penguins dataset](https://allisonhorst.github.io/palmerpenguins/) atop of her photograph of sea ice near [Palmer Station](https://en.wikipedia.org/wiki/Palmer_Station) on the Antarctic peninsula. Using Plot’s [style](https://observablehq.com/plot/features/plots) option.

```js echo
const chart = Plot.plot({
  margin: 30,
  inset: 10,
  grid: true,
  style: {
    padding: 10,
    color: "black",
    background: `url(${await FileAttachment("../assets/sea-ice.jpg").url()})`,
    backgroundSize: "cover"
  },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "white",
      stroke: "black"
    })
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```
