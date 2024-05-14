---
index: true
source: https://observablehq.com/@d3/random-tree
---

# Random Tree

This [tidy tree](./tidy-tree) periodically adds a child to a random node.

```js echo
const svg = d3.create("svg").attr("viewBox", [-10, -10, width, height]);
const root = new Node();
const nodes = [root];
const links = [];

tree(root);

let link = svg.append("g").attr("fill", "none").attr("stroke", "currentColor").selectAll(".link");

let node = svg.append("g").attr("stroke", "var(--theme-background)").attr("stroke-width", 2).selectAll(".node");

const interval = d3.interval(() => {
  if (nodes.length >= 500) return interval.stop();

  // Add a new node to a random parent.
  const parent = nodes[(Math.random() * nodes.length) | 0];
  const child = Object.assign(new Node(), {parent, depth: parent.depth + 1});
  if (parent.children) parent.children.push(child);
  else parent.children = [child];
  nodes.push(child);
  links.push({source: parent, target: child});

  // Recompute the layout.
  tree(root);

  // Add entering nodes in the parent’s old position.
  node = node.data(nodes);
  node = node
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("fill", "currentColor")
    .attr("r", 4)
    .attr("cx", (d) => (d.parent ? d.parent.px : (d.px = d.x)))
    .attr("cy", (d) => (d.parent ? d.parent.py : (d.py = d.y)))
    .merge(node);

  // Add entering links in the parent’s old position.
  link = link.data(links);
  link = link
    .enter()
    .insert("path", ".node")
    .attr("class", "link")
    .attr("d", (d) => {
      const o = {x: d.source.px, y: d.source.py};
      return renderLink({source: o, target: o});
    })
    .merge(link);

  // Transition nodes and links to their new positions.
  const t = svg.transition().duration(duration);

  link.transition(t).attr("d", renderLink);

  node
    .transition(t)
    .attr("cx", (d) => (d.px = d.x))
    .attr("cy", (d) => (d.py = d.y));
}, duration);

invalidation.then(() => interval.stop());

display(svg.node());
```

```js echo
const Node = d3.hierarchy.prototype.constructor;
const height = 600;
const duration = 750;
const renderLink = d3
  .linkVertical()
  .x((d) => d.x)
  .y((d) => d.y);
const tree = d3.tree().size([width - 20, height - 20]);
```
