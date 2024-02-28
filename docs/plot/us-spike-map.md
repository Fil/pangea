---
source: https://observablehq.com/@observablehq/plot-spike
index: true
---

# Spike map

The [spike](https://observablehq.com/plot/marks/vector#spike-data-options) mark is a vector with default values that allows us to quickly create this map of the estimated US population by county in 2016. Data: [American Community Survey](https://api.census.gov/data/2016/acs/acs5/cprofile/examples.html)

```js echo
const map = Plot.plot({
  projection: "identity",
  width: 975,
  length: {range: [0, 200]},
  marks: [
    Plot.geo(nation, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.geo(statemesh, {stroke: "var(--plot-background)"}),
    Plot.spike(counties.features, Plot.centroid({stroke: "red", length: (d) => population.get(d.id)})),
    legendSpike([2e6, 4e6, 6e6, 8e6, 10e6], {stroke: "red"})
  ]
});

display(map);
```

This custom legendSpike composite mark draws the legend on the right-hand side:

```js echo
function legendSpike(values, {frameAnchor = "bottom-right", format = "~s", stroke} = {}) {
  if (!Array.isArray(values)) values = Array.from(values);
  if (typeof format !== "function") format = d3.format(format);
  return Plot.marks(
    values.map((v, i) => {
      const dx = (i - values.length) * 18;
      return [
        Plot.spike([v], {
          length: [v],
          dx,
          dy: -20,
          frameAnchor,
          stroke
        }),
        Plot.text([v], {
          text: [format(v)],
          dx,
          dy: -10,
          frameAnchor,
          textAnchor: "middle"
        })
      ];
    })
  );
}
```

We get the population data from a CSV file; we process it into a JavaScript Map for fast lookups. The key is the FIPS code (state and county codes, concatenated into a string), and value is the population coerced to a number.

```js echo
const population = FileAttachment("../data/population.csv")
  .csv()
  .then((data) => new Map(data.map(({state, county, population}) => [`${state}${county}`, +population])));
```

The dataset doesn’t include the positions of the counties, so we call Plot’s _centroid_ helper method to derive centroids from the GeoJSON features.

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The _counties_ feature collection is all U.S. counties, using the five-digit FIPS identifier. The _statemap_ lets us look up the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers. Since the shapes have already been projected to screen coordinates, we use the _identity_ projection.

```js echo
const us = FileAttachment("../data/counties-albers-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const statemap = new Map(topojson.feature(us, us.objects.states).features.map((d) => [d.id, d]));
const counties = topojson.feature(us, us.objects.counties);
```

The _statemesh_ contains the internal borders between states, _i.e._, everything but the coastlines and country borders. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets.

```js echo
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
```
