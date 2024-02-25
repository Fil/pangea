---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Index chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Index chart

A [normalize](https://observablehq.com/plot/transforms/normalize) transform is applied on the reference day, allowing comparison of stocks performance.

```js
viewof date = Scrubber(d3.union(stocks.map((d) => d.Date)), {
  format: Plot.formatIsoDate,
  initial: 500,
  loop: false,
  autoplay: false
})
```

```js echo
{
  const bisector = d3.bisector((i) => stocks[i].Date);
  const basis = (I, Y) => Y[I[bisector.center(I, date)]];
  return Plot.plot({
    style: "overflow: visible;",
    y: {
      type: "log",
      grid: true,
      label: "Change in price (%)",
      tickFormat: (
        (f) => (x) =>
          f((x - 1) * 100)
      )(d3.format("+d"))
    },
    marks: [
      Plot.ruleY([1]),
      Plot.ruleX([date]),
      Plot.lineY(
        stocks,
        Plot.normalizeY(basis, {
          x: "Date",
          y: "Close",
          stroke: "Symbol"
        })
      ),
      Plot.text(
        stocks,
        Plot.selectLast(
          Plot.normalizeY(basis, {
            x: "Date",
            y: "Close",
            z: "Symbol",
            text: "Symbol",
            textAnchor: "start",
            dx: 3
          })
        )
      )
    ]
  });
}
```

The cell below merges four CSV files, adding the symbol for each stock as the first column for each row.

```js echo
const stocks = (
  await Promise.all([
    FileAttachment("aapl.csv")
      .csv({typed: true})
      .then((values) => ["AAPL", values]),
    FileAttachment("amzn.csv")
      .csv({typed: true})
      .then((values) => ["AMZN", values]),
    FileAttachment("goog.csv")
      .csv({typed: true})
      .then((values) => ["GOOG", values]),
    FileAttachment("ibm.csv")
      .csv({typed: true})
      .then((values) => ["IBM", values])
  ])
).flatMap(([Symbol, values]) => values.map((d) => ({Symbol, ...d})));
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
