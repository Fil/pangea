---
source: https://observablehq.com/@d3/pie-chart/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Pie chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Pie chart

This chart shows the estimated population by age in the United States as of 2015. The total estimated population is ${d3.sum(data, d => d.value).toLocaleString("en-US")}. Compare to a [donut chart](/@d3/donut-chart/2?intent=fork). Data: [U.S. Census](https://www.census.gov/data.html)

```js echo
const chart = {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = Math.min(width, 500);

  // Create the color scale.
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

  // Create the pie layout and arc generator.
  const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

  const labelRadius = arc.outerRadius()() * 0.8;

  // A separate arc generator for labels.
  const arcLabel = d3.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

  const arcs = pie(data);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Add a sector path for each value.
  svg.append("g")
      .attr("stroke", "white")
    .selectAll()
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

  // Create a new arc generator to place a label close to the edge.
  // The label shows the value if there is enough room.
  svg.append("g")
      .attr("text-anchor", "middle")
    .selectAll()
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString("en-US")));

  return svg.node();
}
```

```js echo
const data = FileAttachment("population-by-age.csv").csv({typed: true});
```
