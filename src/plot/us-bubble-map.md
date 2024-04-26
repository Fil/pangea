---
source: https://observablehq.com/@observablehq/plot-us-bubble-map
index: true
---

# U.S. bubble map

Estimated population by county, 2016. See also the [spike map](./spike) as an alternative presentation of this data. Data: [American Community Survey](https://api.census.gov/data/2016/acs/acs5/cprofile/examples.html)

```js echo
const chart = Plot.plot({
  width: 975,
  projection: "identity",
  r: {range: [0, 40]},
  marks: [
    Plot.geo(nation, {fill: "var(--theme-foreground-faintest)"}),
    Plot.geo(statemesh, {stroke: "var(--plot-background)"}),
    Plot.dot(
      population,
      Plot.centroid({
        r: "population",
        fill: "brown",
        fillOpacity: 0.5,
        stroke: "white",
        strokeOpacity: 0.5,
        geometry: ({state, county}) => countymap.get(`${state}${county}`),
        channels: {
          county: ({state, county}) => countymap.get(`${state}${county}`)?.properties.name,
          state: ({state}) => statemap.get(state)?.properties.name
        },
        tip: true
      })
    ),

    // Legend helper
    radiusLegend([2, 5, 10], {r: (d) => d * 1e6, title: (d) => `${d}M`})
  ]
});

display(chart);
```

This dataset comes from the U.S. Census API and contains three columns: the estimated population (as a string), the two-digit state FIPS code, and the three-digit county FIPS code.

```js echo
const population = FileAttachment("../data/population.csv").csv();
```

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The _counties_ feature collection is all U.S. counties, using the five-digit FIPS identifier. The _statemap_ lets us lookup the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers. Similarly, the _countymap_ lets us lookup the name and geometry of each county.

```js echo
const us = FileAttachment("../data/counties-albers-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
const statemap = new Map(topojson.feature(us, us.objects.states).features.map((d) => [d.id, d]));
const countymap = new Map(topojson.feature(us, us.objects.counties).features.map((d) => [d.id, d]));
```

The _statemesh_ is just the internal borders between states, _i.e._, everything but the coastlines and country borders. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets. (Try removing the last argument to topojson.mesh below to see the effect.)

```js echo
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
```

Plot does not yet have an official radius legend (please vote up [#236](https://github.com/observablehq/plot/issues/236)!). In the meantime, here is a helper:

```js echo
const radiusLegend = (data, options) =>
  Plot.dot(data, {
    ...options,
    frameAnchor: "bottom-right",
    strokeWidth: 0.8,
    dx: -40,
    dy: -3,
    render: (i, s, v, d, c, next) => {
      const g = next(i, s, v, d, c);
      d3.select(g)
        .selectAll("circle")
        .each(function (i) {
          const r = +this.getAttribute("r");
          const x = +this.getAttribute("cx");
          const y = +this.getAttribute("cy");
          this.setAttribute("transform", `translate(0,${-r})`);
          const title = d3.select(this).select("title");
          d3.select(g)
            .append("text")
            .attr("x", x)
            .attr("y", y - 2 * r - 4)
            .attr("stroke", "none")
            .attr("fill", "currentColor")
            .text(title.text());
          title.remove();
        });
      return g;
    }
  });
```
