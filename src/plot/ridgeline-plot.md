---
index: true
---

# Ridgeline plot

Ridgeline plots are an alternative to [horizon charts](./horizon) and small-multiple area charts that allow greater precision for a given vertical space at the expense of occlusion (overlapping areas). Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js
const overlap = view(Inputs.range([0, 9], {step: 0.1, label: "Overlap"}));
```

```js echo
const chart = Plot.plot({
  height: 40 + new Set(traffic.map((d) => d.location)).size * 17,
  width,
  marginBottom: 1,
  marginLeft: 120,
  x: {axis: "top"},
  y: {axis: null, range: [2.5 * 17 - 2, (2.5 - overlap) * 17 - 2]},
  fy: {label: null, domain: traffic.map((d) => d.location)}, // preserve input order
  marks: [
    Plot.areaY(traffic, {
      x: "date",
      y: "vehicles",
      fy: "location",
      curve: "basis",
      sort: "date",
      fill: "var(--theme-foreground-faintest)"
    }),
    Plot.lineY(traffic, {
      x: "date",
      y: "vehicles",
      fy: "location",
      curve: "basis",
      sort: "date",
      strokeWidth: 1
    })
  ]
});

display(chart);
```

```js echo
const traffic = FileAttachment("../data/traffic.csv").csv({typed: true});
```
