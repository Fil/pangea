---
source: https://observablehq.com/@observablehq/plot-population-pyramid
index: true
---

# Population pyramid

Horizontally [stacked](https://observablehq.com/plot/transforms/stack) areas. Data: German Federal Institute for Population Research (BiB). To learn more, see Éric Mauvière’s [tutorial](https://observablehq.com/@ericmauviere/population-pyramid-with-plot) on population pyramids.

```js echo
const chart = Plot.plot({
  width: 500,
  height: 500,
  x: {
    label: "← men · population (thousands) · women →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  y: {grid: true},
  color: {
    domain: ["ledig", "verheiratet", "geschieden", "verwitwet"],
    range: ["#69AEBE", "#F1757A", "#F2B678", "#989D9E"],
    legend: true,
    tickFormat: (d) => translations[d]
  },
  marks: [
    Plot.areaX(population, {
      x: (d) => d.population * (d.sex === "M" ? -1 : 1),
      y: "age",
      z: (d) => [d.sex, d.category].join(","),
      fill: "category"
    }),
    Plot.ruleX([0]),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const translations = {
  ledig: "single",
  verheiratet: "married",
  geschieden: "divorced",
  verwitwet: "widowed"
};
```

```js echo
const population = FileAttachment("../data/population-germany.csv").csv({typed: true});
```

---

The variant below inserts an axis in the middle:

```js echo
const chart2 = Plot.plot({
  color: {
    domain: ["ledig", "verheiratet", "geschieden", "verwitwet"],
    range: ["#69AEBE", "#F1757A", "#F2B678", "#989D9E"],
    legend: true,
    tickFormat: (d) => translations[d]
  },
  height: 500,
  width: 400,
  marginBottom: 40,
  marginLeft: 30,
  marginRight: 30,
  marks: [
    Plot.axisY({
      frameAnchor: "middle",
      dx: 16,
      tickSize: 30,
      label: null,
      tickFormat: () => "",
      strokeOpacity: (d) => (d ? (d % 10 ? 0.1 : 0.3) : 0)
    }),
    Plot.axisX({
      ticks: [0, -250, -500, -750],
      tickFormat: Math.abs,
      dx: -20,
      label: "← men (thousands)",
      labelAnchor: "left"
    }),
    Plot.axisX({
      ticks: [0, 250, 500, 750],
      dx: 20,
      label: "women (thousands) →"
    }),
    Plot.axisY({
      frameAnchor: "middle",
      dx: 16,
      tickSize: 0,
      label: null,
      ticks: 10,
      fill: "currentColor",
      textStroke: "var(--plot-background)",
      textStrokeWidth: 10
    }),
    Plot.text(["↑ age"], {frameAnchor: "top", dy: -10}),
    Plot.areaX(population, {
      y: "age",
      x: (d) => -d.population,
      dx: -20,
      fill: "category",
      filter: (d) => d.sex === "M"
    }),
    Plot.areaX(population, {
      y: "age",
      x: "population",
      dx: 20,
      fill: "category",
      filter: (d) => d.sex === "F"
    }),
    Plot.ruleY([0], {
      x1: 0,
      x2: -850,
      dx: -20
    }),
    Plot.ruleY([0], {
      x1: 0,
      x2: 850,
      dx: 20
    })
  ]
});

display(chart2);
```
