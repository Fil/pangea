---
source: https://blocks.roadtolarissa.com/mbostock/1093130
author: Mike Bostock
index: true
---

# Collapsible force layout

This chart displays a hierarchical dataset where nodes can be expanded or collapsed by clicking, revealing or hiding their child nodes. The graph is interactive, allowing users to drag nodes and observe the force-directed layout adjusting in real-time.

```js echo
const width = 960;
const height = 500;

const svg = d3
  .create("svg")
  .attr("viewBox", [-width / 2, -height / 2, width, height])
  .attr("width", width)
  .attr("height", height);

display(svg.node());

const simulation = d3
  .forceSimulation(nodes)
  .force("link", d3.forceLink(links).distance(80))
  .force("repulse", d3.forceManyBody().strength(-120))
  .force("center", d3.forceCenter())
  .on("tick", tick);

const link = svg.append("g").selectAll(".link").data(links).join("line").attr("class", "link");

const node = svg
  .append("g")
  .selectAll(".node")
  .data(nodes)
  .join("g")
  .attr("class", "node")
  .on("click", click) // todo disambiguate with drag
  .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

node
  .append("circle")
  .attr("r", (d) => Math.sqrt(d.data.value) / 4 || 12)
  .style("fill", color);

node
  .append("text")
  .attr("dy", ".35em")
  .text((d) => d.data.name);

node.attr("opacity", 0).transition().attr("opacity", 1);

function tick() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("transform", (d) => `translate(${d.x},${d.y})`);
}

function color(d) {
  return d._children
    ? "#3182bd" // collapsed package
    : d.children
    ? "#c6dbef" // expanded package
    : "#fd8d3c"; // leaf node
}

// Toggle children on click.
function hide(node) {
  node.hidden = true;
  node.children?.forEach(hide);
}

function show(node) {
  delete node.hidden;
  node.children?.forEach(show);
}

function click(event, d) {
  if (d.children) {
    d.children.forEach(hide);
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d.children?.forEach(show);
    d._children = null;
  }

  node.transition().attr("opacity", (d) => (d.hidden ? 0 : 1));
  link.transition().attr("opacity", (d) => (d.target.hidden ? 0 : 1));
  simulation.nodes(nodes.filter((d) => !d.hidden));
  node.selectAll("circle").style("fill", color);

  simulation.alphaTarget(0.3).restart();
}

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

// When this cell is re-run, stop the previous simulation. (This doesn’t
// really matter since the target alpha is zero and the simulation will
// stop naturally, but it’s a good practice.)
invalidation.then(() => simulation.stop());
```


```html echo
<style>

.node {
  cursor: pointer;
}

.node circle {
  stroke: #3182bd;
  stroke-width: 1.5px;
}

.node text {
  font: 10px sans-serif;
  user-select:none;
  text-anchor: middle;
  fill: var(--theme-foreground);
  stroke: var(--theme-background);
  stroke-width: 4px;
  paint-order: stroke;
}

line.link {
  fill: none;
  stroke: #9ecae1;
  stroke-width: 1.5px;
}

</style>
```

## The data

Note that the visualization mutates the nodes by adding _e.g._ position and speed information.

```js
display({nodes, links});
```

```js echo
const {nodes, links} = await FileAttachment("/data/flare.json")
  .json()
  .then((root) => {
    root.children.splice(1, 10); // remove all branches but one
    root = d3.hierarchy(root).sum((d) => d.value);
    return {nodes: root.descendants(), links: root.links()};
  });
```
