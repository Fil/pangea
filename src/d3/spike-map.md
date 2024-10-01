---
source: https://observablehq.com/@d3/spike-map/2
index: true
---

# Spike map

Estimated population by county, 2016. Data: [American Community Survey](https://api.census.gov/data/2016/acs/acs5/cprofile/examples.html)

```js echo
// Join the geographic shapes and the population data.
const data = population.map((d) => ({
  ...d,
  county: countymap.get(d.fips),
  state: statemap.get(d.state)
}))
  .filter(d => d.county)
  .sort((a, b) => d3.descending(a.population, b.population));

// Construct the length scale.
const length = d3.scaleLinear([0, d3.max(data, d => d.population)], [0, 200]);

// Construct a path generator.
const path = d3.geoPath();

// Create the SVG container. Its dimensions correspond to the bounding-box
// of the pre-projected US shapefile.
const svg = d3.create("svg")
    .attr("width", 975)
    .attr("height", 610)
    .attr("viewBox", [0, 0, 975, 610])
    .attr("style", "width: 100%; height: auto; height: intrinsic;");

// Create the cartographic background layers.
svg.append("path")
    .datum(topojson.feature(us, us.objects.nation))
    .attr("fill", "#ddd")
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

// Create the legend.
const legend = svg.append("g")
    .attr("fill", "#777")
    .attr("transform", "translate(886,592)")
    .attr("text-anchor", "middle")
    .style("font", "10px sans-serif")
  .selectAll()
    .data(length.ticks(4).slice(1))
  .join("g")
    .attr("transform", (d, i) => `translate(${20 * i},0)`);

legend.append("path")
    .attr("fill", "red")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "red")
    .attr("stroke-width", 0.5)
    .attr("d", d => spike(length(d)));

legend.append("text")
    .attr("dy", "1em")
    .text(length.tickFormat(4, "s"));

// Add a spike for each county, with a title (tooltip).
const format = d3.format(",.0f");
svg.append("g")
    .attr("fill", "red")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "red")
    .attr("stroke-width", 0.5)
  .selectAll()
  .data(data)
  .join("path")
    .attr("transform", d => `translate(${centroid(d.county)})`)
    .attr("d", d => spike(length(d.population)))
  .append("title")
    .text(d => `${d.county.properties.name}, ${d.state.properties.name}
${format(d.population)}`);

  display(svg.node());
```

This dataset comes from the U.S. Census API and contains three columns: the estimated population (as a string), the two-digit state FIPS code, and the three-digit county FIPS code.

```js echo
const population = FileAttachment("/data/population.json")
  .json()
  .then((data) =>
    data
      .slice(1) // removes a header line
      .map(([p, state, county]) => ({
        state,
        fips: `${state}${county}`,
        population: +p
      }))
  );
```

Since this dataset doesn’t include the positions of the counties, this _centroid_ helper method is used. It takes a (already projected) GeoJSON feature as input and returns the corresponding centroid.

```js echo
const path = d3.geoPath();
const centroid = (feature) => path.centroid(feature);
```

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The _counties_ feature collection is all U.S. counties, using the five-digit FIPS identifier. The _statemap_ lets us lookup the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers. Similarly, the _countymap_ lets us lookup the name and geometry of each county.

```js echo
const us = fetch(import.meta.resolve("npm:us-atlas/counties-albers-10m.json")).then((response) => response.json());
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

The spike function creates a triangular path of the given length (height) with a base width of 7 pixels.

```js echo
const spike = (length, width = 7) => `M${-width / 2},0L0,${-length}L${width / 2},0`;
```

Using [Observable Plot](https://observableh.com/plot/)’s concise API, a similar map can be produced with a few lines of code (see also the complete [Plot: U.S. spike map example](https://observablehq.com/@observablehq/plot-spike-map)).

```js echo
Plot.plot({
  width: 975,
  projection: "identity",
  length: {range: [0, 200]},
  marks: [
    Plot.geo(nation, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.geo(statemesh, {stroke: "currentColor"}),
    Plot.spike(
      population,
      Plot.centroid({
        length: "population",
        geometry: ({fips}) => countymap.get(fips)
      })
    )
  ]
})
```
