---
index: true
---

# Diverging horizon chart

This [horizon chart](./horizon) represents negative values in purples and positive values in greens, and shows the price of several stocks relative to May 2013. Compare to a [line chart](./simple-line-chart) and an [area chart](./area-chart).

Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js
const mirror = view(Inputs.toggle({label: "Mirror negative"}));
const overlap = view(Inputs.range([1, 8], {label: "Overlap", value: 5, step: 0.05}));
```

```js echo
Plot.plot({
  width,
  height: 400,
  marginLeft: 0,
  x: {axis: "top"},
  y: {domain: [0, step], axis: null},
  fy: {label: null},
  color: {type: "diverging", ...(dark ? {interpolate: interpolatePiDG} : {scheme: "PiYG"})},
  clip: "frame",
  marks: [
    steps.map((band) =>
      Plot.areaY(data, {
        x: "date",
        ...(band < 0 && mirror ? {
          y1: band,
          y2: (d) => -d.value + band + step
        } : {
          y1: -band,
          y2: (d) => d.value - band
        }),
        fill: band + (band >= 0) * step / 2,
        fy: "key"
      })),
    // Plot.frame(),
    Plot.axisFy({frameAnchor: "left"})
  ]
})
```

```js echo
const extent = d3.extent(data, (d) => d.value);
const step = d3.max(extent, Math.abs) / overlap;
const steps = [
  ...d3.range(0, Math.floor(extent[0] / step) - 1, -1),
  ...d3.range(0, Math.ceil(extent[1] / step))
].map((d) => d * step);
```

```js echo
const data = (await Promise.all([
  FileAttachment("../data/aapl.csv"),
  FileAttachment("../data/amzn.csv"),
  FileAttachment("../data/goog.csv"),
  FileAttachment("../data/ibm.csv"),
  FileAttachment("../data/msft.csv")
].map(async (file) => {
  const values = await file.csv({typed: true});
  const v = values[0].Close;
  const key = file.name.slice(0, -4);
  return values.map(({Date, Close}) => ({key, date: Date, value: Math.log(Close / v)}))
}))).flat();
```

```js echo
import {interpolatePiDG} from "/components/dark.js"
```
