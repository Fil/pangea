---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Highlighted bin</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Highlighted bin

A custom [function reducer](https://observablehq.com/plot/transforms/bin#bin-transform) that tests if [Aaron Brown](https://en.wikipedia.org/wiki/Aaron_Brown_(sprinter%29) belongs to a given bin.

```js echo
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX(
        {
          y: "count",
          fill: test
        },
        {x: "weight"}
      )
    ),
    Plot.ruleY([0])
  ]
});
```

In this example we highlight the bin that has a certain athlete.

```js echo
const test = (bin) => bin.some((d) => d.name === "Aaron Brown");
```
