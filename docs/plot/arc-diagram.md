<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Arc diagram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Arc diagram

This diagram places nodes in a vertical line with circular arcs for links. Unlike other network visualizations such as a [force layout](/@d3/force-directed-graph), the appearance (and usefulness) of an arc diagram is highly dependent on the order of nodes.

```js echo
Plot.plot({
  height: 1080,
  marginLeft: 100,
  axis: null,
  x: {domain: [0, 1]}, // see https://github.com/observablehq/plot/issues/1541
  color: {domain: d3.range(10), unknown: "#ccc"},
  marks: [
    Plot.dot(miserables.nodes, {x: 0, y: "id", fill: "group", sort: {y: "fill"}}),
    Plot.text(miserables.nodes, {x: 0, y: "id", text: "id", textAnchor: "end", dx: -6, fill: "group"}),
    Plot.arrow(miserables.links, {x: 0, y1: "source", y2: "target", sweep: "-y", bend: 90, headLength: 0, stroke: samegroup, sort: samegroup, reverse: true})
  ]
})
```

```js echo
samegroup = {
  const groups = new Map(miserables.nodes.map((d) => [d.id, d.group]));
  return ({source, target}) => {
    source = groups.get(source);
    target = groups.get(target);
    return source === target ? source : null;
  };
}
```
