---
source: https://observablehq.com/@d3/box-plot/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Box plot</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Box plot

A box-and-whisker plot shows summary statistics of a quantitative distribution. Here, the price distribution (_y_-axis) of a set of diamonds is plotted for a given range of carat values (_x_-axis).

```js echo
const chart = {

  // Specify the dimensions of the chart.
  const width = 928;
  const height = 600
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Bin the data and derive the values (inter-quartile range, outliers…) for each bin.
  const n = width / 40;
  const bins = d3.bin()
    .thresholds(n)
    .value(d => d.carat)
  (diamonds)
    .map(bin => {
      bin.sort((a, b) => a.price - b.price);
      const values = bin.map(d => d.price);
      const min = values[0];
      const max = values[values.length - 1];
      const q1 = d3.quantile(values, 0.25);
      const q2 = d3.quantile(values, 0.50);
      const q3 = d3.quantile(values, 0.75);
      const iqr = q3 - q1; // interquartile range
      const r0 = Math.max(min, q1 - iqr * 1.5);
      const r1 = Math.min(max, q3 + iqr * 1.5);
      bin.quartiles = [q1, q2, q3];
      bin.range = [r0, r1];
      bin.outliers = bin.filter(v => v.price < r0 || v.price > r1); // TODO
      return bin;
    })

  // Prepare the positional scales.
  const x = d3.scaleLinear()
    .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
    .rangeRound([marginLeft, width - marginRight])
  const y = d3.scaleLinear()
    .domain([d3.min(bins, d => d.range[0]), d3.max(bins, d => d.range[1])]).nice()
    .range([height - marginBottom, marginTop])

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle");

  // Create a visual representation for each bin.
  const g = svg.append("g")
    .selectAll("g")
    .data(bins)
    .join("g");

  // Range.
  g.append("path")
      .attr("stroke", "currentColor")
      .attr("d", d => `
        M${x((d.x0 + d.x1) / 2)},${y(d.range[1])}
        V${y(d.range[0])}
      `);

  // Quartiles.
  g.append("path")
      .attr("fill", "#ddd")
      .attr("d", d => `
        M${x(d.x0) + 1},${y(d.quartiles[2])}
        H${x(d.x1)}
        V${y(d.quartiles[0])}
        H${x(d.x0) + 1}
        Z
      `);

  // Median.
  g.append("path")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr("d", d => `
        M${x(d.x0) + 1},${y(d.quartiles[1])}
        H${x(d.x1)}
      `);

  // Outliers, with a bit of jitter.
  g.append("g")
      .attr("fill", "currentColor")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "none")
      .attr("transform", d => `translate(${x((d.x0 + d.x1) / 2)},0)`)
    .selectAll("circle")
    .data(d => d.outliers)
    .join("circle")
      .attr("r", 2)
      .attr("cx", () => (Math.random() - 0.5) * 4)
      .attr("cy", d => y(d.price));

  // Append the x axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(n).tickSizeOuter(0));

  // Append the y axis.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove());

  return svg.node();
}
```

```js echo
const diamonds = FileAttachment("diamonds.csv").csv({typed: true});
```

Box plots are a native mark in [Observable Plot](/plot/):

```js echo
Plot.plot({
  marginLeft: 50,
  y: {grid: true},
  x: {
    interval: 0.2,
    tickFormat: (x) => x.toFixed(1),
    label: "carats",
    align: 0
  },
  marks: [
    Plot.ruleY([0]),
    Plot.boxY(diamonds, {
      x: (d) => Math.floor(d.carat * 5) / 5,
      y: "price",
      dx: 12
    })
  ]
});
```
