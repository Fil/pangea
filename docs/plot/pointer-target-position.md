---
source: https://observablehq.com/@observablehq/plot-pointer-target-position
index: true
---

# Pointer target position

The **px** and **py** channels may be used with the [pointer transform](https://observablehq.com/plot/interactions/pointer) to specify pointing target positions independent of the displayed mark. Below, text in the top-left corner shows the focused date and closing price. The focused point is also highlighted with a red dot and rule.

```js echo
const chart = Plot.plot({
  height: 160,
  y: {axis: "right", grid: true, nice: true},
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.ruleX(aapl, Plot.pointerX({x: "Date", py: "Close", stroke: "red"})),
    Plot.dot(aapl, Plot.pointerX({x: "Date", y: "Close", stroke: "red"})),
    Plot.text(
      aapl,
      Plot.pointerX({
        px: "Date",
        py: "Close",
        dy: -17,
        frameAnchor: "top-left",
        fontVariant: "tabular-nums",
        text: (d) => [`Date ${Plot.formatIsoDate(d.Date)}`, `Close ${d.Close.toFixed(2)}`].join("   ")
      })
    )
  ]
});

display(chart);
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```
