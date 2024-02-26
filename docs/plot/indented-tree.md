---
source: https://observablehq.com/@observablehq/plot-custom-tree-layout
index: true
---

# Indented tree

A tabular layout for hierarchical data, indented [trees](https://observablehq.com/plot/marks/tree) allow one or more columns of values to be shown alongside indented names.

```js echo
const chart = Plot.plot({
  axis: null,
  inset: 10,
  insetRight: 120,
  round: true,
  width: 200,
  height: 3600,
  marks: Plot.tree(flare, {
    path: "name",
    delimiter: ".",
    treeLayout: indent,
    strokeWidth: 1,
    curve: "step-before",
    textStroke: "none"
  })
});

display(chart);
```

This type of tree needs a custom layout:

```js echo
function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}
```

```js echo
const flare = FileAttachment("../data/flare.csv").csv({typed: true});
```
