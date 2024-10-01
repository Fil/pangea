---
source: https://observablehq.com/@observablehq/observable-plot-grid-choropleth
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Grid choropleth</h1><a href="/plot">Observable Plot</a> › <a href="https://observablehq.com/@observablehq/plot-gallery">Gallery</a></div>

# Grid choropleth

This grid choropleth created in [Observable Plot](https://observablehq.com/@observablehq/plot) shows the population change in each state (and DC) in the United States between 2019 and 2010. 

A grid map, shown here using the [cell mark](https://observablehq.com/plot/marks/cell) makes each state the same size shape while keeping the states roughly aligned geographically. The diverging-log color scale with the green/pink scheme indicates if the state is increasing or decreasing in population, with darker colors representing a larger change.


```js echo
Plot.plot({
  height: 420,
  axis: null,
  color: {
    type: "diverging-log", // diverging-log scales pivot at 1 by default
    scheme: "piyg"
  },
  marks: [
    Plot.cell(states, {x: "x", y: "y", fill: change}),
    Plot.text(states, {x: "x", y: "y", text: "key", dy: -2}), // state abbr
    Plot.text(states, {x: "x", y: "y", text: formatChange, dy: 10, fillOpacity: 0.6})
  ]
})
```

### US Grid & Data

```js echo
grid = FileAttachment("grid.csv").csv({ typed: true })
  .then((states) => new Map(states.map((state) => [state.name, state])))
```

```js echo
population = FileAttachment("population.csv").csv({typed: true})
```

```js echo
states = population
  .filter((d) => grid.has(d.State))
  .map((d) => ({ ...d, ...grid.get(d.State) }))
```

```js echo
change = d => d["2019"] / d["2010"]
```

```js echo
formatChange = ((f) => (d) => f(change(d) - 1))(d3.format("+.0%"))
```


*Thank you to [@severo](https://observablehq.com/@severo) for [Quality Criteria for Existing Gridmaps](https://observablehq.com/@severo/quality-criteria-for-existing-grid-maps), to Krist Wongsuphasawat for his [analysis](https://kristw.medium.com/whose-grid-map-is-better-quality-metrics-for-grid-map-layouts-e3d6075d9e80), and to the New York Times for their grid map layout.*
