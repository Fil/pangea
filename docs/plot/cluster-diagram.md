---
source: https://observablehq.com/@observablehq/plot-cluster-diagram
index: true
---

# Cluster diagram

Plot’s [cluster layout](https://observablehq.com/plot/marks/tree) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](./tree), but are useful for dendrograms, hierarchical clustering, and [phylogenetic trees](../d3/tree-of-life). See also the [radial variant](../d3/radial-cluster) (using D3).

```js echo
const chart = Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 40,
  marginRight: 160,
  width: 928,
  height: 2400,
  marks: [
    Plot.cluster(flare, {
      path: "name",
      treeSort: "node:height",
      delimiter: ".",
      textStroke: "var(--theme-background)"
    })
  ]
});

display(chart);
```

```js echo
const flare = FileAttachment("../data/flare.csv").csv();
```
