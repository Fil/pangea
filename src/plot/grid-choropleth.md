---
author: Zan Armstrong
source: https://observablehq.com/@observablehq/observable-plot-grid-choropleth
index: true
---

# Grid choropleth

<p class=author>by <a href="https://www.zanarmstrong.com/">Zan Armstrong</a></p>

This grid choropleth shows the population change in each state (and DC) in the United States between 2019 and 2010.

A grid map, shown here using the [cell mark](https://observablehq.com/plot/marks/cell) makes each state the same size shape while keeping the states roughly aligned geographically. The diverging-log color scale with the green/pink scheme indicates if the state is increasing or decreasing in population, with darker colors representing a larger change. See [state population change](./state-population-change) for an different representation of the same data.

```js echo
const chart = Plot.plot({
  height: 420,
  axis: null,
  color: {
    type: "diverging-log", // diverging-log scales pivot at 1 by default
    scheme: "piyg"
  },
  marks: [
    Plot.cell(states, {x: "x", y: "y", fill: change}),
    Plot.text(states, {x: "x", y: "y", text: "key", dy: -2, fill: "black"}), // state abbr
    Plot.text(states, {x: "x", y: "y", text: formatChange, dy: 10, fillOpacity: 0.6, fill: "black"})
  ]
});

display(chart);
```

### US Grid & Data

```js echo
const grid = FileAttachment("../data/us-states-grid.csv")
  .csv({typed: true})
  .then((states) => new Map(states.map((state) => [state.name, state])));
```

```js echo
const population = FileAttachment("../data/us-state-population-2010-2019.csv").csv({typed: true});
```

```js echo
const states = population.filter((d) => grid.has(d.State)).map((d) => ({...d, ...grid.get(d.State)}));
```

```js echo
const change = (d) => d["2019"] / d["2010"];
```

```js echo
const formatChange = (
  (f) => (d) =>
    f(change(d) - 1)
)(d3.format("+.0%"));
```

_Thank you to [@severo](https://observablehq.com/@severo) for [Quality Criteria for Existing Gridmaps](https://observablehq.com/@severo/quality-criteria-for-existing-grid-maps), to Krist Wongsuphasawat for his [analysis](https://kristw.medium.com/whose-grid-map-is-better-quality-metrics-for-grid-map-layouts-e3d6075d9e80), and to the New York Times for their grid map layout._
