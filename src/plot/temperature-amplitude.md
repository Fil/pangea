---
source: https://observablehq.com/@observablehq/plot-temperature-amplitude
index: true
---

# Seattle temperature amplitude

Shows the difference between daily high and low against the low, and highlights the day with the greatest variation. Uses [formats](https://observablehq.com/plot/features/formats), the [select](https://observablehq.com/plot/transforms/select) transform, and a [function accessor](https://observablehq.com/plot/features/marks#marks-have-channels). Data: [NOAA/Vega](https://github.com/vega/vega-datasets/blob/master/scripts/weather.py)

```js echo
const chart = Plot.plot({
  x: {label: "Daily low temperature (°F) →", nice: true},
  y: {label: "↑ Daily temperature variation (Δ°F)", zero: true},
  aspectRatio: 1,
  color: {
    type: "cyclical",
    legend: true,
    tickFormat: Plot.formatMonth()
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(temps, {
      fill: (d) => d.date.getUTCMonth(),
      x: "temp_min",
      y: delta
    }),
    Plot.dot(temps, Plot.selectMaxY({x: "temp_min", y: delta, r: 5})),
    Plot.text(
      temps,
      Plot.selectMaxY({
        x: "temp_min",
        y: delta,
        text: "date",
        lineAnchor: "bottom",
        dy: -10
      })
    )
  ]
});

display(chart);
```

```js echo
const delta = (d) => d.temp_max - d.temp_min;
```

```js echo
const temps = FileAttachment("../data/seattle-weather.csv").csv({typed: true});
```
