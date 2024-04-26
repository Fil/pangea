---
source: https://observablehq.com/@d3/cluster/2
index: true
---

# Cluster tree

D3’s [cluster layout](https://d3js.org/d3-hierarchy/cluster) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](./tree), but are useful for dendrograms, hierarchical clustering, and [phylogenetic trees](./tree-of-life). See also the [radial variant](./radial-cluster).

```js echo
const width = 928;

// Compute the tree height; this approach will allow the height of the
// SVG to scale according to the breadth (width) of the tree layout.
const root = d3.hierarchy(data);
const dx = 10;
const dy = width / (root.height + 1);

// Create a tree layout.
const tree = d3.cluster().nodeSize([dx, dy]);

// Sort the tree and apply the layout.
root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
tree(root);

// Compute the extent of the tree. Note that x and y are swapped here
// because in the tree layout, x is the breadth, but when displayed, the
// tree extends right rather than down.
let x0 = Infinity;
let x1 = -x0;
root.each((d) => {
  if (d.x > x1) x1 = d.x;
  if (d.x < x0) x0 = d.x;
});

// Compute the adjusted height of the tree.
const height = x1 - x0 + dx * 2;

const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-dy / 3, x0 - dx, width, height])
  .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

const link = svg
  .append("g")
  .attr("fill", "none")
  .attr("stroke", "var(--theme-foreground-muted)")
  .attr("stroke-opacity", 0.4)
  .attr("stroke-width", 1.5)
  .selectAll()
  .data(root.links())
  .join("path")
  .attr(
    "d",
    d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x)
  );

const node = svg
  .append("g")
  .attr("stroke-linejoin", "round")
  .attr("stroke-width", 3)
  .selectAll()
  .data(root.descendants())
  .join("g")
  .attr("transform", (d) => `translate(${d.y},${d.x})`);

node
  .append("circle")
  .attr("fill", (d) => (d.children ? "var(--theme-foreground-muted)" : "var(--theme-foreground-fainter)"))
  .attr("r", 2.5);

node
  .append("text")
  .attr("dy", "0.31em")
  .attr("x", (d) => (d.children ? -6 : 6))
  .attr("text-anchor", (d) => (d.children ? "end" : "start"))
  .text((d) => d.data.name)
  .attr("stroke", "var(--theme-background)")
  .attr("fill", "currentColor")
  .attr("paint-order", "stroke");

display(svg.node());
```

Using [Observable Plot](/plot/)’s concise API, this chart can simply be written as:

```js echo
display(
  Plot.plot({
    axis: null,
    margin: 10,
    marginLeft: 40,
    marginRight: 160,
    width: 928,
    height: 2500,
    marks: [Plot.cluster(flare, {path: "name", delimiter: "."})]
  })
);
```

```js echo
const data = FileAttachment("../data/flare.json").json();
```
