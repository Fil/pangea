---
index: true
source: https://github.com/observablehq/plot/pull/2088
---

# London facets

A faceted choropleth of London, showing how car access evolved, borough by borough, over the years. Data derived by Jo Wood from UK Census data, [giCentre](https://github.com/gicentre/data), City University of London

```js echo
Plot.plot({
  width: 900,
  projection: {type: "transverse-mercator", rotate: [2, 0, 0], domain: london},
  color: {scheme: "RdYlBu", pivot: 0.5},
  marks: [
    Plot.geo(access, {
      fx: "year",
      geometry: (d) => boroughs.get(d.borough),
      fill: "access",
      stroke: "var(--plot-background)",
      strokeWidth: 0.75,
      channels: {borough: "borough"},
      tip: true
    })
  ]
})
```

```js echo
const london = topojson.feature(await FileAttachment("/data/london.json").json(), "boroughs");
const boroughs = new Map(london.features.map((d) => [d.id, d]));
const access = (
    await FileAttachment("/data/london-car-access.csv").csv({typed: true})
  )
  .flatMap(({borough, y2001, y2011, y2021}) => [
    {borough, year: "2001", access: y2001},
    {borough, year: "2011", access: y2011},
    {borough, year: "2021", access: y2021}
  ]);
```
