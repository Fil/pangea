---
source: https://observablehq.com/@d3/line-chart-missing-data/2
index: true
---

# Line chart, missing data

This [line chart](./line-chart) uses [_line_.defined](https://d3js.org/d3-shape/line#line_defined) to show gaps for missing data. The defined function considers NaN and undefined to be missing. A second area shows linear interpolation for the gaps. Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js echo
// Declare the chart dimensions and margins.
const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc(d3.extent(aapl, d => d.Date), [marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear([0, d3.max(aapl, d => d.Close)], [height - marginBottom, marginTop]);

// Declare the line generator.
const line = d3.line()
    .defined(d => !isNaN(d.Close))
    .x(d => x(d.Date))
    .y(d => y(d.Close));

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

// Add the y-axis, remove the domain line, add grid lines and a label.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));

// Append a path for the line.
svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1.5)
    .attr("d", line(aaplMissing.filter(d => !isNaN(d.Close))));

// Append a path for the line.
svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(aaplMissing));

display(svg.node());
```

```js echo
const aapl = FileAttachment("/data/aapl.csv").csv({typed: true});
```

```js echo
const aaplMissing = aapl.map((d) => ({
  ...d,
  Close: d.Date.getUTCMonth() < 3 ? NaN : d.Close
})); // simulate gaps
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a line chart with the [line mark](https://observablehq.com/plot/marks/line). Below, a [rule mark](https://observablehq.com/plot/marks/rule) denotes _y_ = 0.

```js echo
Plot.plot({
  y: {grid: true, label: "Daily close ($)"},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(aaplMissing, {
      filter: (d) => !isNaN(d.Close),
      x: "Date",
      y: "Close",
      stroke: "#ccc"
    }),
    Plot.lineY(aaplMissing, {x: "Date", y: "Close", stroke: "steelblue"})
  ]
})
```
