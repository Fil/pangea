---
source: https://observablehq.com/@d3/area-chart/2
index: true
---

# Area chart

This time-series chart shows the daily close of Apple stock. Compare to a [line chart](./line-chart). Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js echo
// Declare the chart dimensions and margins.
const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc(
  d3.extent(aapl, (d) => d.Date),
  [marginLeft, width - marginRight]
);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear([0, d3.max(aapl, (d) => d.Close)], [height - marginBottom, marginTop]);

// Declare the area generator.
const area = d3
  .area()
  .x((d) => x(d.Date))
  .y0(y(0))
  .y1((d) => y(d.Close));

// Create the SVG container.
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// Append a path for the area (under the axes).
svg.append("path").attr("fill", "var(--theme-foreground-focus)").attr("d", area(aapl));

// Add the x-axis.
svg
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
  );

// Add the y-axis, remove the domain line, add grid lines and a label.
svg
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y).ticks(height / 40))
  .call((g) => g.select(".domain").remove())
  .call((g) =>
    g
      .selectAll(".tick line")
      .clone()
      .attr("x2", width - marginLeft - marginRight)
      .attr("stroke-opacity", 0.1)
  )
  .call((g) =>
    g
      .append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("↑ Daily close ($)")
  );

display(svg.node());
```

```js echo
const aapl = FileAttachment("../data/aapl.csv").csv({typed: true});
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a area chart with the [area mark](https://observablehq.com/plot/marks/area). Below, a [rule mark](https://observablehq.com/plot/marks/rule) denotes _y_ = 0. (The **y1** option is used instead of **y** because the _aapl_ dataset includes a few duplicate rows.)

```js echo
const chart2 = Plot.plot({
  y: {grid: true, label: "Daily close ($)"},
  marks: [Plot.ruleY([0]), Plot.areaY(aapl, {x: "Date", y1: "Close", fill: "var(--theme-foreground-focus)"})]
});

display(chart2);
```
