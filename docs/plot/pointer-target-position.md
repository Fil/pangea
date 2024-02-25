---
source: https://observablehq.com/@observablehq/plot-pointer-target-position
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Pointer target position</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Pointer target position

The **px** and **py** channels may be used with the [pointer transform](https://observablehq.com/plot/interactions/pointer) to specify pointing target positions independent of the displayed mark. Below, text in the top-left corner shows the focused date and closing price. The focused point is also highlighted with a red dot and rule.

```js echo
Plot.plot({
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
```
