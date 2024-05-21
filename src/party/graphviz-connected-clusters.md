---
source: https://observablehq.com/d/bb596f5ab870928d
author: Fabian Iwand
index: true
---

# Graphviz - connected clusters

Uses [`ltail`](https://graphviz.org/docs/attrs/ltail/) to emulate connected [clusters](https://graphviz.org/Gallery/directed/cluster.html).

In response to [What kind of visualization do I need?](https://talk.observablehq.com/t/what-kind-of-visualization-do-i-need/9297)

> by [Fabian Iwand](https://observablehq.com/@mootari)

```js
const showLabels = view(Inputs.toggle({label: "Show labels"}));
```

```dot
digraph {
  rankdir = LR
  ranksep = 1
  nodesep = .5
  compound = true
  node [shape=note height=1 fontname=arial fontcolor="#888888"]
  ${showLabels ? `` : `node [label=""]`}

  A1 -> B1 -> C1 -> D1 -> {E1; E2}
  A1 -> B2 -> C2
  C1 -> D2
  A1 -> D4 -> {E4; E5}
  D3 -> E3 -> F1
  F2 -> G1

  subgraph cluster_0 {
    graph [style="rounded,dashed" color=brown penwidth=2]
    C2
    D2
  }
  D3 [style=filled color=brown]
  C2 -> D3 [ltail=cluster_0 color=brown]

  subgraph cluster_1 {
    graph [style="rounded,dashed" color=gold penwidth=2]
    E3
    E4
  }
  F2 [style=filled, color=gold]
  E4 -> F2 [ltail=cluster_1 color=gold]

}
```
