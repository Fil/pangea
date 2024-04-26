---
source: https://observablehq.com/@d3/dot-plot/2
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Dot plot</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Dot plot

Percentage of population by age and state. Data: [American Community Survey](/@mbostock/working-with-the-census-api)

```js
viewof order = {
  const view = Inputs.select(["state", ...d3.union(data.map(d => d.age))], {label: "Order by"});
  const input = view.input;
  const interval = setInterval(() => {
    input.selectedIndex = (input.selectedIndex + 1) % input.length;
    input.dispatchEvent(new Event("input", {bubbles: true}));
  }, 4000);
  const clear = () => clearInterval(interval);
  input.addEventListener("change", clear, {once: true});
  invalidation.then(() => (clear(), input.removeEventListener("change", clear)));
  return view;
}
```

```js
Legend(chart.scales.color, {title: "Age (years)", tickSize: 0});
```

```js echo
const chart = {
  // Extract the categories: states and ages.
  const states = d3.group(data, d => d.state);
  const ages = new Set(data.map(d => d.age));

  // Specify the chart’s dimensions.
  const width = 928;
  const height = states.size * 16;
  const marginTop = 30;
  const marginRight = 10;
  const marginBottom = 10;
  const marginLeft = 10;

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.share)])
      .rangeRound([marginLeft, width - marginRight]);

  const y = d3.scalePoint()
      .domain(d3.sort(states.keys()))
      .rangeRound([marginTop, height - marginBottom])
      .padding(1);

  const color = d3.scaleOrdinal()
      .domain(ages)
      .range(d3.schemeSpectral[ages.size])
      .unknown("#ccc");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Create the x axis.
  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(null, "%"))
      .call(g => g.append("text")
            .text("population →")
            .attr("fill", "currentColor")
            .attr("transform", `translate(${width - marginRight},0)`)
            .attr("text-anchor", "end")
            .attr("dy", -22)
      )
      .call(g => g.selectAll(".tick line").clone().attr("stroke-opacity", 0.1).attr("y2", height - marginBottom))
      .call(g => g.selectAll(".domain").remove());

  // Add a g container for each state.
  const g = svg.append("g")
      .attr("text-anchor", "end")
      .style("font", "10px sans-serif")
    .selectAll()
    .data(states)
    .join("g")
      .attr("transform", ([state]) => `translate(0,${y(state)})`);

  // Append a grey line to each container.
  g.append("line")
      .attr("stroke", "#aaa")
      .attr("x1", ([, values]) => x(d3.min(values, d => d.share)))
      .attr("x2", ([, values]) => x(d3.max(values, d => d.share)));

  // Append the dots to each container.
  g.append("g")
    .selectAll()
    .data(([, values]) => values)
    .join("circle")
      .attr("cx", (d) => x(d.share))
      .attr("fill", (d) => color(d.age))
      .attr("r", 3.5);

  // Append the label to each container.
  g.append("text")
      .attr("dy", "0.35em")
      .attr("x", ([, values]) => x(d3.min(values, d => d.share)) - 6)
      .text(([state]) => state);

  // Expose an update function that animates the containers to new positions.
  // Expose the color scale for a legend.
  return Object.assign(svg.node(), {
    scales: {color},
    update(names) {
      y.domain(names);
      g.transition()
          .delay((d, i) => i * 10)
          .attr("transform", ([state]) => `translate(0,${y(state)})`);
    }
  });
}
```

```js echo
const update = {
  const states = data.filter(order === "state" ? (d) => d.age === "<10" : (d) => d.age === order);
  const index = d3.range(states.length).sort(
    order === "state"
      ? (i, j) => d3.ascending(states[i].state, states[j].state)
      : (i, j) => d3.descending(states[i].share, states[j].share)
  );
  chart.update(d3.permute(states.map((d) => d.state), index));
}
```

```js echo
const data = {
  const data = await FileAttachment("us-population-state-age.csv").csv({typed: true});
  const ages = data.columns.slice(1);
  const total = new Map(data.map(d => [d.name, d3.sum(ages, age => d[age])]));
  return ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age], share: d[age] / total.get(d.name)})));
}
```

```js echo
import {Legend} from "@d3/color-legend";
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a similar chart with a [dot mark](https://observablehq.com/plot/marks/dot). See the [Plot: Dot plot](https://observablehq.com/@observablehq/plot-dot-plot?intent=fork) example notebook.

```js echo
Plot.plot({
  height: 660,
  x: {axis: "top", percent: true, grid: true},
  y: {axis: null},
  color: {scheme: "spectral", legend: true},
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(data, Plot.groupY({x1: "min", x2: "max"}, {x: "share", y: "state", sort: {y: "x1"}})),
    Plot.dot(data, {
      x: "share",
      y: "state",
      fill: "age",
      sort: {color: null}
    }),
    Plot.text(
      data,
      Plot.selectMinX({
        x: "share",
        y: "state",
        z: "state",
        textAnchor: "end",
        dx: -6,
        text: "state"
      })
    )
  ]
});
```
