---
source: https://observablehq.com/@observablehq/plot-line-chart-interactive-tip
index: true
---

# Line chart, interactive tip

```js echo
const chart = Plot.lineY(aapl, {x: "Date", y: "Close", tip: true}).plot({
  y: {grid: true}
});

display(chart);
```

The above code uses the tip [mark option](https://observablehq.com/plot/features/marks#mark-options); the code can be written more explicitly with a [tip mark](https://observablehq.com/plot/marks/tip) and a [pointer transform](https://observablehq.com/plot/interactions/pointer):

```js
const chart2 = Plot.plot({
  y: {grid: true},
  marks: [Plot.lineY(aapl, {x: "Date", y: "Close"}), Plot.tip(aapl, Plot.pointerX({x: "Date", y: "Close"}))]
});

display(chart2);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
