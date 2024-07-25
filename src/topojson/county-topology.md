---
source: https://observablehq.com/@mbostock/county-topology
index: true
author: Mike Bostock
---

# County Topology

U.S. counties that share a border are connected by an arc between their centroids.

```js
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610]);

  svg.append("path")
      .attr("fill", dark ? "#555" : "#ddd")
      .attr("d", path(features));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "var(--theme-background)")
      .attr("stroke-linejoin", "round")
      .attr("d", path(borders));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-linejoin", "round")
      .attr("d", path({
        type: "MultiLineString",
        coordinates: d3.merge(neighbors.map((n, i) => n.map(j => [centroids[j], centroids[i]])))
      }));

display(svg.node());
```

```js
const path = d3.geoPath();
const us = await fetch(import.meta.resolve("npm:us-atlas/counties-albers-10m.json")).then((response) => response.json());
const features = topojson.feature(us, us.objects.counties);
const neighbors = topojson.neighbors(us.objects.counties.geometries);
const centroids = features.features.map(path.centroid, path);
const borders = topojson.mesh(us, us.objects.counties, (a, b) => a !== b);
```
