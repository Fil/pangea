---
source: https://observablehq.com/@observablehq/plot-lollipop
index: true
---

# Lollipop

Use a [rule](https://observablehq.com/plot/marks/rule) mark to draw a thin line along one dimension. Add a [dot](https://observablehq.com/plot/marks/dot), and you get a lollipop! See also the [small multiple lollipop](./facet-lollipop).

```js echo
const chart = Plot.plot({
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

display(chart);
```

```js echo
const alphabet = FileAttachment("../data/alphabet.csv").csv({typed: true});
```
