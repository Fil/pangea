---
source: https://observablehq.com/@d3/hexbin-area
index: true
---

# Hexbin (area)

A demonstration of [d3-hexbin](https://github.com/d3/d3-hexbin) with an area encoding; compare to [color](./hexbin).

```js
const shape = view(
  Inputs.select(
    new Map([
      ["Hexagons", "path"],
      ["Circles", "circle"]
    ]),
    {label: "shape"}
  )
);
```

```js
const radius = view(Inputs.range([2, 20], {step: 1, value: 8, label: "radius"}));
```

```js echo
// Specify the chart’s dimensions.
const width = 928;
const height = width;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Create the positional scales.
const x = d3.scaleLog()
    .domain(d3.extent(data, d => d["carat"]))
    .range([marginLeft, width - marginRight]);

const y = d3.scaleLog()
    .domain(d3.extent(data, d => d["price"]))
    .rangeRound([height - marginBottom, marginTop]);

// Bin the data.
const hexbin = Hexbin()
  .x(d => x(d["carat"]))
  .y(d => y(d["price"]))
  .radius(radius * width / 928)
  .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]]);

const bins = hexbin(data);

// Create the radius scale.
const r = d3.scaleSqrt()
    .domain([0, d3.max(bins, d => d.length)])
    .range([0, hexbin.radius() * Math.SQRT2]);

// Create the container SVG.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

// Append the axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ""))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width - marginRight)
        .attr("y", -4)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text("Carats"));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(null, ".1s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", 4)
        .attr("y", marginTop)
        .attr("dy", ".71em")
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("$ Price"));

// Append the scaled hexagons.
svg.append("g")
    .attr("fill", "#ddd")
    .attr("stroke", "black")
  .selectAll("path")
  .data(bins)
  .enter().append(shape)
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .call(shape === "path"
        ? path => path.attr("d", d => hexbin.hexagon(r(d.length)))
        : circle => circle.attr("r", d => r(d.length)));

display(svg.node());
```

```js echo
const data = FileAttachment("/data/diamonds.csv").csv({typed: true});
```

```js echo
import {hexbin as Hexbin} from "npm:d3-hexbin@0.2";
```

Or, using [Observable Plot](https://observablehq.com/plot/)’s concise API:

```js echo
Plot.plot({
  width: 928,
  height: 928,
  inset: 10,
  x: {type: "log"},
  y: {type: "log"},
  marks: [
    Plot[shape === "path" ? "hexagon" : "circle"](
      data,
      Plot.hexbin(
        {r: "count"},
        {
          binWidth: 12,
          x: "carat",
          y: "price",
          fill: "#ccc",
          stroke: "#000",
          strokeWidth: 0.75
        }
      )
    )
  ]
})
```
