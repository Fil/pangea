---
source: https://observablehq.com/@observablehq/plot-tip-format
index: true
---

# Tip format

The [tip](https://observablehq.com/plot/marks/tip) **format** option controls which channels are displayed and how, and in what order. A channel’s label can be specified alongside its value in the **channels** option as a {value, label} object (_e.g._, country).

```js echo
const chart = Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {
    name: "name",
    nationality: {
      value: "nationality",
      label: "country"
    },
    sport: "sport"
  },
  tip: {
    format: {
      name: true,
      sport: true,
      nationality: true,
      y: (d) => `${d}m`,
      x: (d) => `${d}kg`,
      stroke: false
    }
  }
}).plot();

display(chart);
```

```js echo
const olympians = FileAttachment("../data/olympians.csv").csv({typed: true});
```
