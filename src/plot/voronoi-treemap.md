---
index: true
---

# Voronoi treemap

Franck Lebeau’s [voronoi treemap](https://github.com/Kcnarf/d3-voronoi-treemap) method partitions a given convex polygon according to a hierarchy, with an area proportional to the value of each node. This is similar to a classic [treemap](/d3/treemap), with more organic-looking shapes.

```js
const sides = view(Inputs.select(new Map([
  ["circle", 100],
  ["square", 4],
  ["pentagon", 5],
  ["hexagon", 6],
  ["octogon", 8]
]), {label: "polygon"}));
const stainedGlass = view(Inputs.toggle({label: "stained glass", value: true}));
```

```js echo
const data = d3.hierarchy(flare).sum((d) => d.value);

voronoiTreemap()
    .clip(outline)
    .prng(d3.randomLcg(42))
  (data);

display(
  Plot.plot({
    aspectRatio: 1,
    inset: 3,
    axis: null,
    color: {
      label: "category",
      domain: d3.sort(data.children, d => -d.value).map(d => d.data.name),
      legend: true
    },
    marks: [
      Plot.geo(data.leaves(), {
        geometry: ({polygon: l}) => ({
          type: "LineString",
          coordinates: [...l, l[0]]
        }),
        fill: (d) => {
          while (d.parent && d.parent.depth) d = d.parent;
          return d.data.name;
        },
        fillOpacity: stainedGlass ? ((d, i) => (5 + Math.cos(2 * i)) / 6) : 0.8,
      }),
      Plot.geo(data.descendants(), {
        geometry: ({polygon: l}) => ({
          type: "LineString",
          coordinates: [...l, l[0]]
        }),
        strokeWidth: d =>  5 / (1 + d.depth),
        stroke: "currentColor"
      }),
      Plot.tip(data.leaves(), Plot.pointer(Plot.centroid({
        geometry: ({polygon: l}) => ({
          type: "LineString",
          coordinates: [...l, l[0]]
        }),
        fill: (d) => {
          while (d.parent && d.parent.depth) d = d.parent;
          return d.data.name;
        },
        channels: {
          text: d => d.data.name,
          value: d => d.value
        }
      })))
    ]
  })
);
```

```js echo
const flare = FileAttachment("../data/flare.json").json()
```

```js echo
import {voronoiTreemap} from "npm:d3-voronoi-treemap"
```

```js echo
const outline = d3.range(-0.5 / sides, 1, 1 / sides).map(i => [
  Math.sin(i * 2 * Math.PI),
  -Math.cos(i * 2 * Math.PI)
]);
```
