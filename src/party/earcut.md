---
index: true
---

# Hello, earcut

[earcut](https://github.com/mapbox/earcut/) is “the fastest and smallest JavaScript polygon triangulation library for your WebGL apps”.

```js echo
import earcut, {flatten, deviation} from "npm:earcut@3";
```

The **flatten** utility reads a GeoJSON polygon and returns the flat coordinates that the main **earcut** function consumes:

```js echo
const {vertices, holes, dimensions} = flatten(AUS.geometry.coordinates[0]);
const triangles = earcut(vertices, holes, dimensions);
```

```js
Plot.plot({
  projection: {type: "mercator", domain: AUS},
  marks: [
    Plot.geo(AUS),
    Plot.line(triangles, {
      z: (_, i) => (i / 3) | 0,
      x: (d) => vertices[dimensions * d],
      y: (d) => vertices[dimensions * d + 1],
      stroke: "currentColor",
      strokeWidth: 0.25,
      curve: "linear-closed"
    }),
    Plot.text({length: triangles.length / 3}, {
      text: (_, i) => i,
      x: (_, i) => (vertices[dimensions * triangles[3 * i]] + vertices[dimensions * triangles[3 * i + 1]] + vertices[dimensions * triangles[3 * i + 2]]) / 3,
      y: (_, i) => (vertices[dimensions * triangles[3 * i] + 1] + vertices[dimensions * triangles[3 * i + 1] + 1] + vertices[dimensions * triangles[3 * i + 2] + 1]) / 3,
      stroke: "var(--plot-background)",
      fill: "currentColor"
    })
  ]
})
```


The **deviation** utility measures the quality of the triangulation (the lower the better):

```js echo
deviation(vertices, holes, dimensions, triangles)
```

The map above is missing Tasmania. To deal with MultiPolygons, we have to apply earcut to each polygon in turn, and concatenate the results:

```js echo
const V = [];
const T = [];
for (const polygon of AUS.geometry.coordinates) {
  const {vertices, holes, dimensions} = flatten(polygon);
  const triangles = earcut(vertices, holes, dimensions);
  T.push(...triangles.map(d => d + V.length / 2));
  V.push(...vertices);
}
```

```js
Plot.plot({
  projection: {type: "mercator", domain: AUS},
  marks: [
    Plot.geo(AUS),
    Plot.line(T, {
      z: (_, i) => (i / 3) | 0,
      x: (d) => V[dimensions * d],
      y: (d) => V[dimensions * d + 1],
      stroke: "currentColor",
      strokeWidth: 0.25,
      curve: "linear-closed"
    })
  ]
})
```

An additional difficulty when dealing with geographic coordinates comes from clipping. To make this work we must first project the geometry, apply earcut, then either invert the coordinates back to longitudes and latitudes in degrees (see the commented-out code below), or continue working with the projected geometry and an **identity** projection (for better performance).

```js echo
const V2 = [];
const T2 = [];
const projection = geoBertin1953();
const projectedLand = geoProject(land, projection).features[0];
for (const polygon of projectedLand.geometry.coordinates) {
  const {vertices, holes, dimensions} = flatten(polygon);
  const triangles = earcut(vertices, holes, dimensions);
  T2.push(...triangles.map(d => d + V2.length / 2));
  V2.push(...vertices);
}
// for (let i = 0; i < V2.length; i += 2)
//   [V2[i], V2[i + 1]] = projection.invert([V2[i], V2[i + 1]]);
```

```js
Plot.plot({
  projection: {type: "identity", domain: projectedLand},
  marks: [
    Plot.geo(projectedLand),
    Plot.line(T2, {
      z: (_, i) => (i / 3) | 0,
      x: (d) => V2[dimensions * d],
      y: (d) => V2[dimensions * d + 1],
      stroke: "currentColor",
      strokeWidth: 0.25,
      curve: "linear-closed"
    })
  ]
})
```

```js echo
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = await fetch(topo).then((response) => response.json());
const AUS = topojson.feature(world, world.objects.countries).features.find(d => d.properties.name === "Australia");
const land = topojson.feature(world, world.objects.land);
```

```js echo
import {geoBertin1953, geoProject} from "npm:d3-geo-projection@4";
```
