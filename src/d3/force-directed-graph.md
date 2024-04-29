---
index: true
source: https://observablehq.com/@d3/force-directed-graph-component
---

# Force-directed graph

This network of character co-occurence in _Les Misérables_ is positioned by simulated forces using [d3-force](https://d3js.org/d3-force). See also a [disconnected graph](./disjoint-force-directed-graph), and compare to [WebCoLa](https://observablehq.com/@mbostock/hello-cola).

```js echo
const chart = ForceGraph(data, {
  nodeId: (d) => d.id,
  nodeGroup: (d) => d.group,
  nodeTitle: (d) => `${d.id}\n${d.group}`,
  linkStrokeWidth: (l) => Math.sqrt(l.value),
  width,
  height: 600,
  invalidation // a promise to stop the simulation when the cell is re-run
});

display(chart);
```

```js echo
const data = FileAttachment("../data/miserables.json").json();
```

```js echo
import {ForceGraph} from "../components/force-graph.js";
```

```js
import {showCode} from "../components/showCode.js";
```

```js
display(showCode(FileAttachment("../components/force-graph.js")));
```
