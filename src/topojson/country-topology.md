---
source: https://observablehq.com/@mbostock/country-topology
index: true
author: Mike Bostock
---

# Country Topology

In this map, countries that share a land border are connected by an arc between their centroids. The arcs might be different than you expect because some countries have distant territories, such as [France](https://en.wikipedia.org/wiki/France) and [French Guiana](https://en.wikipedia.org/wiki/French_Guiana).


```js
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("pointer-events", "none");

  svg.append("style").text(`
.features path { fill: ${dark ? "#777" : "#ddd"}; pointer-events: all; }
.features path:hover { fill: #f00; }
`);

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", path(graticule));

  svg.append("g")
      .attr("class", "features")
    .selectAll("path")
    .data(features)
    .join("path")
      .attr("d", path)
    .append("title")
      .text(d => d.properties.name);

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "var(--theme-background)")
      .attr("d", path(borders));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-linejoin", "round")
      .attr("d", path({
        type: "MultiLineString",
        coordinates: d3.merge(neighbors.map((n, i) => n.map(j => [centroids[j], centroids[i]])))
      }));

  svg.append("path")
      .attr("fill", "currentColor")
      .attr("d", path({
        type: "MultiPoint",
        coordinates: centroids
      }));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("d", path({type: "Sphere"}));

display(svg.node());
```

```js
import {geoMiller} from "npm:d3-geo-projection";
const projection = geoMiller();
const path = d3.geoPath(projection).pointRadius(2);

  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, {type: "Sphere"})).bounds({type: "Sphere"});
  const height = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), height);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);


const graticule = d3.geoGraticule10();

const world = await fetch(import.meta.resolve("npm:visionscarto-world-atlas@1.0.0/world/50m.json")).then((response) => response.json());
const features = topojson.feature(world, world.objects.countries).features;
const neighbors = topojson.neighbors(world.objects.countries.geometries);
const centroids = features.map(d => d3.geoCentroid(d));
const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
```

