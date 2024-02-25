---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Lollipop</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Lollipop

Use a [rule](https://observablehq.com/plot/marks/rule) mark to draw a thin line along one dimension. Add a [dot](https://observablehq.com/plot/marks/dot), and you get a lollipop!

```js echo
Plot.plot({
  x: {label: null, tickPadding: 6, tickSize: 0},
  y: {percent: true},
  marks: [
    Plot.ruleX(alphabet, {x: "letter", y: "frequency", strokeWidth: 2}),
    Plot.dot(alphabet, {
      x: "letter",
      y: "frequency",
      fill: "currentColor",
      r: 4
    })
  ]
});
```
