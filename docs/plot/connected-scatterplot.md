---
source: https://observablehq.com/@observablehq/plot-connected-scatterplot
index: true
---

# Connected scatterplot

There is no requirement that **y** be dependent on **x**; [lines](https://observablehq.com/plot/marks/line) can be used in connected scatterplots to show two independent (but often correlated) variables. The chart below recreates Hannah Fairfield’s [“Driving Shifts Into Reverse”](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html) from 2009.

```js echo
const chart = Plot.plot({
  inset: 10,
  grid: true,
  x: {label: "Miles driven (per person-year) →"},
  y: {label: "↑ Cost of gasoline ($ per gallon)"},
  marks: [
    Plot.line(driving, {
      x: "miles",
      y: "gas",
      curve: "catmull-rom",
      marker: true
    }),
    Plot.text(driving, {
      filter: (d) => d.year % 5 === 0,
      x: "miles",
      y: "gas",
      text: (d) => `${d.year}`,
      dy: -8
    })
  ]
});

display(chart);
```

```js echo
const driving = FileAttachment("../data/driving.csv").csv({typed: true});
```
