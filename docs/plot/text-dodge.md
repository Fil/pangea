---
source: https://observablehq.com/@observablehq/plot-text-dodge
index: true
---

# Text dodge

The [text](https://observablehq.com/plot/marks/text) mark displays each company’s valuation at IPO; the layout is computed with the [dodge](https://observablehq.com/plot/transforms/dodge) transform. Data: see [The Facebook IPO](https://observablehq.com/@observablehq/plot-the-facebook-ipo).

```js echo
const chart = Plot.plot({
  insetRight: 10,
  height: 790,
  style: "overflow: visible;",
  marks: [
    Plot.text(
      ipos,
      Plot.dodgeY({
        x: "date",
        r: "rMVOP",
        text: (d) => (d.rMVOP / 1e3).toFixed(1),
        title: "NAME",
        fontSize: (d) => Math.min(22, Math.cbrt(d.rMVOP / 1e3) * 6)
      })
    )
  ]
});

display(chart);
```

```js echo
const ipos = FileAttachment("../data/ipos.csv").csv({typed: true});
```
