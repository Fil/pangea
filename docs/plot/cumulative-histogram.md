---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Cumulative histogram</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Cumulative histogram

If _cumulative_ is &minus;1, each [bin](https://observablehq.com/plot/transforms/bin) represents the number of athletes above a given weight; if &plus;1, below a given weight.

```js
const cumulative = view(
  Inputs.radio(
    new Map([
      ["−1", -1],
      ["+1", 1]
    ]),
    {label: "cumulative", value: 1}
  )
);
```

```js echo
Plot.plot({
  marginLeft: 60,
  y: {grid: true},
  marks: [Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", cumulative})), Plot.ruleY([0])]
});
```
