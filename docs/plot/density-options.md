---
source: https://observablehq.com/@observablehq/plot-density-options
index: true
---

# Density options

An interactive demo of the main options for the [density](https://observablehq.com/plot/marks/density) mark.

```js
const bandwidth = view(Inputs.range([0, 40], {step: 0.2, label: "bandwidth"}));
```

```js
const thresholds = view(
  Inputs.range([1, 40], {
    step: 1,
    value: 20,
    label: "thresholds"
  })
);
```

```js echo
const chart = Plot.plot({
  inset: 20,
  style: "overflow: visible",
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      y: "eruptions",
      bandwidth,
      thresholds
    }),
    Plot.dot(faithful, {x: "waiting", y: "eruptions"})
  ]
});

display(chart);
```

```js echo
const faithful = FileAttachment("../data/faithful.tsv").tsv({typed: true});
```
