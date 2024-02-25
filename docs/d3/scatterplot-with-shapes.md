---
source: https://observablehq.com/@d3/scatterplot-with-shapes
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Scatterplot with shapes</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Scatterplot with shapes

This chart shows the relationship between sepal width (_y_-axis) and sepal length (_x_-axis) for three species of Iris.

```js
const legend = {
  const id = DOM.uid().id;
  const {color, shape} = chart.scales;
  return html`<style>

.${id} {
  display: flex;
  min-height: 33px;
  font: 10px sans-serif;
  margin-left: 20px;
}

.${id}-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

</style>
<div class="${id}">${color.domain().map((name, i) => html`
  <div class="${id}-item" title="${data.labels === undefined ? "" : (data.labels[i] + "").replace(/"/g, "&quot;")}">
    <svg viewBox="-10 -10 20 20" width="20" height="20" style="margin-right: 3px;">
      <path fill="${color(name)}" d="${shape(name)}"></path>
    </svg>
    ${name}
  </div>`)}
</div>`;
}
```

```js echo
const chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const height = 600;
  const marginTop = 25;
  const marginRight = 20;
  const marginBottom = 35;
  const marginLeft = 40;

  // Create the positional scales.
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.sepalLength)).nice()
    .range([marginLeft, width - marginRight]);
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.sepalWidth)).nice()
    .range([height - marginBottom, marginTop]);

  // Create the categorical scales.
  const color = d3.scaleOrdinal(data.map(d => d.species), d3.schemeCategory10);
  const shape = d3.scaleOrdinal(data.map(d => d.species), d3.symbols.map(s => d3.symbol().type(s)()));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  // Append the axes.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Sepal length (cm) →"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Sepal width (cm)"));

  // Add a grid.
  svg.append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call(g => g.append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
          .attr("x1", d => 0.5 + x(d))
          .attr("x2", d => 0.5 + x(d))
          .attr("y1", marginTop)
          .attr("y2", height - marginBottom))
      .call(g => g.append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
          .attr("y1", d => 0.5 + y(d))
          .attr("y2", d => 0.5 + y(d))
          .attr("x1", marginLeft)
          .attr("x2", width - marginRight));

  // Add the scatterplot symbols.
  svg.append("g")
      .attr("stroke-width", 1.5)
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("path")
    .data(data)
    .join("path")
      .attr("transform", d => `translate(${x(d.sepalLength)},${y(d.sepalWidth)})`)
      .attr("fill", d => color(d.species))
      .attr("d", d => shape(d.species));

  return Object.assign(svg.node(), {scales: {color, shape}});
}
```

```js echo
const data = FileAttachment("iris.csv").csv({typed: true});
```

Or, using [Observable Plot](/plot/)’s concise API:

```js echo
Plot.dot(data, {
  x: "sepalLength",
  y: "sepalWidth",
  fill: "species",
  symbol: "species"
}).plot({
  nice: true,
  grid: true,
  symbol: {legend: true}
});
```
