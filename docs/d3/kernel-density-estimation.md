<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Kernel density estimation</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Kernel density estimation

[KDE](https://en.wikipedia.org/wiki/Kernel_density_estimation) estimates the probability distribution of a random variable. The kernel’s *bandwidth* determines the estimate’s smoothness: if the bandwidth is too small, the estimate may include spurious bumps and wiggles; too large, and the estimate reveals little about the underlying distribution.

This example, based on [work by John Firebaugh](https://bl.ocks.org/jfirebaugh/900762), shows times between eruptions of [Old Faithful](https://en.wikipedia.org/wiki/Old_Faithful). See also a [two-dimensional density estimation](/@d3/density-contours) of this data.

```js
viewof bandwidth = Inputs.range([1, 20], {value: 7, step: 0.1, label: "Bandwidth"})
```

```js
// For the sake of simplicity, use Plot to draw the output; for the equivalent D3 chart, see
// https://observablehq.com/@d3/kernel-density-estimation@172
chart = Plot.plot({
  width: 928,
  height: 500,
  x: {label: "Time between eruptions (min.)"},
  y: {label: null, tickFormat: "%", grid: true},
  marks: [
    Plot.rectY(data, Plot.binX({y: "proportion"}, {thresholds, fill: "#bbb"})),
    Plot.ruleY([0]),
    Plot.line(density, {curve: "basis"})
  ]
})
```

```js echo
thresholds = d3.ticks(...d3.nice(...d3.extent(data), 10), 40)
```

```js echo
function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}
```

```js echo
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}
```

```js echo
density = kde(epanechnikov(bandwidth), thresholds, data)
```

```js echo
data = FileAttachment("faithful.json").json()
```
