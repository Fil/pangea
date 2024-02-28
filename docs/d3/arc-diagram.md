---
source: https://observablehq.com/@d3/arc-diagram
index: true
---

# Arc diagram

This diagram places nodes in a horizontal or vertical line, with circular arcs for links. Unlike other network visualizations such as a [force layout](./force-directed-graph), the appearance (and usefulness) of an arc diagram is highly dependent on the order of nodes. Hover over a node below to inspect its connections. See also the simpler [Plot version](../plot/arc-diagram).

```js
{
  const select = Inputs.select(orders, {label: "Order"});

  select.addEventListener("input", () => (clearTimeout(t), chart.update(select.value)));

  // Soon after the page starts, trigger a synthetic input event to demonstrate the interactivity
  const t = setTimeout(() => {
    select.value = orders.get("by group");
    select.dispatchEvent(new Event("input", {bubbles: true}));
  }, 2000);

  view(select);
}
```

```js echo
// Specify the chart’s dimensions.
const width = 650;
const step = 14;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 20;
const marginLeft = 130;
const height = (nodes.length - 1) * step + marginTop + marginBottom;
const y = d3.scalePoint(orders.get("by name"), [marginTop, height - marginBottom]);

// A color scale for the nodes and links.
const color = d3
  .scaleOrdinal()
  .domain(nodes.map((d) => d.group).sort(d3.ascending))
  .range(d3.schemeCategory10)
  .unknown("#aaa");

// A function of a link, that checks that source and target have the same group and returns
// the group; otherwise null. Used to color the links.
const groups = new Map(nodes.map((d) => [d.id, d.group]));
function samegroup({source, target}) {
  return groups.get(source) === groups.get(target) ? groups.get(source) : null;
}

// Create the SVG container.
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// The current position, indexed by id. Will be interpolated.
const Y = new Map(nodes.map(({id}) => [id, y(id)]));

// Add an arc for each link.
function arc(d) {
  const y1 = Y.get(d.source);
  const y2 = Y.get(d.target);
  const r = Math.abs(y2 - y1) / 2;
  return `M${marginLeft},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${marginLeft},${y2}`;
}
const path = svg
  .insert("g", "*")
  .attr("fill", "none")
  .attr("stroke-opacity", 0.6)
  .attr("stroke-width", 1.5)
  .selectAll("path")
  .data(links)
  .join("path")
  .attr("stroke", (d) => color(samegroup(d)))
  .attr("d", arc);

// Add a text label and a dot for each node.
const label = svg
  .append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(nodes)
  .join("g")
  .attr("transform", (d) => `translate(${marginLeft},${Y.get(d.id)})`)
  .call((g) =>
    g
      .append("text")
      .attr("x", -6)
      .attr("dy", "0.35em")
      .attr("fill", (d) => d3.lab(color(d.group)).darker(dark ? -2 : 2))
      .text((d) => d.id)
  )
  .call((g) =>
    g
      .append("circle")
      .attr("r", 3)
      .attr("fill", (d) => color(d.group))
  );

// Add invisible rects that update the class of the elements on mouseover.
label
  .append("rect")
  .attr("fill", "none")
  .attr("width", marginLeft + 40)
  .attr("height", step)
  .attr("x", -marginLeft)
  .attr("y", -step / 2)
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("pointerenter", (event, d) => {
    svg.classed("hover", true);
    label.classed("primary", (n) => n === d);
    label.classed("secondary", (n) =>
      links.some(({source, target}) => (n.id === source && d.id == target) || (n.id === target && d.id === source))
    );
    path
      .classed("primary", (l) => l.source === d.id || l.target === d.id)
      .filter(".primary")
      .raise();
  })
  .on("pointerout", () => {
    svg.classed("hover", false);
    label.classed("primary", false);
    label.classed("secondary", false);
    path.classed("primary", false).order();
  });

// Add styles for the hover interaction.
svg.append("style").text(`
    .hover text { fill: var(--theme-foreground-faintest); }
    .hover g.primary text { font-weight: bold; fill: var(--theme-foreground); }
    .hover g.secondary text { fill: var(--theme-foreground); }
    .hover path { stroke:var(--theme-foreground-faintest); }
    .hover path.primary { stroke: var(--theme-foreground) }
  `);

// A function that updates the positions of the labels and recomputes the arcs
// when passed a new order.
function update(order) {
  y.domain(order);

  label
    .sort((a, b) => d3.ascending(Y.get(a.id), Y.get(b.id)))
    .transition()
    .duration(750)
    .delay((d, i) => i * 20) // Make the movement start from the top.
    .attrTween("transform", (d) => {
      const i = d3.interpolateNumber(Y.get(d.id), y(d.id));
      return (t) => {
        const y = i(t);
        Y.set(d.id, y);
        return `translate(${marginLeft},${y})`;
      };
    });

  path
    .transition()
    .duration(750 + nodes.length * 20) // Cover the maximum delay of the label transition.
    .attrTween("d", (d) => () => arc(d));
}

const chart = display(Object.assign(svg.node(), {update}));
```

---

_Data preparation_

```js echo
const miserables = FileAttachment("../data/miserables.json").json();
```

```js echo
const {nodes, links} = miserables;
const degree = d3.rollup(
  links.flatMap(({source, target, value}) => [
    {node: source, value},
    {node: target, value}
  ]),
  (v) => d3.sum(v, ({value}) => value),
  ({node}) => node
);
const orders = new Map([
  ["by name", d3.sort(nodes.map((d) => d.id))],
  [
    "by group",
    d3
      .sort(
        nodes,
        ({group}) => group,
        ({id}) => id
      )
      .map(({id}) => id)
  ],
  //    ["input", nodes.map(({id}) => id)],
  [
    "by degree",
    d3
      .sort(
        nodes,
        ({id}) => degree.get(id),
        ({id}) => id
      )
      .map(({id}) => id)
      .reverse()
  ]
]);
```

```js echo
import {dark} from "../components/dark.js";
```
