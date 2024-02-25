---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Text dodge</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Text dodge

The [text](https://observablehq.com/plot/marks/text) mark displays each company’s valuation at IPO; the layout is computed with the [dodge](https://observablehq.com/plot/transforms/dodge) transform. Data: see [The Facebook IPO](/@observablehq/plot-the-facebook-ipo).

```js echo
Plot.plot({
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
```

```js echo
const ipos = FileAttachment("ipos.csv").csv({typed: true});
```
