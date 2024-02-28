---
index: true
---

# Plot: labelled horizontal bar charts

## A few variants

Bar charts associate a label with a quantitative value. For _nominal_ bar charts, the labels have no defined order, and the bars are typically sorted by value. Using a horizontal bar mark (_barX_) is usually a good solution because it makes the labels more readable—vertical bars, by contrast, often need [rotated labels](./vertical-bars-rotated-labels). The following variations show different displays of value and label, to make the most of the available space.

Data: Interbrand. Market value of 10 top global brands in 2018, in millions of dollars.

_1. Show the value to the right_

```js echo
const chart1 = Plot.plot({
  width: 350,
  marginLeft: 90,
  marginRight: 70,
  x: {axis: null},
  y: {label: null},
  marks: [
    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: {y: "x", reverse: true}
    }),

    Plot.text(brands, {
      text: "value",
      y: "name",
      x: "value",
      textAnchor: "start",
      dx: 3
    })
  ]
});

display(chart1);
```

_2. Show the value on the bar_

```js echo
const chart2 = Plot.plot({
  width: 500,
  marginLeft: 90,
  x: {axis: null},
  y: {label: null},
  marks: [
    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: {y: "x", reverse: true}
    }),

    Plot.text(brands, {
      text: (d) => `${Math.floor(d.value / 1000)} B`,
      y: "name",
      x: "value",
      textAnchor: "end",
      dx: -3,
      fill: "var(--plot-background)"
    })
  ]
});

display(chart2);
```

_3. Move the y axis onto the bar_

```js echo
const chart3 = Plot.plot({
  width: 410,
  marginLeft: 10,
  x: {
    axis: "top",
    transform: (d) => d / 1000,
    label: "Brand value (billions) →",
    grid: 5
  },
  marks: [
    Plot.ruleX([0]),

    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: {y: "x", reverse: true}
    }),

    Plot.axisY({
      label: null,
      textAnchor: "start",
      fill: "var(--plot-background)",
      dx: 14
    })
  ]
});

display(chart3);
```

_4. For a narrower chart, change the position depending on the width_

```js echo
const chart4 = Plot.plot({
  width: 135,
  axis: null,
  x: {insetRight: 10},
  marks: [
    Plot.frame(),
    Plot.barX(brands, {
      x: "value",
      y: "name",
      sort: {y: "x", reverse: true}
    }),
    Plot.gridX({ticks: 5, stroke: "#ccc", strokeOpacity: 0.3}),
    // labels for larger bars
    Plot.text(brands, {
      text: (d) => `${d.name} (${Math.floor(d.value / 1000)})`,
      y: "name",
      frameAnchor: "left",
      dx: 4,
      filter: (d) => d.value >= 130000,
      fill: "var(--plot-background)"
    }),
    // labels for smaller bars
    Plot.text(brands, {
      text: (d) => `${d.name} (${Math.floor(d.value / 1000)})`,
      y: "name",
      x: "value",
      textAnchor: "start",
      dx: 3,
      filter: (d) => d.value < 130000,
      fill: "currentColor",
      stroke: "var(--plot-background)"
    })
  ]
});

display(chart4);
```

```js echo
const brands = FileAttachment("../data/brands-2018.csv")
  .csv({typed: true})
  .then((d) => d.slice(0, 10));
```
