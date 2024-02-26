---
source: https://observablehq.com/@observablehq/plot-line-chart-with-markers
index: true
---

# Line chart with markers

Use [markers](https://observablehq.com/plot/features/markers) to indicate the data points that are interpolated by the [line](https://observablehq.com/plot/marks/line) mark.

```js echo
const chart = Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(crimea, {
      x: "date",
      y: "deaths",
      stroke: "cause",
      marker: true
    })
  ]
});

display(chart);
```

```js echo
const data = await FileAttachment("../data/crimean-war.csv").csv({typed: true});
```

```js echo
const crimea = data.columns.slice(2).flatMap((cause) => data.map(({date, [cause]: deaths}) => ({date, cause, deaths}))); // pivot taller
```
