---
source: https://observablehq.com/@d3/slope-chart/3
index: true
---

# Slope chart

Also known as a _slopegraph_, this chart shows change between two (or a few) discrete points in time. An iterative _dodge_ method avoids label overlap. The values here are government receipts as a percentage of GDP. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
// Specify the chart’s dimensions.
const height = 600;
const marginTop = 40;
const marginRight = 50;
const marginBottom = 10;
const marginLeft = 50;
const padding = 3;

// Prepare the positional scales.
const x = d3.scalePoint()
  .domain([0, 1])
  .range([marginLeft, width - marginRight])
  .padding(0.5);

const y = d3.scaleLinear()
  .domain(d3.extent(data.flatMap(d => [d[1970], d[1979]])))
  .range([height - marginBottom, marginTop]);

const line = d3.line()
  .x((d, i) => x(i))
  .y(y);

const formatNumber = y.tickFormat(100);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Append the x axis.
svg.append("g")
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
  .selectAll("g")
  .data([0, 1])
  .join("g")
    .attr("transform", (i) => `translate(${x(i)},20)`)
    .call(g => g.append("text").text((i) => i ? 1979 : 1970))
    .call(g => g.append("line").attr("y1", 3).attr("y2", 9).attr("stroke", "currentColor"));

// Create a line for each country.
svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "currentColor")
  .selectAll("path")
  .data(data)
  .join("path")
    .attr("d", (d) => line([d[1970], d[1979]]));

// Create a group of labels for each year.
svg.append("g")
  .selectAll("g")
  .data([0, 1])
  .join("g")
    .attr("fill", "currentColor")
    .attr("transform", (i) => `translate(${x(i) + (i ? padding : -padding)},0)`)
    .attr("text-anchor", (i) => i ? "start" : "end")
  .selectAll("text")
  .data((i) => d3.zip(
    data.map(i ? (d) => `${formatNumber(d[1979])} ${d.country}` : (d) => `${d.country} ${formatNumber(d[1970])}`),
    dodge(data.map(d => y(d[i ? 1979 : 1970])))))
  .join("text")
    .attr("y", ([, y]) => y)
    .attr("dy", "0.35em")
    .text(([text]) => text);

display(svg.node());
```

```js echo
const data = FileAttachment("/data/gdp-receipts.csv").csv({typed: true})
  .then((data) => [...d3.rollup(d3.sort(data, (d) => d.year), (v) => ({
    country: v[0].country,
    1970: v[0].receipts,
    1979: v[1].receipts,
  }), (d) => d.country).values()]);
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

See the [Plot: Slope chart](https://observablehq.com/@observablehq/plot-slope-chart) notebook for a similar chart made with [Observable Plot](https://observablehq.com/plot/)’s concise API.
