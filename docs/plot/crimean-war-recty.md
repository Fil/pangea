---
source: https://observablehq.com/@observablehq/plot-crimean-war-recty
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Crimean war casualties by cause (with rectY)</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Crimean war casualties by cause 2

A stacked bar chart of [deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War)—predominantly from <span style="border-bottom: solid ${d3.schemeTableau10[0]} 3px;">disease</span>—using Florence Nightingale’s data. This uses the [rect](https://observablehq.com/plot/marks/rect) mark, with binned dates—compare with the [bar-mark](https://observablehq.com/@observablehq/plot-crimean-war-bary) variant.

```js echo
Plot.plot({
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
```

```js echo
const crimea = {
  const data = await FileAttachment("crimean-war.csv").csv({ typed: true });
  return data.columns.slice(2)
    .flatMap((cause) => data.map(({ date, [cause]: deaths }) => ({ date, cause, deaths })));
}
```
