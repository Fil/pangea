<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">New Zealand tourists, 1921–2018</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# New Zealand tourists, 1921–2018

Data: [Trading Economics](https://tradingeconomics.com/new-zealand/tourist-arrivals) via [Lisa Charlotte Rost](https://blog.datawrapper.de/weeklychart-logscale/)

```js
viewof yType = Inputs.radio(
  new Map([
    ["Linear scale", "linear"],
    ["Log scale", "log"]
  ]),
  {value: "linear"}
)
```

```js echo
chart = {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 50;

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Declare the scales.
  const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([marginLeft, width - marginRight]);

  const yLinear = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .rangeRound([height - marginBottom, marginTop]);

  const yLog = d3.scaleLog()
    .domain(d3.extent(data, d => d.value))
    .rangeRound([height - marginBottom, marginTop]);

  // Create the axis generators.
  const yAxis = (g, y, format) => g
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 80, format))
    .call(g => g.selectAll(".tick line").clone()
        .attr("stroke-opacity", 0.2)
        .attr("x2", width - marginLeft - marginRight))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Visitors per month"))

  const axisLinear = svg.append("g")
      .style("opacity", 1)
      .call(yAxis, yLinear);
  
  const yTickPosition = (g, y) => g.selectAll(".tick")
    .attr("transform", d => `translate(0,${(isNaN(y(d)) ? yLinear(d) : y(d)) + 0.5})`);

  const axisLog = svg.append("g")
      .style("opacity", 0)
      .call(yAxis, yLog, ",")
      .call(yTickPosition, yLinear);
  
  // Create the line generator.
  const line = y => d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));
  
  // Create the x axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g => g.select(".domain").remove());

  const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line(yLinear));

  return Object.assign(svg.node(), {
    update(yType) {
      const y = yType === "linear" ? yLinear : yLog;
      const t = svg.transition().duration(750);
      axisLinear.transition(t).style("opacity", y === yLinear ? 1 : 0).call(yTickPosition, y);
      axisLog.transition(t).style("opacity", y === yLog ? 1 : 0).call(yTickPosition, y);
      path.transition(t).attr("d", line(y));
    }
  });
}
```

```js echo
chart.update(yType) // Update the chart when the radio input changes.
```

```js echo
data = FileAttachment("nz-tourists@1.csv").csv({typed: true})
```

Or, using [Observable Plot](/plot/)’s concise API:

```js echo
Plot.plot({
  marginLeft: 55,
  y: {type: yType, zero: true, grid: true},
  marks: [Plot.lineY(data, {x: "date", y: "value", stroke: "steelblue"})]
})
```
