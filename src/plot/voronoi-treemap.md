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

```js
display(chart)
```

---

Imports the voronoi-treemap code:

```js echo
import {voronoiTreemap} from "npm:d3-voronoi-treemap@1"
```

Loads the data, which describes the hierarchy of the “flare” software package,
with a value indicating the total number of lines of code in each of the source
files:

```js
display(flare)
```

```js echo
const flare = FileAttachment("/data/flare.json").json()
```

Creates a polygon outline which will contain the chart. Depending on the number
of sides you selected at the top, this will be a square, pentagon, etc. For a
circle we just create a 100-sides regular polygon. The polygon is described in
abstract coordinates (with _x_ and _y_ in [-1, 1]); this will be scaled by Plot.

```js echo
const outline = d3.range(-0.5 / sides, 1, 1 / sides).map(i => [
  Math.sin(i * 2 * Math.PI),
  -Math.cos(i * 2 * Math.PI)
]);
```

Computes a [hierarchy](https://d3js.org/d3-hierarchy) from the data and passes
it to d3-voronoi-treemap, which tacks the nested polygons as properties on each
node of the hierarchy. We transform the polygons into GeoJSON shapes, to make
them easier to draw with [Plot.geo](https://observablehq.com/plot/marks/geo). At
the same time, we identify their category (_i.e._ the branch from which they
stem), to use as a fill color.

```js
display(data)
```

```js echo
const data = d3.hierarchy(flare).sum((d) => d.value);

voronoiTreemap()
    .clip(outline)
    .prng(d3.randomLcg(42))
  (data);

for (const shape of data.descendants()) {
  const p = shape.polygon;
  shape.geometry = ({type: "LineString", coordinates: [...p, p[0]]})
  let s = shape;
  while (s.parent && s.parent.depth) s = s.parent;
  shape.category = s.data.name;
}
```

Creates the chart with a variable stroke width that depends on each node’s
position in the hierarchy. The categories are sorted by descending total value.

```js echo
const chart = Plot.plot({
  aspectRatio: 1,
  inset: 3,
  axis: null,
  color: {
    domain: d3.sort(data.children, d => d.value).map(d => d.data.name).reverse(),
    legend: true
  },
  marks: [
    Plot.geo(data.leaves(), {
      geometry: "geometry",
      fill: "category",
      fillOpacity: stainedGlass ? ((d, i) => (5 + Math.cos(2 * i)) / 6) : 0.8,
    }),
    Plot.geo(data.descendants(), {
      geometry: "geometry",
      strokeWidth: d =>  5 / (1 + d.depth)
    }),
    Plot.tip(data.leaves(), Plot.pointer(Plot.centroid({
      geometry: "geometry",
      fill: "category",
      channels: {
        text: d => d.data.name,
        value: "value"
      }
    })))
  ]
});
```
