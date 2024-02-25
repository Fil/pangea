---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Marimekko</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Marimekko

This Marimekko chart is a two-level “slice-and-dice” [treemap](/@d3/treemap).

```js echo
const chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const height = width;
  const marginTop = 30;
  const marginRight = -1;
  const marginBottom = -1;
  const marginLeft = 1;

  // Create the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10).domain(sales.map(d => d.segment));

  // Compute the layout.
  const treemap = data => d3.treemap()
      .round(true)
      .tile(d3.treemapSliceDice)
      .size([
        width - marginLeft - marginRight,
        height - marginTop - marginBottom
      ])
    (d3.hierarchy(d3.group(data, d => d.market, d => d.segment)).sum(d => d.value))
    .each(d => {
      d.x0 += marginLeft;
      d.x1 += marginLeft;
      d.y0 += marginTop;
      d.y1 += marginTop;
    });
  const root = treemap(sales);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Position the nodes.
  const node = svg.selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

  const format = d => d.toLocaleString();

  // Draw column labels.
  const column = node.filter(d => d.depth === 1);

  column.append("text")
      .attr("x", 3)
      .attr("y", "-1.7em")
      .style("font-weight", "bold")
      .text(d => d.data[0]);

  column.append("text")
      .attr("x", 3)
      .attr("y", "-0.5em")
      .attr("fill-opacity", 0.7)
      .text(d => format(d.value));

  column.append("line")
      .attr("x1", -0.5)
      .attr("x2", -0.5)
      .attr("y1", -30)
      .attr("y2", d => d.y1 - d.y0)
      .attr("stroke", "#000")

  // Draw leaves.
  const cell = node.filter(d => d.depth === 2);

  cell.append("rect")
      .attr("fill", d => color(d.data[0]))
      .attr("fill-opacity", (d, i) => d.value / d.parent.value)
      .attr("width", d => d.x1 - d.x0 - 1)
      .attr("height", d => d.y1 - d.y0 - 1);

  cell.append("text")
      .attr("x", 3)
      .attr("y", "1.1em")
      .text(d => d.data[0]);

  cell.append("text")
      .attr("x", 3)
      .attr("y", "2.3em")
      .attr("fill-opacity", 0.7)
      .text(d => format(d.value));

  return svg.node();
}
```

```js echo
const sales = FileAttachment("sales.csv").csv({typed: true});
```

For the [Observable Plot](/plot/) version, see [the Plot: Marimekko](https://observablehq.com/@observablehq/plot-marimekko) notebook.
