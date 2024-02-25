<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line with missing data</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line with missing data

If some channel values are undefined (or null or NaN), gaps will appear between adjacent points of a [line](https://observablehq.com/plot/marks/line) mark. To demonstrate, below we set the **y** value to NaN for the first three months of each year.

```js echo
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close})
  ]
})
```

Contrast with a chart where missing values have been filtered out:

```js echo
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {filter: (d) => d.Date.getUTCMonth() >= 3, x: "Date", y: "Close", strokeOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close})
  ]
})
```
