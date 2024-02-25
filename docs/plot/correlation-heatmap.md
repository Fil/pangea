---
source: https://observablehq.com/@fil/correlation-heatmap
index: true
---

# Correlation heatmap

Select a dataset to display the correlation between its dimensions as colored [cells](https://observablehq.com/plot/marks/cell). The [text](https://observablehq.com/plot/marks/text) fill is black or white, depending on the value, to enhance readability.

```js
const data = view(
  Inputs.select(
    new Map([
      ["cars", cars],
      ["penguins", penguins],
      ["olympians", olympians]
    ]),
    {label: "dataset"}
  )
);
```

```js
const fields = view(
  Inputs.checkbox(data.columns, {
    label: "fields",
    value: data.columns.filter((c) => data.find((d) => typeof d[c] === "number"))
  })
);
```

```js echo
const chart = Plot.plot({
  marginLeft: 100,
  label: null,
  color: {scheme: "rdylbu", pivot: 0, legend: true, label: "correlation"},
  marks: [
    Plot.cell(correlations, {x: "a", y: "b", fill: "correlation"}),
    Plot.text(correlations, {
      x: "a",
      y: "b",
      text: (d) => d.correlation.toFixed(2),
      fill: (d) => (Math.abs(d.correlation) > 0.6 ? "white" : "black")
    })
  ]
});

display(chart);
```

```js echo
const correlations = d3
  .cross(fields, fields)
  .map(([a, b]) => ({a, b, correlation: corr(Plot.valueof(data, a), Plot.valueof(data, b))}));

display(correlations);
```

```js echo
// https://en.wikipedia.org/wiki/Correlation#Sample_correlation_coefficient
function corr(x, y) {
  const n = x.length;
  if (y.length !== n) throw new Error("The two columns must have the same length.");
  const x_ = d3.mean(x);
  const y_ = d3.mean(y);
  const XY = d3.sum(x, (_, i) => (x[i] - x_) * (y[i] - y_));
  const XX = d3.sum(x, (d) => (d - x_) ** 2);
  const YY = d3.sum(y, (d) => (d - y_) ** 2);
  return XY / Math.sqrt(XX * YY);
}
```
