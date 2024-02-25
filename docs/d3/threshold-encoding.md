<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Threshold encoding</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Threshold encoding

This variation of a [line chart](/@d3/line-chart) demonstrates how to use a gradient to change the color of a line based on a *y*-threshold. When the line is above the median value, it is <span style="border-bottom: solid red 2px">red</span>; when the line is below the median value, it is  <span style="border-bottom: solid black 2px">black</span>.

```js echo
chart = {
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  const x = d3.scaleUtc()
      .domain(d3.extent(temperatures, d => d.date))
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain(d3.extent(temperatures, d => d.temperature)).nice()
      .range([height - marginBottom, marginTop]);

  const line = d3.line()
      .curve(d3.curveStep)
      .defined(d => !isNaN(d.temperature))
      .x(d => x(d.date))
      .y(d => y(d.temperature));

  const threshold = d3.median(temperatures, d => d.temperature);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  const gradient = DOM.uid();

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("°F"));

  svg.append("linearGradient")
      .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height)
    .selectAll("stop")
      .data([
        {offset: y(threshold) / height, color: "red"},
        {offset: y(threshold) / height, color: "black"}
      ])
    .join("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);

  svg.append("path")
      .datum(temperatures)
      .attr("fill", "none")
      .attr("stroke", gradient)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return svg.node();
}
```

```js echo
temperatures = FileAttachment("temperature.csv").csv({typed: true})
```

Or, with [Observable Plot](/plot/) and the [mixBlendMode](/plot/features/marks#mark-options) option:

```js echo
Plot.plot({
  width,
  nice: true,
  marks: [
    Plot.lineY(temperatures, { x: "date", y: "temperature", curve: "step" }),
    Plot.rectY(
      temperatures,
      Plot.groupZ(
        { y2: "median" },
        {
          y1: 68, // higher than max.
          y2: "temperature",
          fill: "red",
          mixBlendMode: "screen"
        }
      )
    )
  ]
})
```
