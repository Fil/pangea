---
source: https://observablehq.com/@observablehq/plot-barley-trellis
index: true
---

# Barley Trellis

The [Trellis display](https://www.jstor.org/stable/1390777) by Becker _et al._ helped establish small multiples as a “powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables”. Here we reproduce a trellis of Barley yields from the 1930s, complete with main-effects ordering—using the [**sort** mark option](https://observablehq.com/plot/features/scales#sort-mark-option)— to facilitate comparison.

Notice anything unusual about one of the sites? This anomaly led Becker _et al._ to suspect a major error with the data that went undetected for six decades.

```js echo
const chart = Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(barley, {
      x: "yield",
      y: "variety",
      fy: "site",
      stroke: "year",
      sort: {y: "x", fy: "x", reduce: "median", reverse: true}
    })
  ]
});

display(chart);
```

```js echo
const barley = FileAttachment("../data/barley.csv").csv({typed: true});
```
