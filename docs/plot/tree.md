---
source: https://observablehq.com/@observablehq/plot-tree-tidy
index: true
---

# Tidy tree (Plot)

Plot’s [tree transform](https://observablehq.com/plot/marks/tree) implements the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf) for constructing hierarchical node-link diagrams, improved to run in linear time by [Buchheim _et al._](http://dirk.jivas.de/papers/buchheim02improving.pdf) Tidy trees are typically more compact than [cluster dendrograms](./cluster-diagram), which place all leaves at the same level. See also the [radial variant](../d3/radial-tree-component) (using D3).

```js echo
display(
  Plot.plot({
    axis: null,
    margin: 10,
    marginLeft: 40,
    marginRight: 160,
    width: 928,
    height: 1800,
    marks: [Plot.tree(flare, {path: "name", delimiter: "."})]
  })
);
```

```js echo
const flare = FileAttachment("../data/flare.csv").csv();
```
