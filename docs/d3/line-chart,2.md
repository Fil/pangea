---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Line chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Line chart

This time-series line chart shows the daily close of Apple stock. Compare to a [log _y_-scale showing change](/@d3/change-line-chart), an [area chart](/@d3/area-chart/2), a [horizon chart](/@d3/horizon-chart-ii), a [candlestick chart](/@d3/candlestick-chart), and an [index chart](/@d3/index-chart). For multiple series, use a [multi-line chart](/@d3/multi-line-chart). Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js echo
const chart = {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear([0, d3.max(aapl, d => d.close)], [height - marginBottom, marginTop]);

  // Declare the line generator.
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

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
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(aapl));

  return svg.node();
}
```

```js echo
const aapl = FileAttachment("aapl.csv").csv({typed: true});
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a line chart with the [line mark](https://observablehq.com/plot/marks/line). Below, a [rule mark](https://observablehq.com/plot/marks/rule) denotes _y_ = 0.

```js echo
Plot.plot({
  y: {grid: true, label: "Daily close ($)"},
  marks: [Plot.ruleY([0]), Plot.lineY(aapl, {x: "date", y: "close", stroke: "steelblue"})]
});
```
