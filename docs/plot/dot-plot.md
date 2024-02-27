---
source: https://observablehq.com/@observablehq/plot-dot-plot
index: true
---

# Dot plot

Comparing demographics by state. _Color_ represents age group, _y_ represents the state, and _x_ represents the proportion of the state’s population in that age group. The [normalize transform](https://observablehq.com/plot/transforms/normalize) is used to compute the relative proportion of each age group within each state, while the [group transform](https://observablehq.com/plot/transforms/group) is used to pull out the _min_ and _max_ values for each state for a horizontal [rule](https://observablehq.com/plot/marks/rule).

```js echo
const xy = Plot.normalizeX("sum", {
  x: "population",
  y: "state",
  z: "state"
});

const chart = Plot.plot({
  height: 660,
  x: {axis: "top", percent: true, grid: true},
  y: {axis: null},
  color: {scheme: "spectral", legend: true},
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(stateage, Plot.groupY({x1: "min", x2: "max"}, {...xy, sort: {y: "x1"}})),
    Plot.dot(stateage, {
      ...xy,
      fill: "age",
      title: "age",
      sort: {color: null}
    }), // color in input order
    Plot.text(stateage, Plot.selectMinX({...xy, textAnchor: "end", dx: -6, text: "state"}))
  ]
});

display(chart);
```

```js echo
const stateage = FileAttachment("../data/us-population-state-age.csv")
  .csv({typed: true})
  .then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    return Object.assign(
      ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))),
      {ages}
    );
  });
```
