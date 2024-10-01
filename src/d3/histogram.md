---
source: https://observablehq.com/@d3/histogram/2
index: true
---

# Histogram

A histogram visualizes a one-dimensional distribution by grouping continuous values into discrete bins. This example shows the unemployment rate of U.S. counties as of August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables)

```js echo
// Declare the chart dimensions and margins.
const width = 960;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Bin the data.
const bins = d3.bin()
    .thresholds(40)
    .value((d) => d.rate)
  (unemployment);

// Declare the x (horizontal position) scale.
const x = d3.scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add a rect for each bin.
svg.append("g")
    .attr("fill", "steelblue")
  .selectAll()
  .data(bins)
  .join("rect")
    .attr("x", (d) => x(d.x0) + 1)
    .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
    .attr("y", (d) => y(d.length))
    .attr("height", (d) => y(0) - y(d.length));

// Add the x-axis and label.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call((g) => g.append("text")
        .attr("x", width)
        .attr("y", marginBottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Unemployment rate (%) →"));

// Add the y-axis and label, and remove the domain line.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (no. of counties)"));

// Display the SVG element.
display(svg.node());
```

```js echo
const unemployment = FileAttachment("/data/unemployment-by-county.csv").csv({typed: true});
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a histogram with the [bin transform](https://observablehq.com/plot/transforms/bin) and the [rect mark](https://observablehq.com/plot/marks/rect). Below, a [rule mark](https://observablehq.com/plot/marks/rule) also denotes _y_ = 0.

```js echo
Plot.plot({
  width: 960,
  height: 500,
  marks: [Plot.rectY(unemployment, Plot.binX({y: "count"}, {x: "rate", fill: "steelblue"})), Plot.ruleY([0])]
})
```

Or, as a single line of code with [Observable Plot](https://observablehq.com/plot/):

```js echo
Plot.rectY(unemployment, Plot.binX({y: "count"}, {x: "rate"})).plot()
```
