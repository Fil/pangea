---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Scatterplot matrix</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Scatterplot matrix

The scatterplot matrix (SPLOM) shows pairwise correlations for multi-dimensional data; each cell is a scatterplot where _x_ encodes the column’s dimension and _y_ encodes the row’s dimension. This matrix shows Kristen Gorman’s data on penguins near Palmer Station in Antarctica. See also the [brushable](/@d3/brushable-scatterplot-matrix) version.

```js
swatches({color: chart.scales.color});
```

```js echo
const chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const height = width;
  const padding = 28;
  const columns = data.columns.filter(d => typeof data[0][d] === "number");
  const size = (width - (columns.length + 1) * padding) / columns.length + padding;

  // Define the horizontal scales (one for each row).
  const x = columns.map(c => d3.scaleLinear()
      .domain(d3.extent(data, d => d[c]))
      .rangeRound([padding / 2, size - padding / 2]))

  // Define the companion vertical scales (one for each column).
  const y = x.map(x => x.copy().range([size - padding / 2, padding / 2]));

  // Define the color scale.
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.species))
      .range(d3.schemeCategory10);

  // Define the horizontal axis (it will be applied separately for each column).
  const axisx = d3.axisBottom()
      .ticks(6)
      .tickSize(size * columns.length);
  const xAxis = g => g.selectAll("g").data(x).join("g")
      .attr("transform", (d, i) => `translate(${i * size},0)`)
      .each(function(d) { return d3.select(this).call(axisx.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

  // Define the vertical axis (it will be applied separately for each row).
  const axisy = d3.axisLeft()
      .ticks(6)
      .tickSize(-size * columns.length);
  const yAxis = g => g.selectAll("g").data(y).join("g")
      .attr("transform", (d, i) => `translate(0,${i * size})`)
      .each(function(d) { return d3.select(this).call(axisy.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-padding, 0, width, height]);

  svg.append("style")
      .text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const cell = svg.append("g")
    .selectAll("g")
    .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
    .join("g")
      .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

  cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("x", padding / 2 + 0.5)
      .attr("y", padding / 2 + 0.5)
      .attr("width", size - padding)
      .attr("height", size - padding);

  cell.each(function([i, j]) {
    d3.select(this).selectAll("circle")
      .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
      .join("circle")
        .attr("cx", d => x[i](d[columns[i]]))
        .attr("cy", d => y[j](d[columns[j]]));
  });

  const circle = cell.selectAll("circle")
      .attr("r", 3.5)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.species));

  svg.append("g")
      .style("font", "bold 10px sans-serif")
      .style("pointer-events", "none")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(d => d);

  return Object.assign(svg.node(), {scales: {color}});
}
```

```js echo
const data = FileAttachment("penguins.csv").csv({typed: true});
```

```js echo
import {swatches} from "@d3/color-legend";
```
