---
source: https://observablehq.com/@d3/parallel-coordinates
index: true
---

# Parallel coordinates

Compare with the [brushable version](https://observablehq.com/@d3/brushable-parallel-coordinates).

```js
const keyz = view(Inputs.select(keys, {label: "color encoding"}));
```

```js
display(Legend(chart.scales.color, {title: keyz}));
```

```js echo
// Specify the chart’s dimensions.
const width = 928;
const height = keys.length * 120;
const marginTop = 20;
const marginRight = 10;
const marginBottom = 20;
const marginLeft = 10;

// Create an horizontal (*x*) scale for each key.
const x = new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(data, d => d[key]), [marginLeft, width - marginRight])]));

// Create the vertical (*y*) scale.
const y = d3.scalePoint(keys, [marginTop, height - marginBottom]);

// Create the color scale.
const color = d3.scaleSequential(x.get(keyz).domain(), t => d3.interpolateBrBG(1 - t));

// Create the SVG container.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

// Append the lines.
const line = d3.line()
  .defined(([, value]) => value != null)
  .x(([key, value]) => x.get(key)(value))
  .y(([key]) => y(key));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.4)
  .selectAll("path")
  .data(data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz])))
  .join("path")
    .attr("stroke", d => color(d[keyz]))
    .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
  .append("title")
    .text(d => d.name);

// Append the axis for each key.
svg.append("g")
  .selectAll("g")
  .data(keys)
  .join("g")
    .attr("transform", d => `translate(0,${y(d)})`)
    .each(function(d) { d3.select(this).call(d3.axisBottom(x.get(d))); })
    .append("text")
    .attr("x", marginLeft)
    .attr("y", -6)
    .attr("text-anchor", "start")
    .attr("fill", "currentColor")
    .attr("stroke", "var(--theme-background)")
    .attr("stroke-width", 5)
    .attr("stroke-linejoin", "round")
    .attr("paint-order", "stroke")
    .text(d => d);

const chart = display(Object.assign(svg.node(), {scales: {color}}));
```

```js echo
const data = FileAttachment("/data/cars.csv").csv({typed: true});
```

```js echo
const keys = data.columns.slice(1);
```

```js echo
import {Legend} from "/components/color-legend.js";
```

For an alternative using [Observable Plot](https://observablehq.com/plot/)’s concise API, see [Plot: Parallel coordinates](https://observablehq.com/@observablehq/plot-parcoords).
