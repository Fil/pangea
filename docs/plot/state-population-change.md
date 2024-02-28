---
source: https://observablehq.com/@observablehq/plot-state-population-change
index: true
---

# State population change

This diverging [bar](https://observablehq.com/plot/marks/bar) mark is sized by the population change in each State (between 2010 and 2019). The states are [sorted](https://observablehq.com/plot/features/scales#sort-mark-option) according to the same channel _x_. A [grid](https://observablehq.com/plot/marks/grid), a [rule](https://observablehq.com/plot/marks/rule) and a _y_ [axis](https://observablehq.com/plot/marks/axis) placed at the center (_x_: 0) give the final touch. See [grid choropleth](./grid-choropleth) for a geographical representation of the same data.

```js echo
const chart = Plot.plot({
  label: null,
  x: {
    axis: "top",
    label: "← decrease · Change in population, 2010–2019 (%) · increase →",
    labelAnchor: "center",
    tickFormat: "+",
    percent: true
  },
  color: {
    scheme: "PiYG",
    type: "ordinal"
  },
  marks: [
    Plot.barX(statepop, {
      x: "value",
      y: "State",
      fill: (d) => d.value > 0,
      sort: {y: "x"}
    }),
    Plot.gridX({stroke: "var(--plot-background)", strokeOpacity: 0.5}),
    d3
      .groups(statepop, (d) => d.value > 0)
      .map(([growth, states]) => [
        Plot.axisY({
          x: 0,
          ticks: states.map((d) => d.State),
          tickSize: 0,
          anchor: growth ? "left" : "right"
        }),
        Plot.textX(states, {
          x: "value",
          y: "State",
          text: (
            (f) => (d) =>
              f(d.value)
          )(d3.format("+.1%")),
          textAnchor: growth ? "start" : "end",
          dx: growth ? 4 : -4
        })
      ]),
    Plot.ruleX([0])
  ]
});

display(chart);
```

```js echo
const statepop = FileAttachment("../data/us-state-population-2010-2019.csv")
  .csv({typed: true})
  .then((data) => data.map((d) => ({...d, value: (d[2019] - d[2010]) / d[2010]})));
```
