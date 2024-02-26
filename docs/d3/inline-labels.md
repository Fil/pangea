---
source: https://observablehq.com/@d3/inline-labels/2
index: true
---

# Inline labels

This [multi-line chart](./multi-line-chart) places a label at each data point to show the value in lieu of a _y_-axis. Inspired by [Ann K. Emery’s Excel tutorial](https://depictdatastudio.com/how-to-place-labels-directly-through-your-line-graph-in-microsoft-excel/).

```js echo
// Specify the chart’s dimensions.
const width = 928;
const height = 500;
const marginTop = 30;
const marginRight = 50;
const marginBottom = 30;
const marginLeft = 30;

// Create the horizontal, vertical and color scales.
const x = d3
  .scaleUtc()
  .domain([fruit[0].date, fruit[fruit.length - 1].date])
  .range([marginLeft, width - marginRight]);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(fruit, (d) => d.value)])
  .range([height - marginBottom, marginTop]);

const color = d3
  .scaleOrdinal()
  .domain(fruit.map((d) => d.fruit))
  .range(d3.schemeCategory10);

// Create the SVG container.
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

svg
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0)
  );

// Add a container for each series.
const serie = svg
  .append("g")
  .selectAll()
  .data(d3.group(fruit, (d) => d.fruit))
  .join("g");

// Draw the lines.
serie
  .append("path")
  .attr("fill", "none")
  .attr("stroke", (d) => color(d[0]))
  .attr("stroke-width", 1.5)
  .attr("d", (d) =>
    d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))(d[1])
  );

// Append the labels.
serie
  .append("g")
  .attr("stroke-linecap", "round")
  .attr("stroke-linejoin", "round")
  .attr("text-anchor", "middle")
  .selectAll()
  .data((d) => d[1])
  .join("text")
  .text((d) => d.value)
  .attr("dy", "0.35em")
  .attr("x", (d) => x(d.date))
  .attr("y", (d) => y(d.value))
  .call((text) =>
    text
      .filter((d, i, data) => i === data.length - 1)
      .append("tspan")
      .attr("font-weight", "bold")
      .text((d) => ` ${d.fruit}`)
  )
  .attr("fill", "currentColor")
  .attr("stroke", "var(--theme-background)")
  .attr("paint-order", "stroke")
  .attr("stroke-width", 6);

display(svg.node());
```

```js echo
const data = await FileAttachment("../data/fruit.csv").csv({typed: true});
const fruit = data.flatMap((d) => data.columns.slice(1).map((fruit) => ({date: d.date, fruit, value: d[fruit]})));
```

Create this chart with [Observable Plot](https://observablehq.com/plot)’s concise API by adding a [line mark](/plot/marks/line) and a [text mark](/plot/marks/text):

```js echo
const chart2 = Plot.plot({
  x: {line: true, insetRight: 40},
  y: {domain: [30, 200], axis: null},
  marks: [
    Plot.line(fruit, {x: "date", y: "value", stroke: "fruit"}),
    Plot.text(fruit, {
      x: "date",
      y: "value",
      text: "value",
      fill: "currentColor",
      stroke: "white",
      strokeWidth: 8
    }),
    Plot.text(
      fruit,
      Plot.selectLast({
        x: "date",
        y: "value",
        text: "fruit",
        z: "fruit",
        textAnchor: "start",
        dx: 12,
        fontWeight: "bold"
      })
    )
  ]
});

display(chart2);
```
