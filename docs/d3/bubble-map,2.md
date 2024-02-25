---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bubble map</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Bubble map

Estimated population by county, 2016. See also the [spike map](/@d3/spike-map) as an alternative presentation of this data. Data: [American Community Survey](https://api.census.gov/data/2016/acs/acs5/cprofile/examples.html)

```js echo
const chart = {

  // Join the geographic shapes and the population data.
  const data = population.map((d) => ({
    ...d,
    county: countymap.get(d.fips),
    state: statemap.get(d.state)
  }))
    .filter(d => d.county)
    .sort((a, b) => d3.descending(a.population, b.population));

  // Construct the radius scale.
  const radius = d3.scaleSqrt([0, d3.max(data, d => d.population)], [0, 40]);

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
      .attr("transform", "translate(915,608)")
      .attr("text-anchor", "middle")
      .style("font", "10px sans-serif")
    .selectAll()
      .data(radius.ticks(4).slice(1))
    .join("g");

  legend.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("cy", d => -radius(d))
      .attr("r", radius);

  legend.append("text")
      .attr("y", d => -2 * radius(d))
      .attr("dy", "1.3em")
      .text(radius.tickFormat(4, "s"));

  // Add a circle for each county, with a title (tooltip).
  const format = d3.format(",.0f");
  svg.append("g")
      .attr("fill", "brown")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
    .selectAll()
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${centroid(d.county)})`)
      .attr("r", d => radius(d.population))
    .append("title")
      .text(d => `${d.county.properties.name}, ${d.state.properties.name}
${format(d.population)}`);

  return svg.node();
}
```

This dataset comes from the U.S. Census API and contains three columns: the estimated population (as a string), the two-digit state FIPS code, and the three-digit county FIPS code.

```js echo
const population = FileAttachment("population.json")
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
const centroid = {
  const path = d3.geoPath();
  return feature => path.centroid(feature);
}
```

The geometries used in this example are from the [TopoJSON U.S. Atlas](https://github.com/topojson/us-atlas), which are derived from the U.S. Census Bureau shapefiles. (There’s also the [TopoJSON World Atlas](https://github.com/topojson/world-atlas), which is derived from [Natural Earth](https://www.naturalearthdata.com).) The _counties_ feature collection is all U.S. counties, using the five-digit FIPS identifier. The _statemap_ lets us lookup the name of the state that contains a given county; a state’s two-digit identifier corresponds to the first two digits of its counties’ identifiers. Similarly, the _countymap_ lets us lookup the name and geometry of each county.

```js echo
const us = FileAttachment("counties-albers-10m.json").json();
```

```js echo
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const statemap = new Map(topojson.feature(us, us.objects.states).features.map((d) => [d.id, d]));
```

```js echo
const countymap = new Map(topojson.feature(us, us.objects.counties).features.map((d) => [d.id, d]));
```

The _statemesh_ is just the internal borders between states, _i.e._, everything but the coastlines and country borders. This avoids an additional stroke on the perimeter of the map, which would otherwise mask intricate features such as islands and inlets. (Try removing the last argument to topojson.mesh below to see the effect.)

```js echo
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
```

Using [Observable Plot](/plot/)’s concise API, a similar map can be produced with a few lines of code (see also the complete [Plot: U.S. bubble map example](/@observablehq/plot-us-bubble-map)).

```js echo
Plot.plot({
  width: 975,
  projection: "identity",
  marks: [
    Plot.geo(nation, {fill: "#eee"}),
    Plot.geo(statemesh, {stroke: "white"}),
    Plot.dot(
      population,
      Plot.centroid({
        r: "population",
        geometry: ({fips}) => countymap.get(fips)
      })
    )
  ]
});
```
