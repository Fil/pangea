---
source: https://observablehq.com/@d3/choropleth/2
index: true
---

# Choropleth

Unemployment rate by U.S. county, August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables). See the [Plot version](../plot/choropleth) for a more concise code.

```js echo
const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
const path = d3.geoPath();
const format = (d) => `${d}%`;
const valuemap = new Map(data.map((d) => [d.id, d.rate]));

// The counties feature collection is all U.S. counties, each with a
// five-digit FIPS identifier. The statemap lets us lookup the name of
// the state that contains a given county; a state’s two-digit identifier
// corresponds to the first two digits of its counties’ identifiers.
const counties = topojson.feature(us, us.objects.counties);
const states = topojson.feature(us, us.objects.states);
const statemap = new Map(states.features.map((d) => [d.id, d]));

// The statemesh is just the internal borders between states, i.e.,
// everything but the coastlines and country borders. This avoids an
// additional stroke on the perimeter of the map, which would otherwise
// mask intricate features such as islands and inlets. (Try removing
// the last argument to topojson.mesh below to see the effect.)
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

const svg = d3
  .create("svg")
  .attr("width", 975)
  .attr("height", 610)
  .attr("viewBox", [0, 0, 975, 610])
  .attr("style", "max-width: 100%; height: auto;");

svg
  .append("g")
  .attr("transform", "translate(610,20)")
  .append(() => Legend(color, {title: "Unemployment rate (%)", width: 260}));

svg
  .append("g")
  .selectAll("path")
  .data(topojson.feature(us, us.objects.counties).features)
  .join("path")
  .attr("fill", (d) => color(valuemap.get(d.id)))
  .attr("d", path)
  .append("title")
  .text((d) => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n${valuemap.get(d.id)}%`);

svg
  .append("path")
  .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
  .attr("fill", "none")
  .attr("stroke", "white")
  .attr("stroke-linejoin", "round")
  .attr("d", path);

display(svg.node());
```

We don’t use automatic type inference (`{typed: true}`) as that would coerce the FIPS identifiers to numbers, which then wouldn’t match the identifiers in our GeoJSON. However, we still want to coerce the _rate_ values to numbers, so we do that explicitly.

```js echo
const data = (await FileAttachment("../data/unemployment-by-county.csv").csv()).map((d) => ((d.rate = +d.rate), d));
```

```js echo
const us = FileAttachment("../data/counties-albers-10m.json").json(); // https://github.com/topojson/us-atlas
```

```js echo
import {Legend} from "../components/color-legend.js";
```
