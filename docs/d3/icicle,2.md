<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Icicle</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Icicle

This space-filling visualization, the Cartesian equivalent to a [sunburst](/@d3/sunburst/2?intent=fork), shows the cumulative values of subtrees. It is commonly used to visualize software packages (the size of source code within nested packages) and file systems (the size of files within nested folders). See also the [zoomable version](/@d3/zoomable-icicle).

```js echo
chart = {
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 2400;
  const format = d3.format(",d");

  // Create a color scale (a color for each child of the root node and their descendants).
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

  // Create a partition layout.
  const partition = d3.partition()
      .size([height, width])
      .padding(1);

  // Apply the partition layout.
  const root = partition(d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");

  // Add a cell for each node of the hierarchy.
  const cell = svg
    .selectAll()
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y0},${d.x0})`);

  cell.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  // Color the cell with respect to which child of root it belongs to. 
  cell.append("rect")
      .attr("width", d => d.y1 - d.y0)
      .attr("height", d => d.x1 - d.x0)
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });

  // Add labels and a title.
  const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
      .attr("x", 4)
      .attr("y", 13);

  text.append("tspan")
      .text(d => d.data.name);

  text.append("tspan")
      .attr("fill-opacity", 0.7)
      .text(d => ` ${format(d.value)}`);

  return svg.node();
}
```

```js echo
data = FileAttachment("flare-2.json").json()
```
