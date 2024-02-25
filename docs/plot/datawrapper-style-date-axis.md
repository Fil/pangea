---
source: https://observablehq.com/@observablehq/plot-datawrapper-style-date-axis
index: true
---

# Datawrapper-style date axis

Plot’s time [axes](https://observablehq.com/plot/marks/axis) display month and year on two separate lines, [à la Datawrapper](https://academy.datawrapper.de/article/199-custom-date-formats-that-you-can-display-in-datawrapper).

```js echo
const chart = Plot.plot({
  marks: [Plot.ruleY([0]), Plot.axisX({ticks: "3 months"}), Plot.gridX(), Plot.line(aapl, {x: "Date", y: "Close"})]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
