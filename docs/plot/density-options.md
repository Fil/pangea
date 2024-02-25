---
source: https://observablehq.com/@observablehq/plot-density-options
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Density options</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Density options

An interactive demo of the main options for the [density](https://observablehq.com/plot/marks/density) mark.

```js
viewof bandwidth= Inputs.range([0, 40], {step: 0.2, label: "bandwidth"})
```

```js
viewof thresholds = Inputs.range([1, 40], {
  step: 1,
  value: 20,
  label: "thresholds"
})
```

```js echo
Plot.plot({
  inset: 20,
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
```

```js echo
const faithful = FileAttachment("faithful.tsv").tsv({typed: true});
```
