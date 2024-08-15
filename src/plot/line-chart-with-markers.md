---
source: https://observablehq.com/@observablehq/plot-line-chart-with-markers
index: true
---

# Line chart with markers

Use [markers](https://observablehq.com/plot/features/markers) to indicate the data points that are interpolated by the [line](https://observablehq.com/plot/marks/line) mark.

```js echo
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(crimea, {
      x: "date",
      y: "deaths",
      stroke: "cause",
      marker: true
    })
  ]
})
```

The dataset is a CSV in the so-called “wide” format, with multiple observations for each date (an observation is the number of deaths in the Crimean war, from a given cause of death).

${Inputs.table(data)}

```js echo
const data = await FileAttachment("../data/crimean-war.csv").csv({typed: true});
```

We use [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) to reshape this dataset into a tidy format, with one observation per row (labelled by the type of observation).

${Inputs.table(crimea)}

```js echo
const crimea = data.columns.slice(2).flatMap((cause) => data.map(({date, [cause]: deaths}) => ({date, cause, deaths}))); // pivot taller
```

This allows us to use the `cause` field as the grouping channel `z` for the line chart (specifying `stroke` as a channel in Plot.line implicitly defines `z`).
