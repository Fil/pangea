---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Gradient encoding</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Gradient encoding

This variation of a [line chart](/@d3/line-chart) uses a gradient to change the line color based on its _y_-value. For a related technique along the _x_-axis, see [variable-color line](/@d3/variable-color-line).

```js
Legend(chart.scales.color, {title: "Temperature °F"});
```

```js echo
const chart = {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the scales.
  const x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.temperature)).nice()
      .range([height - marginBottom, marginTop]);

  const color = d3.scaleSequential(y.domain(), d3.interpolateTurbo);

  // Create the path generator.
  const line = d3.line()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.temperature))
    .x(d => x(d.date))
    .y(d => y(d.temperature));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
     .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
     .call(g => g.select(".tick:last-of-type text").append("tspan").text("°F"));

  // Append the color gradient.
  const gradient = DOM.uid();
  svg.append("linearGradient")
      .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - marginBottom)
      .attr("x2", 0)
      .attr("y2", marginTop)
    .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
    .join("stop")
      .attr("offset", d => d)
      .attr("stop-color", color.interpolator());

  // Append the line.
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", gradient)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return Object.assign(svg.node(), {scales: {color}});
}
```

```js echo
const data = FileAttachment("temperature.csv").csv({typed: true});
```

```js echo
import {Legend} from "@d3/color-legend";
```

Using [Observable Plot](/plot/)’s concise API, you can get a quick approximation of that chart (below). For a more elaborate solution with a gradient encoding, see [this notebook](https://observablehq.com/@observablehq/plot-gradient-encoding?intent=fork).

```js echo
Plot.line(data, {
  x: "date",
  y: "temperature",
  z: null,
  stroke: "temperature",
  curve: "step-before"
}).plot({nice: true});
```
