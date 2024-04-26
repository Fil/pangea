---
source: https://observablehq.com/@d3/horizontal-bar-chart/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Horizontal bar chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Horizontal bar chart

This chart shows the relative frequency of letters in the English language.

```js echo
const chart = {
  // Specify the chart’s dimensions, based on a bar’s height.
  const barHeight = 25;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 30;
  const width = 928;
  const height = Math.ceil((alphabet.length + 0.1) * barHeight) + marginTop + marginBottom;

  // Create the scales.
  const x = d3.scaleLinear()
      .domain([0, d3.max(alphabet, d => d.frequency)])
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleBand()
      .domain(d3.sort(alphabet, d => -d.frequency).map(d => d.letter))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

  // Create a value format.
  const format = x.tickFormat(20, "%");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Append a rect for each letter.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(alphabet)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.letter))
      .attr("width", (d) => x(d.frequency) - x(0))
      .attr("height", y.bandwidth());

  // Append a label for each letter.
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
    .selectAll()
    .data(alphabet)
    .join("text")
      .attr("x", (d) => x(d.frequency))
      .attr("y", (d) => y(d.letter) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => format(d.frequency))
    .call((text) => text.filter(d => x(d.frequency) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  // Create the axes.
  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80, "%"))
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0));

  return svg.node();
}
```

```js echo
const alphabet = FileAttachment("alphabet.csv").csv({typed: true});
```

Or, using [Observable Plot](/plot/)’s concise API:

```js echo
Plot.plot({
  x: {axis: "top", percent: true},
  y: {label: null},
  marks: [
    Plot.barX(alphabet, {
      x: "frequency",
      y: "letter",
      fill: "steelblue",
      sort: {y: "-x"}
    }),
    Plot.text(alphabet, {
      x: "frequency",
      y: "letter",
      text: (d) => format(d.frequency),
      textAnchor: "start",
      dx: 3,
      filter: (d) => d.frequency <= 0.007,
      fill: "currentColor"
    }),
    Plot.text(alphabet, {
      x: "frequency",
      y: "letter",
      text: (d) => format(d.frequency),
      textAnchor: "end",
      dx: -3,
      filter: (d) => d.frequency > 0.007,
      fill: "white"
    }),
    Plot.ruleX([0])
  ]
});
```

```js echo
const format = d3.format(".1%");
```
