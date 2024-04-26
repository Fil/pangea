---
source: https://observablehq.com/@observablehq/plot-highlighted-bin
index: true
---

# Highlighted bin

A custom [function reducer](https://observablehq.com/plot/transforms/bin#bin-transform) that tests if [Aaron Brown](<https://en.wikipedia.org/wiki/Aaron_Brown_(sprinter)>) belongs to a given bin.

```js echo
const chart = Plot.plot({
  y: {grid: true},
  marks: [Plot.rectY(olympians, Plot.binX({y: "count", fill: test}, {x: "weight"})), Plot.ruleY([0])]
});

display(chart);
```

In this example we highlight the bin that has a certain athlete.

```js echo
const test = (bin) => bin.some((d) => d.name === "Aaron Brown");
```
