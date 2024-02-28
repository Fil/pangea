---
source: https://observablehq.com/@observablehq/plot-crimean-war-recty
index: true
---

# Crimean war casualties by cause 2

A stacked bar chart of [deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War)—predominantly from <span style="border-bottom: solid ${d3.schemeTableau10[0]} 3px;">disease</span>—using Florence Nightingale’s data. This uses the [rect](https://observablehq.com/plot/marks/rect) mark, with binned dates—compare with the [bar-mark](./crimean-war-bary) variant.

```js echo
const chart = Plot.plot({
  y: {grid: true},
  marks: [
    Plot.rectY(crimea, {
      x: "date",
      y: "deaths",
      interval: "month",
      fill: "cause"
    }),
    Plot.ruleY([0])
  ]
});

display(chart);
```

```js echo
const data = await FileAttachment("../data/crimean-war.csv").csv({typed: true});
const crimea = data.columns.slice(2).flatMap((cause) => data.map(({date, [cause]: deaths}) => ({date, cause, deaths})));
```
