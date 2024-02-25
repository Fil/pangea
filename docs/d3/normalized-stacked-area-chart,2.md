---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Normalized stacked area chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Normalized stacked area chart

This chart shows unemployed persons by industry, 2000–2010. Compare to a [streamgraph](/@d3/streamgraph/2?intent=fork) and [zero-baseline stacked area](/@d3/stacked-area-chart/2?intent=fork). Data: [BLS](https://www.bls.gov/)

```js
const key = Swatches(chart.scales.color, {columns: "180px"});
```

```js echo
const chart = {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 40;

  // Determine the series that need to be stacked.
  const series = d3.stack()
      .offset(d3.stackOffsetExpand)
      .keys(d3.union(unemployment.map(d => d.industry))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).unemployed) // get value for each series key and stack
    (d3.index(unemployment, d => d.date, d => d.industry)); // group by stack then series key

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleUtc()
      .domain(d3.extent(unemployment, d => d.date))
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
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

  // Append a path for each series.
  svg.append("g")
    .selectAll()
    .data(series)
    .join("path")
      .attr("fill", d => color(d.key))
      .attr("d", area)
    .append("title")
      .text(d => d.key);

  // Append the x axis, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(g => g.select(".domain").remove());

  // Add the y axis, remove the domain line, add grid lines and a label.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 80, "%"))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .filter(d => d === 0 || d === 1)
        .clone()
          .attr("x2", width - marginLeft - marginRight))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Unemployed persons"));

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), {scales: {color}});
}
```

```js echo
const unemployment = FileAttachment("unemployment.csv").csv({typed: true});
```

```js echo
import {Swatches} from "@d3/color-legend";
```
