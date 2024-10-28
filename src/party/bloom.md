---
index: true
---

# Hello, Bloom

[Bloom](https://penrose.cs.cmu.edu/blog/bloom) is “an open-source JavaScript library for optimization-driven interactive diagram creation. Bloom makes it simple to describe complex, dynamic behavior using a rich vocabulary of optimization constraints and the declarative language behind [Penrose](./penrose). [It aims] to facilitate the creation of engaging, explorable explanations.”

```js
const n = view(Inputs.range([2, 50], {value: 25, step: 1, label: "dots"}));
const r = view(Inputs.range([2, 50], {value: 16, step: 1, label: "radius"}));
```

```ts echo
/**
 * Self-hosting bloom.js; ideally we'd have
 * > import bloom from "npm:@penrose/bloom";
 * but since this generates errors, we currently fetch a bundled version
 * (bloom.min.js) from penrose.cs.cmu.edu with a data loader.
 */
const {DiagramBuilder, canvas, constraints} = await import(FileAttachment("bloom.js").href);

const height = 300;
const containerRadius = height / 2 - 2;
const containerBorder = 2;
const strokeColor = dark ? [1, 1, 1, 1] : [0, 0, 0, 1]; // black (white in dark mode)

// A new Diagram.
const {build, circle, ensure, forall, type} = new DiagramBuilder(canvas(width, height), "", 1e3);

// Create n dots, represented by a small circle. When dragging a dot,
// we hard constrain it to stay in the enclosure.
const Dot = type();
for (let i = 0; i < n; ++i) Dot();
forall({d: Dot}, ({d}) => {
  d.icon = circle({
    r,
    drag: true,
    dragConstraint: ([x, y]) => {
      const a = Math.hypot(x, y) / (containerRadius - containerBorder / 2 - r);
      return (a <= 1) ? [x, y] : [x / a, y / a];
    },
  });
  d.icon.fillColor[3] = 1; // opacity
});

// Create an enclosure, represented as a large black-stroke circle.
// Note: elements are drawn in the order in which their icon is defined.
// Here, the enclosure is drawn last (i.e., on top).
const Enclosure = type();
const enclosure = Enclosure();
enclosure.icon = circle({
  r: containerRadius,
  center: [0, 0], // immutable position
  strokeWidth: containerBorder,
  strokeColor,
  fillColor: [0, 0, 0, 0] // transparent
});

// The dots are (soft) constrained to the enclosure.
forall({d: Dot, e: Enclosure}, ({d, e}) => {
  ensure(constraints.contains(e.icon, d.icon, containerBorder / 2))
});

// Two dots should not overlap.
forall({d1: Dot, d2: Dot}, ({d1, d2}) => {
  ensure(constraints.disjoint(d1.icon, d2.icon));
});

display((await build()).getInteractiveElement());
```
