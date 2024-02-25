---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Finite state machine</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Finite state machine

The [arrow](https://observablehq.com/plot/marks/arrow) mark connects machine states.

```js echo
Plot.plot({
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
```

```js echo
const matrix = [
  [3, 2, 5],
  [1, 7, 2],
  [1, 1, 8]
];
```

```js echo
const nodes = matrix.map((m, i) => d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100));
```

```js echo
const edges = matrix.flatMap((m, i) => m.map((value, j) => [nodes[i], nodes[j], value]));
```
