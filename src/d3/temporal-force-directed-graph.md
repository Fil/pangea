---
source: https://observablehq.com/@d3/temporal-force-directed-graph
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Temporal force-directed graph</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Temporal force-directed graph

This notebook visualizes a temporal network which [changes over time](/@d3/modifying-a-force-directed-graph). Each node and link has a _start_ and _end_ specifying its existence. The data here represents face-to-face interactions at a two-day conference. Data: [SocioPatterns](/@d3/sfhh-conference-data)

```js
viewof time = Scrubber(times, {
  delay: 100,
  loop: true,
  format: date => date.toLocaleString("en", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC"
  })
})
```

```js echo
const chart = {
  const width = 928;
  const height = 680;

  const simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink().id(d => d.id))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  let link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line");

  let node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle");

  function ticked() {
    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  }

  invalidation.then(() => simulation.stop());

  return Object.assign(svg.node(), {
    update({nodes, links}) {

      // Make a shallow copy to protect against mutation, while
      // recycling old nodes to preserve position and velocity.
      const old = new Map(node.data().map(d => [d.id, d]));
      nodes = nodes.map(d => ({...old.get(d.id), ... d}));
      links = links.map(d => ({...d}));

      node = node
        .data(nodes, d => d.id)
        .join(enter => enter.append("circle")
          .attr("r", 5)
          .call(drag(simulation))
          .call(node => node.append("title").text(d => d.id)));

      link = link
        .data(links, d => [d.source, d.target])
        .join("line");

      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart().tick();
      ticked(); // render now!
    }
  });
}
```

```js echo
const update = {
  const nodes = data.nodes.filter(d => contains(d, time));
  const links = data.links.filter(d => contains(d, time));
  chart.update({nodes, links});
}
```

```js echo
const data = {
  const {nodes, links} = await FileAttachment("sfhh@4.json").json();
  for (const d of [...nodes, ...links]) {
    d.start = d3.isoParse(d.start);
    d.end = d3.isoParse(d.end);
  };
  return {nodes, links};
}
```

```js echo
const times = d3
  .scaleTime()
  .domain([d3.min(data.nodes, (d) => d.start), d3.max(data.nodes, (d) => d.end)])
  .ticks(1000)
  .filter((time) => data.nodes.some((d) => contains(d, time)));
```

```js echo
const contains = ({start, end}, time) => start <= time && time < end;
```

```js echo
const drag = (simulation) => {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
};
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
