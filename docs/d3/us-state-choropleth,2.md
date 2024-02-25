<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">U.S. state choropleth</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# U.S. state choropleth

Unemployment rate by state, July 2019. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables)

```js echo
chart = {
  const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
  const path = d3.geoPath();
  const format = d => `${d}%`;
  const valuemap = new Map(unemployment.map(d => [namemap.get(d.name), d.rate]));

  // The counties feature collection is all U.S. counties, each with a
  // five-digit FIPS identifier. The statemap lets us lookup the name of 
  // the state that contains a given county; a state’s two-digit identifier
  // corresponds to the first two digits of its counties’ identifiers.
  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map(d => [d.id, d]));

  // The statemesh is just the internal borders between states, i.e.,
  // everything but the coastlines and country borders. This avoids an
  // additional stroke on the perimeter of the map, which would otherwise
  // mask intricate features such as islands and inlets. (Try removing
  // the last argument to topojson.mesh below to see the effect.)
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  const svg = d3.create("svg")
      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => Legend(color, {title: "Unemployment rate (%)", width: 260}));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .attr("fill", d => color(valuemap.get(d.id)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}\n${valuemap.get(d.id)}%`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}
```

```js echo
unemployment = FileAttachment("unemployment201907.csv").csv({typed: true})
```

This dataset regrettably doesn’t include FIPS numeric identifiers for states; it only has state names. This map lets us look up the FIPS code for a state by name.

```js echo
namemap = new Map(us.objects.states.geometries.map(d => [d.properties.name, d.id]))
```

The TopoJSON file below contains shapes and properties for all U.S. States, pre-projected with the Albers USA to a bounding box of 975&times;610 pixels.

```js echo
us = FileAttachment("counties-albers-10m.json").json()
```

```js echo
import {Legend} from "@d3/color-legend"
```

Alternatively, use [Observable Plot](https://observablehq.com/plot)’s concise API to create [maps](https://observablehq.com/@observablehq/plot-mapping) with the [geo mark](https://observablehq.com/plot/marks/geo). Again, we index the data for faster access:

```js echo
valuemap = new Map(unemployment.map(d => [d.name, d.rate]))
```

```js echo
Plot.plot({
  projection: "identity",
  width: 975,
  height: 610,
  color: {scheme: "Blues", type: "quantize", n: 9, domain: [1, 10], label: "Unemployment rate (%)", legend: true},
  marks: [
    Plot.geo(topojson.feature(us, us.objects.states), Plot.centroid({
      fill: d => valuemap.get(d.properties.name),
      title: d => `${d.properties.name}\n${valuemap.get(d.properties.name)}%`,
      tip: true
    })),
    Plot.geo(topojson.mesh(us, us.objects.states, (a, b) => a !== b), {stroke: "white"})
 ]
})
```
