---
source: https://observablehq.com/@d3/kernel-density-estimation
index: true
---

# Kernel density estimation

[KDE](https://en.wikipedia.org/wiki/Kernel_density_estimation) estimates the probability distribution of a random variable. The kernel’s _bandwidth_ determines the estimate’s smoothness: if the bandwidth is too small, the estimate may include spurious bumps and wiggles; too large, and the estimate reveals little about the underlying distribution.

This example, based on [work by John Firebaugh](https://gist.github.com/jfirebaugh/900762), shows times between eruptions of [Old Faithful](https://en.wikipedia.org/wiki/Old_Faithful). See also a [two-dimensional density estimation](/d3/density-contours) of this data.

```js
const bandwidth = view(Inputs.range([1, 20], {value: 7, step: 0.1, label: "Bandwidth"}));
```

```js
// For the sake of simplicity, use Plot to draw the output; the equivalent D3 chart is commented below
Plot.plot({
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
const thresholds = d3.ticks(...d3.nice(...d3.extent(data), 10), 40);
```

```js echo
function kde(kernel, thresholds, data) {
  return thresholds.map((t) => [t, d3.mean(data, (d) => kernel(t - d))]);
}
```

```js echo
function epanechnikov(bandwidth) {
  return (x) => (Math.abs((x /= bandwidth)) <= 1 ? (0.75 * (1 - x * x)) / bandwidth : 0);
}
```

```js echo
const density = kde(epanechnikov(bandwidth), thresholds, data);
```

```js echo
const data = FileAttachment("/data/faithful.tsv").tsv({typed: true}).then(data => data.map(d => d.waiting));
```

```js
/*

// Specify the chart’s dimensions.
const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;

// Create the horizontal scale *x*.
const x = d3.scaleLinear()
    .domain(d3.extent(data)).nice()
    .range([marginLeft, width - marginRight]);

// Bin the data on *x*.
const bins = d3.bin()
    .domain(x.domain())
    .thresholds(thresholds)
  (data);

// Compute the vertical scale *y*.
const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) / data.length])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

// Append a rect for each bin.
svg.append("g")
    .attr("fill", "#bbb")
  .selectAll("rect")
  .data(bins)
  .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length / data.length))
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => y(0) - y(d.length / data.length));

// Append the kernel-density-estimation line.
const line = d3.line()
    .curve(d3.curveBasis)
    .x(d => x(d[0]))
    .y(d => y(d[1]));

svg.append("path")
    .datum(density)
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("d", line);

// Append the axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.append("text")
        .attr("x", width - marginRight)
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text("Time between eruptions (min.)"));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(null, "%"))
    .call(g => g.select(".domain").remove());

display(svg.node());
*/
```
