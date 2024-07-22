---
index: true
source: https://observablehq.com/@observablehq/plot-ridgeline
---

# Ridgeline plot

Ridgeline plots are an alternative to [horizon charts](./horizon) and small-multiple area charts that allow greater precision for a given vertical space at the expense of occlusion (overlapping areas). Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js
const overlap = view(Inputs.range([0, 9], {step: 0.1, label: "Overlap"}));
```

```js
display(chart);
```

Loads the dataset.

```js
display(traffic);
```

```js echo
const traffic = FileAttachment("/data/traffic.csv").csv({typed: true});
```

Materializes all the channels:

```js echo
const X = Plot.valueof(traffic, "date");
const Y = Plot.valueof(traffic, "vehicles");
const FY = Plot.valueof(traffic, "location");
const locations = new Set(FY);
display({X, Y, FY, locations});
```

Creates the chart with a different mark for each facet, ensuring that each new ridge is drawn over the previous ones.

```js echo
const chart = Plot.plot({
  height: 40 + locations.size * 17,
  width,
  marginBottom: 1,
  marginLeft: 120,
  x: {axis: "top"},
  y: {axis: null, range: [2.5 * 17 - 2, (2.5 - overlap) * 17 - 2]},
  fy: {label: null, domain: locations}, // preserve input order
  marks: Array.from(locations, (location) => [
      Plot.areaY(traffic, {
        filter: FY.map((l) => l === location),
        x: X,
        y: Y,
        fy: FY,
        curve: "basis",
        sort: "date",
        fill: "var(--theme-foreground-faintest)"
      }),
      Plot.lineY(traffic, {
        filter: FY.map((l) => l === location),
        x: X,
        y: Y,
        fy: FY,
        curve: "basis",
        sort: "date",
        strokeWidth: 1
      })
    ]
  )
});
```
