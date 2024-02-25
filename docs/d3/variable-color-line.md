---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Variable-color line</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Variable-color line

This line chart applies a gradient to color the line based on the _condition_ field. For a related technique along the _y_-axis, see [gradient encoding](/@d3/gradient-encoding).

```js
const legend = {
  const id = DOM.uid().id;
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
  width: 60px;
  padding-bottom: 1px;
}

.${id}-swatch {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 0;
}

</style>
<div class="${id}">${chart.scales.color.domain().map((name) => html`
  <div class="${id}-item" title="${conditions.get(name).label}">
    <div class="${id}-swatch" style="background:${chart.scales.color(name)};"></div>
    ${document.createTextNode(name)}
  </div>`)}
</div>`;
}
```

```js echo
const chart = {
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the scales.
  const x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .rangeRound([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.temperature)).nice()
      .rangeRound([height - marginBottom, marginTop]);

  const color = d3.scaleOrdinal(conditions.keys(), Array.from(conditions.values(), d => d.color))
    .unknown("black");

  // Create the path generator.
  const line = d3.line()
      .curve(d3.curveStep)
      .x(d => x(d.date))
      .y(d => y(d.temperature));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append the axes.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").append("tspan").text(data.y));

  // Create the grid.
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

  // Create the linear gradient.
  const colorId = DOM.uid("color");
  svg.append("linearGradient")
      .attr("id", colorId.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", width)
    .selectAll("stop")
    .data(data)
    .join("stop")
      .attr("offset", d => x(d.date) / width)
      .attr("stop-color", d => color(d.condition));

  // Create the main path.
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colorId)
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return Object.assign(svg.node(), {scales: {color}});
}
```

```js echo
const data = FileAttachment("fcm.csv").csv({typed: true});
```

```js echo
const conditions = new Map([
  ["CLR", {label: "Clear", color: "deepskyblue"}],
  ["FEW", {label: "Few clouds", color: "lightskyblue"}],
  ["SCT", {label: "Scattered clouds", color: "lightblue"}],
  ["BKN", {label: "Broken clouds", color: "#aaaaaa"}],
  ["OVC", {label: "Overcast", color: "#666666"}],
  ["VV ", {label: "Indefinite ceiling (vertical visibility)", color: "#666666"}]
]);
```

Or, using [Observable Plot](/plot/)’s concise API:

```js
Plot.plot({
  width: 928,
  nice: true,
  grid: true,
  color: {
    domain: [...conditions.keys()],
    range: [...conditions.values()].map((d) => d.color),
    unknown: "black",
    legend: true
  },
  y: {label: "Temperature (°F)"},
  marks: [
    Plot.line(data, {
      x: "date",
      y: "temperature",
      z: null,
      stroke: "condition",
      curve: "step-before"
    })
  ]
});
```
