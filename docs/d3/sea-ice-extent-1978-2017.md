<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Sea ice extent, 1978–2017</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Sea ice extent, 1978–2017

The average daily extent of sea ice in the northern hemisphere, measured in millions of square kilometers. Data: [NSIDC](http://nsidc.org/data/nsidc-0051), [Tom Shanley](http://bl.ocks.org/tomshanley/77f12d419e71e572f4250a52ef9bf1ad)

```js
viewof replay = html`<button>Replay`
```

```js
legend({title: "Year", color: chart.scales.color, tickFormat: x => x})
```

```js echo
chart = {
  replay;

  const width = 928;
  const height = 720;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the scales.
  const x = d3.scaleUtc([Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 0)], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, d3.max(data, d => d.value)], [height - marginBottom, marginTop]);
  const z = d3.scaleSequential(d3.extent(data, d => d.date.getUTCFullYear()), t => d3.interpolateSpectral(1 - t));

  const line = d3.line()
    .defined(d => !isNaN(d.value))
    .x(d => x(intrayear(d.date)))
    .y(d => y(d.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Create the axes.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x)
      .ticks(width / 80, "%B")
      .tickSizeOuter(0));

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick:not(:first-of-type) line").clone()
        .attr("x2", width)
        .attr("stroke", "#ddd"))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));

  // Create the container for lines.
  const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1);

  // Start the animation and return the chart.
  requestAnimationFrame(animate);
  return Object.assign(svg.node(), {scales: {color: z}});

  // Animate: add lines iteratively.
  async function animate() {
    for (const [key, values] of d3.group(data, d => d.date.getUTCFullYear())) {

      await g.append("path")
          .attr("d", line(values))
          .attr("stroke", z(key))
          .attr("stroke-dasharray", "0,1")
        .transition()
          .ease(d3.easeLinear)
          .attrTween("stroke-dasharray", dashTween)
        .end();

      if (!isNaN(values[values.length - 1].value)) {
        g.append("text")
            .attr("paint-order", "stroke")
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("fill", z(key))
            .attr("dx", 4)
            .attr("dy", "0.32em")
            .attr("x", x(intrayear(values[values.length - 1].date)))
            .attr("y", y(values[values.length - 1].value))
            .text(key);
      }
    }
  }
}
```

```js echo
function dashTween() {
  const length = this.getTotalLength();
  return d3.interpolate(`0,${length}`, `${length},${length}`);
}
```

```js echo
function intrayear(date) {
  date = new Date(+date);
  date.setUTCFullYear(2000);
  return date;
}
```

```js echo
data = Object.assign(await d3.csvParse(await FileAttachment("sea-ice-extent.csv").text(), ({date, extent}) => ({date: new Date(date), value: 1e6 * extent})).sort((a, b) => a.date - b.date), {y: "km²"})
```

```js echo
import {legend} from "@d3/color-legend"
```

Or, using [Observable Plot](/plot/)’s concise API:

```js echo
Plot.plot({
  x: {transform: intrayear, tickFormat: "%b", nice: true},
  y: {transform: (d) => d * 1e-6, label: "km² (millions)"},
  color: {legend: true},
  marks: [
    Plot.lineY(data, {
      x: "date",
      y: "value",
      stroke: "date",
      z: (d) => d.date.getFullYear(),
      strokeWidth: 0.75
    })
  ]
})
```
