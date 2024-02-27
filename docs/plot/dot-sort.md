---
source: https://observablehq.com/@observablehq/plot-dot-sort
index: true
---

# Bubble map

By default, [dots](https://observablehq.com/plot/marks/dot) are sorted by descending radius. Toggle the checkbox to draw the dots in input order with sort: null.

```js
const sorted = view(Inputs.toggle({value: true, label: "Use default sort"}));
```

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.4}),
    Plot.dot(
      counties,
      Plot.geoCentroid({
        r: (d) => d.properties.population,
        fill: "currentColor",
        stroke: "var(--theme-background)",
        strokeWidth: 1,
        sort: sorted
          ? {channel: "r", order: "descending"} // explicitly sort “by descending radius”, which is the default
          : null // draw points in input order
      })
    )
  ]
});

display(chart);
```

---

```js echo
const us = FileAttachment("../data/us-counties-10m.json").json();
```

```js echo
const statemesh = topojson.mesh(us, us.objects.states);
```

The cell below joins the counties geographies with the population data; see our [tutorial](https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot) for more details.

```js echo
const counties = (async () => {
  const counties = topojson.feature(us, us.objects.counties);
  const pop = await FileAttachment("../data/us-county-population.csv").csv();
  const map = new Map(pop.map((d) => [`${d.state}${d.county}`, +d.population]));
  for (const g of counties.features) g.properties.population = map.get(g.id);
  return counties.features;
})();
```
