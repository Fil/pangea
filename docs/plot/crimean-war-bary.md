---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Crimean war casualties by cause (with barY)</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Crimean war casualties by cause

A stacked bar chart of [deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War)—predominantly from <span style="border-bottom: solid ${d3.schemeTableau10[0]} 3px;">disease</span>—using Florence Nightingale’s data. This uses the [bar](https://observablehq.com/plot/marks/bar) mark, with dates quantized by the [interval scale option](https://observablehq.com/plot/features/scales#interval)—compare with the [rect-mark](https://observablehq.com/@observablehq/plot-crimean-war-recty) variant.

```js echo
Plot.plot({
  x: {
    interval: "month",
    tickFormat: (d) => d.toLocaleString("en", {month: "narrow"}),
    label: null
  },
  y: {grid: true},
  marks: [Plot.barY(crimea, {x: "date", y: "deaths", fill: "cause"}), Plot.ruleY([0])]
});
```

```js echo
const crimea = {
  const data = await FileAttachment("crimean-war.csv").csv({ typed: true });
  return data.columns.slice(2)
    .flatMap((cause) => data.map(({ date, [cause]: deaths }) => ({ date, cause, deaths })));
}
```
