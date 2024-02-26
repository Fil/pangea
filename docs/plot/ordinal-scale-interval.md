---
source: https://observablehq.com/@observablehq/plot-ordinal-scale-interval
index: true
---

# Ordinal scale interval

Use the [interval scale option](https://observablehq.com/plot/features/scales#interval) to make sure that missing data is not invisibly skipped. See also [a variant for time scales](https://observablehq.com/@observablehq/plot-ordinal-bar-chart).

```js
const checked = view(Inputs.toggle({label: "interval", value: true}));
```

```js echo
const chart = Plot.barY(timeseries, {x: "year", y: "population"}).plot({
  x: {tickFormat: "", interval: checked ? 1 : undefined}
});

display(chart);
```

```js echo
const timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  // {year: 2018, population: 7631.091040},
  {year: 2019, population: 7713.4681},
  {year: 2020, population: 7794.798739}
];
```
