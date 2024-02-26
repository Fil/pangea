---
source: https://observablehq.com/@observablehq/plot-warming-stripes
index: true
---

# Warming stripes

A [bar](https://observablehq.com/plot/marks/bar)’s ordinal dimension is optional; if missing, the bar spans the chart along this dimension. Such bars typically also have a [color](https://observablehq.com/plot/features/scales#color-scales) encoding. For example, here are [warming stripes](https://showyourstripes.info/) showing the increase in average temperature globally over the last 172 years.

```js echo
const chart = Plot.plot({
  x: {round: true},
  color: {scheme: "BuRd"},
  marks: [
    Plot.barX(hadcrut, {
      x: "year",
      fill: "anomaly",
      interval: "year", // yearly data
      inset: 0 // no gaps
    })
  ]
});

display(chart);
```

```js echo
const hadcrut = (await FileAttachment("../data/hadcrut-annual.txt").text())
  .trim()
  .split(/\n/g) // split into lines
  .map((line) => line.split(/\s+/g)) // split each line into fields
  .map(([year, anomaly]) => ({
    // extract the year and median anomaly
    year: new Date(Date.UTC(year, 0, 1)),
    anomaly: +anomaly
  }));
```
