---
source: https://observablehq.com/@d3/stacked-area-chart/2
index: true
---

# Stacked area chart

This chart shows unemployed persons by industry, 2000–2010. Compare to a [streamgraph](./streamgraph) and [normalized stacked area](./normalized-stacked-area-chart). Data: [BLS](https://www.bls.gov/)

```js
Swatches(chart.scales.color, {columns: "180px"})
```

```js echo
// Specify the chart’s dimensions.
const width = 928;
const height = 500;
const marginTop = 10;
const marginRight = 10;
const marginBottom = 20;
const marginLeft = 40;

// Determine the series that need to be stacked.
const series = d3.stack()
    .keys(d3.union(data.map(d => d.industry))) // distinct series keys, in input order
    .value(([, D], key) => D.get(key).unemployed) // get value for each series key and stack
  (d3.index(data, d => d.date, d => d.industry)); // group by stack then series key

// Prepare the scales for positional and color encodings.
const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([marginLeft, width - marginRight]);

const y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - marginBottom, marginTop]);

const color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeTableau10);

// Construct an area shape.
const area = d3.area()
    .x(d => x(d.data[0]))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add the y-axis, remove the domain line, add grid lines and a label.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Unemployed persons"));

// Append a path for each series.
svg.append("g")
  .selectAll()
  .data(series)
  .join("path")
    .attr("fill", d => color(d.key))
    .attr("d", area)
  .append("title")
    .text(d => d.key);

// Append the horizontal axis atop the area.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

// Return the chart with the color scale as a property (for the legend).
const chart = display(Object.assign(svg.node(), {scales: {color}}));
```

```js echo
const data = FileAttachment("/data/unemployment.csv").csv({typed: true});
```

```js echo
import {Swatches} from "/components/color-legend.js";
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a similar chart with an [area mark](https://observablehq.com/plot/marks/area). See the [Plot: Stacked area chart](https://observablehq.com/@observablehq/plot-stacked-area-chart) example notebook.

```js echo
Plot.plot({
  marginLeft: 60,
  y: {grid: true},
  color: {legend: true, columns: 6},
  marks: [Plot.areaY(data, {x: "date", y: "unemployed", fill: "industry"}), Plot.ruleY([0])]
})
```
