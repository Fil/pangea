---
source: https://observablehq.com/@d3/radial-cluster/2
index: true
---

# Radial cluster tree

D3’s [cluster layout](https://d3js.org/d3-hierarchy/cluster) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](./radial-tree), but are useful for dendrograms, hierarchical clustering and [phylogenetic trees](./tree-of-life). See also the [Cartesian variant](./cluster).

```js echo
// Specify the chart’s dimensions.
const width = 928;
const height = width;
const cx = width * 0.5; // adjust as needed to fit
const cy = height * 0.54; // adjust as needed to fit
const radius = Math.min(width, height) / 2 - 80;

// Create a radial cluster layout. The layout’s first dimension (x)
// is the angle, while the second (y) is the radius.
const tree = d3
  .cluster()
  .size([2 * Math.PI, radius])
  .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

// Sort the tree and apply the layout.
const root = tree(d3.hierarchy(data).sort((a, b) => d3.ascending(a.data.name, b.data.name)));

// Creates the SVG container.
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-cx, -cy, width, height])
  .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

// Append links.
svg
  .append("g")
  .attr("fill", "none")
  .attr("stroke", "#555")
  .attr("stroke-opacity", 0.4)
  .attr("stroke-width", 1.5)
  .selectAll()
  .data(root.links())
  .join("path")
  .attr(
    "d",
    d3
      .linkRadial()
      .angle((d) => d.x)
      .radius((d) => d.y)
  );

// Append nodes.
svg
  .append("g")
  .selectAll()
  .data(root.descendants())
  .join("circle")
  .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
  .attr("fill", (d) => (d.children ? "var(--theme-foreground-muted)" : "var(--theme-foreground-fainter)"))
  .attr("r", 2.5);

// Append labels.
svg
  .append("g")
  .attr("stroke-linejoin", "round")
  .attr("stroke-width", 3)
  .selectAll()
  .data(root.descendants())
  .join("text")
  .attr(
    "transform",
    (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`
  )
  .attr("dy", "0.31em")
  .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
  .attr("text-anchor", (d) => (d.x < Math.PI === !d.children ? "start" : "end"))
  .attr("paint-order", "stroke")
  .attr("stroke", "var(--theme-background)")
  .attr("fill", "currentColor")
  .text((d) => d.data.name);

display(svg.node());
```

```js echo
const data = FileAttachment("../data/flare.json").json();
```
