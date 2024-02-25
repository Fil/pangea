---
source: https://observablehq.com/@observablehq/plot-seattle-temperature-heatmap
index: true
---

# Seattle temperature temporal heatmap

A calendar with a [cell](https://observablehq.com/plot/marks/cell) for each day (_x_) of each month (_y_), [colored](https://observablehq.com/plot/features/scales#color-scales) by maximum temperature on that day.

```js echo
const chart = Plot.plot({
  padding: 0,
  y: {tickFormat: Plot.formatMonth("en", "short")},
  marks: [
    Plot.cell(
      seattle,
      Plot.group(
        {fill: "max"},
        {
          x: (d) => d.date.getUTCDate(),
          y: (d) => d.date.getUTCMonth(),
          fill: "temp_max",
          inset: 0.5
        }
      )
    )
  ]
});

display(chart);
```

```js echo
const seattle = FileAttachment("../data/seattle-weather.csv").csv({typed: true});
```
