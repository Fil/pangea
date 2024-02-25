source: https://observablehq.com/@d3/cancer-survival-rates/2
<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Cancer survival rates</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Cancer survival rates

A [slope chart](/@d3/slope-chart/3), with additional intermediate steps. The values here are survival rate (in percents) for various cancers. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const height = 600;
  const marginTop = 40;
  const marginRight = 50;
  const marginBottom = 10;
  const marginLeft = 50;
  const padding = 3;

  // Prepare the positional scales.
  const steps = [...new Set(data.map(d => d.year))];
  
  const x = d3.scalePoint()
    .domain(steps)
    .range([marginLeft, width - marginRight])
    .padding(0.5);

  const y = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d.survival)))
    .range([height - marginBottom, marginTop]);

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.survival));

  const formatNumber = y.tickFormat(100);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Create the x axis.
  svg.append("g")
      .attr("text-anchor", "middle")
    .selectAll("g")
    .data(steps)
    .join("g")
      .attr("transform", (d) => `translate(${x(d)},20)`)
      .call(g => g.append("text").text((d) => d))
      .call(g => g.append("line").attr("y1", 3).attr("y2", 9).attr("stroke", "currentColor"));

  // Create a line for each name.
  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
    .selectAll("path")
    .data(d3.group(data, d => d.name))
    .join("path")
      .attr("d", ([, values]) => line(values));

  // Create a group of labels for each year.
  svg.append("g")
    .selectAll("g")
    .data(d3.group(data, d => d.year))
    .join("g")
      .attr("transform", ([step]) => `translate(${x(step) + (
          step === "20 Year" ? padding
        : step === "5 Year" ? -padding
        : 0
      )},0)`)
      .attr("text-anchor", ([step]) =>
          step === "5 Year" ? "end"
          : step === "20 Year" ? "start"
          : "middle")
    .selectAll("text")
    .data(([step, values]) => d3.zip(
      values.map(
          step === "20 Year" ? (d) => `${formatNumber(d.survival)} ${d.name}`
        : step === "5 Year" ? (d) => `${d.name} ${formatNumber(d.survival)}`
        : (d) => `${formatNumber(d.survival)}`),
      dodge(values.map(d => y(d.survival)))))
    .join("text")
      .attr("y", ([, y]) => y)
      .attr("dy", "0.35em")
      .text(([text]) => text)
      .attr("fill", "currentColor")
      .attr("stroke", "white")
      .attr("stroke-width", 5)
      .attr("paint-order", "stroke");

  return svg.node();
}
```

```js echo
data = FileAttachment("cancer.csv").csv({typed: true})
```

```js echo
function dodge(positions, separation = 10, maxiter = 10, maxerror = 1e-1) {
  positions = Array.from(positions);
  let n = positions.length;
  if (!positions.every(isFinite)) throw new Error("invalid position");
  if (!(n > 1)) return positions;
  let index = d3.range(positions.length);
  for (let iter = 0; iter < maxiter; ++iter) {
    index.sort((i, j) => d3.ascending(positions[i], positions[j]));
    let error = 0;
    for (let i = 1; i < n; ++i) {
      let delta = positions[index[i]] - positions[index[i - 1]];
      if (delta < separation) {
        delta = (separation - delta) / 2;
        error = Math.max(error, delta);
        positions[index[i - 1]] -= delta;
        positions[index[i]] += delta;
      }
    }
    if (error < maxerror) break;
  }
  return positions;
}
```

See the [Plot: Cancer survival rates](/@observablehq/plot-cancer-survival-rates) notebook for a similar chart made with [Observable Plot](/plot/)’s concise API.
