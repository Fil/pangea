---
source: https://observablehq.com/@observablehq/plot-crimean-war-bary
index: true
---

# Crimean war casualties by cause

A stacked bar chart of [deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War)—predominantly from <span style="border-bottom: solid ${d3.schemeTableau10[0]} 3px;">disease</span>—using Florence Nightingale’s data. This uses the [bar](https://observablehq.com/plot/marks/bar) mark, with dates quantized by the [interval scale option](https://observablehq.com/plot/features/scales#interval)—compare with the [rect-mark](./crimean-war-recty) variant.

```js echo
const chart = Plot.plot({
  x: {
    interval: "month",
    tickFormat: (d) => d.toLocaleString("en", {month: "narrow"}),
    label: null
  },
  y: {grid: true},
  marks: [Plot.barY(crimea, {x: "date", y: "deaths", fill: "cause"}), Plot.ruleY([0])]
});

display(chart);
```

```js echo
const data = await FileAttachment("../data/crimean-war.csv").csv({typed: true});
const crimea = data.columns.slice(2).flatMap((cause) => data.map(({date, [cause]: deaths}) => ({date, cause, deaths})));
```
