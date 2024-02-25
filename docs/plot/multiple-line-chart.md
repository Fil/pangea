---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Multiple line chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Multiple line chart

Use the **z** channel (or **stroke**, or **fill**) to group [tidy data](https://r4ds.had.co.nz/tidy-data.html) into series and create multiple lines.

```js echo
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployment (%)"
  },
  marks: [Plot.ruleY([0]), Plot.lineY(bls, {x: "date", y: "unemployment", z: "division"})]
});
```

```js echo
const bls = FileAttachment("bls-metro-unemployment.csv").csv({typed: true});
```
