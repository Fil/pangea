---
source: https://observablehq.com/@d3/hierarchical-edge-bundling
author: Mike Bostock
index: true
---

# Hierarchical edge bundling

This chart shows relationships among classes in a software hierarchy. Hover a class to reveal its imports (${html`<b style="color: ${colorout};">outgoing</b> edges`}) and classes that import it (${html`<b style="color: ${colorin};">incoming</b> edges`}).

```js echo
const width = 954;
const radius = width / 2;

const tree = d3.cluster().size([2 * Math.PI, radius - 100]);
const root = tree(
  bilink(d3.hierarchy(data).sort((a, b) => d3.ascending(a.height, b.height) || d3.ascending(a.data.name, b.data.name)))
);

const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", width)
  .attr("viewBox", [-width / 2, -width / 2, width, width])
  .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

const node = svg
  .append("g")
  .selectAll()
  .data(root.leaves())
  .join("g")
  .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
  .append("text")
  .attr("fill", "currentColor")
  .attr("dy", "0.31em")
  .attr("x", (d) => (d.x < Math.PI ? 6 : -6))
  .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
  .attr("transform", (d) => (d.x >= Math.PI ? "rotate(180)" : null))
  .text((d) => d.data.name)
  .each(function (d) {
    d.text = this;
  })
  .on("mouseover", overed)
  .on("mouseout", outed)
  .call((text) =>
    text.append("title").text(
      (d) => `${id(d)}
${d.outgoing.length} outgoing
${d.incoming.length} incoming`
    )
  );

const line = d3
  .lineRadial()
  .curve(d3.curveBundle.beta(0.85))
  .radius((d) => d.y)
  .angle((d) => d.x);

const link = svg
  .append("g")
  .attr("stroke", colornone)
  .attr("fill", "none")
  .selectAll()
  .data(root.leaves().flatMap((leaf) => leaf.outgoing))
  .join("path")
  .style("mix-blend-mode", dark ? "screen" : "multiply")
  .attr("d", ([i, o]) => line(i.path(o)))
  .each(function (d) {
    d.path = this;
  });

function overed(event, d) {
  link.style("mix-blend-mode", null);
  d3.select(this).attr("font-weight", "bold");
  d3.selectAll(d.incoming.map((d) => d.path))
    .attr("stroke", colorin)
    .raise();
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr("fill", colorin)
    .attr("font-weight", "bold");
  d3.selectAll(d.outgoing.map((d) => d.path))
    .attr("stroke", colorout)
    .raise();
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr("fill", colorout)
    .attr("font-weight", "bold");
}

function outed(event, d) {
  link.style("mix-blend-mode", dark ? "screen" : "multiply");
  d3.select(this).attr("font-weight", null);
  d3.selectAll(d.incoming.map((d) => d.path)).attr("stroke", colornone);
  d3.selectAll(d.incoming.map(([d]) => d.text))
    .attr("fill", "currentColor")
    .attr("font-weight", null);
  d3.selectAll(d.outgoing.map((d) => d.path)).attr("stroke", colornone);
  d3.selectAll(d.outgoing.map(([, d]) => d.text))
    .attr("fill", "currentColor")
    .attr("font-weight", null);
}

display(svg.node());
```

```js echo
const data = hierarchy(await FileAttachment("../data/flare-imports.json").json());
```

```js echo
function hierarchy(data, display) {
  const delimiter = ".";
  let root;
  const map = new Map();
  data.forEach(function find(data) {
    const {name} = data;
    if (map.has(name)) return map.get(name);
    const i = name.lastIndexOf(delimiter);
    map.set(name, data);
    if (i >= 0) {
      find({name: name.substring(0, i), children: []}).children.push(data);
      data.name = name.substring(i + 1);
    } else {
      root = data;
    }
    return data;
  });
  return root;
}
```

```js echo
function bilink(root) {
  const map = new Map(root.leaves().map((d) => [id(d), d]));
  for (const d of root.leaves()) (d.incoming = []), (d.outgoing = d.data.imports.map((i) => [d, map.get(i)]));
  for (const d of root.leaves()) for (const o of d.outgoing) o[1].incoming.push(o);
  return root;
}
```

```js echo
function id(node) {
  return `${node.parent ? id(node.parent) + "." : ""}${node.data.name}`;
}
```

```js echo
const colorin = "var(--theme-blue)";
const colorout = "var(--theme-red)";
const colornone = "color-mix(in srgb, currentColor, var(--theme-background) 80%)";
```
