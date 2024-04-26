---
source: https://observablehq.com/@observablehq/plot-finite-state-machine
index: true
---

# Finite state machine

The [arrow](https://observablehq.com/plot/marks/arrow) mark connects machine states.

```js echo
const chart = Plot.plot({
  inset: 60,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.dot(nodes, {r: 40}),
    Plot.arrow(edges, {
      x1: ([[x1]]) => x1,
      y1: ([[, y1]]) => y1,
      x2: ([, [x2]]) => x2,
      y2: ([, [, y2]]) => y2,
      bend: true,
      strokeWidth: ([, , value]) => value,
      strokeLinejoin: "miter",
      headLength: 24,
      inset: 48
    }),
    Plot.text(nodes, {text: ["A", "B", "C"], dy: 12}),
    Plot.text(edges, {
      x: ([[x1, y1], [x2, y2]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
      y: ([[x1, y1], [x2, y2]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
      text: ([, , value]) => value
    })
  ]
});

display(chart);
```

```js echo
const matrix = [
  [3, 2, 5],
  [1, 7, 2],
  [1, 1, 8]
];

const nodes = matrix.map((m, i) => d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100));
const edges = matrix.flatMap((m, i) => m.map((value, j) => [nodes[i], nodes[j], value]));
```
