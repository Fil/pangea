<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Correlation heatmap</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Correlation heatmap

Select a dataset to display the correlation between its dimensions as colored [cells](https://observablehq.com/plot/marks/cell). The [text](https://observablehq.com/plot/marks/text) fill is black or white, depending on the value, to enhance readability.

```js
viewof data = Inputs.select(
  new Map([
    ["cars", cars],
    ["penguins", penguins],
    ["olympians", olympians]
  ]),
  { label: "dataset" }
)
```

```js
viewof fields = Inputs.checkbox(data.columns, {
  label: "fields",
  value: data.columns.filter((c) => data.find((d) => typeof d[c] === "number"))
})
```

```js echo
Plot.plot({
  marginLeft: 100,
  label: null,
  color: { scheme: "rdylbu", pivot: 0, legend: true, label: "correlation" },
  marks: [
    Plot.cell(correlations, { x: "a", y: "b", fill: "correlation" }),

    Plot.text(correlations, {
      x: "a",
      y: "b",
      text: (d) => d.correlation.toFixed(2),
      fill: (d) => (Math.abs(d.correlation) > 0.6 ? "white" : "black")
    })
  ]
})
```

```js echo
correlations = d3.cross(fields, fields).map(([a, b]) => ({
  a,
  b,
  correlation: corr(Plot.valueof(data, a), Plot.valueof(data, b))
}))
```

```js echo
// https://en.wikipedia.org/wiki/Correlation#Sample_correlation_coefficient
function corr(x, y) {
  const n = x.length;
  if (y.length !== n)
    throw new Error("The two columns must have the same length.");
  const x_ = d3.mean(x);
  const y_ = d3.mean(y);
  const XY = d3.sum(x, (_, i) => (x[i] - x_) * (y[i] - y_));
  const XX = d3.sum(x, (d) => (d - x_) ** 2);
  const YY = d3.sum(y, (d) => (d - y_) ** 2);
  return XY / Math.sqrt(XX * YY);
}
```
