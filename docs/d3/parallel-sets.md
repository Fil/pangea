---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Parallel sets</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Parallel sets

[Parallel sets](https://kosara.net/publications/Bendix_InfoVis_2005.html) are like [parallel coordinates](/@d3/parallel-coordinates), but for categorical dimensions. The thickness of each curved line represents a quantity that is repeatedly subdivided by category. This example looks at the _Titanic_ disaster of 1912.

Data: [Robert J. MacG. Dawson](http://jse.amstat.org/v3n3/datasets.dawson.html)

```js echo
const chart = {
  const width = 928;
  const height = 720;

  const sankey = d3.sankey()
    .nodeSort(null)
    .linkSort(null)
    .nodeWidth(4)
    .nodePadding(20)
    .extent([[0, 5], [width, height - 5]])

  const color = d3.scaleOrdinal(["Perished"], ["#da4f81"]).unknown("#ccc");
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  const {nodes, links} = sankey({
    nodes: graph.nodes.map(d => Object.create(d)),
    links: graph.links.map(d => Object.create(d))
  });

  svg.append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
    .append("title")
      .text(d => `${d.name}\n${d.value.toLocaleString()}`);

  svg.append("g")
      .attr("fill", "none")
    .selectAll("g")
    .data(links)
    .join("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", d => color(d.names[0]))
      .attr("stroke-width", d => d.width)
      .style("mix-blend-mode", "multiply")
    .append("title")
      .text(d => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`);

  svg.append("g")
      .style("font", "10px sans-serif")
    .selectAll("text")
    .data(nodes)
    .join("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .text(d => d.name)
    .append("tspan")
      .attr("fill-opacity", 0.7)
      .text(d => ` ${d.value.toLocaleString()}`);

  return svg.node();
}
```

```js echo
const graph = {
  const keys = data.columns.slice(0, -1);
  let index = -1;
  const nodes = [];
  const nodeByKey = new d3.InternMap([], JSON.stringify);;
  const indexByKey = new d3.InternMap([], JSON.stringify);;
  const links = [];

  for (const k of keys) {
    for (const d of data) {
      const key = [k, d[k]];
      if (nodeByKey.has(key)) continue;
      const node = {name: d[k]};
      nodes.push(node);
      nodeByKey.set(key, node);
      indexByKey.set(key, ++index);
    }
  }

  for (let i = 1; i < keys.length; ++i) {
    const a = keys[i - 1];
    const b = keys[i];
    const prefix = keys.slice(0, i + 1);
    const linkByKey = new d3.InternMap([], JSON.stringify);
    for (const d of data) {
      const names = prefix.map(k => d[k]);
      const value = d.value || 1;
      let link = linkByKey.get(names);
      if (link) { link.value += value; continue; }
      link = {
        source: indexByKey.get([a, d[a]]),
        target: indexByKey.get([b, d[b]]),
        names,
        value
      };
      links.push(link);
      linkByKey.set(names, link);
    }
  }

  return {nodes, links};
}
```

```js echo
const data = FileAttachment("titanic.csv").csv({typed: true});
```

```js echo
const d3 = require("d3@7", "d3-sankey@0.12");
```
