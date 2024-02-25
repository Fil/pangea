<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Q–Q Plot</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Q–Q Plot

A [quantile-quantile plot](https://en.wikipedia.org/wiki/Q–Q_plot) compares two distributions. If the two are similar, the points will fall approximately along the diagonal; if not, the points will deviate from the diagonal, revealing differences. This example compares the strengths of two batches of ceramics: the first appears to be significantly stronger. Data: [NIST](https://www.itl.nist.gov/div898/handbook/eda/section4/eda42a1.htm)

```js echo
chart = {
  const width = 640;
  const height = width;
  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 30;
  const marginLeft = 40;

  const x = d3.scaleLinear()
      .domain([qmin, qmax]).nice()
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain([qmin, qmax]).nice()
      .range([height - marginBottom, marginTop]);
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", `${width}px`);

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom + 6})`)
      .call(d3.axisBottom(x.copy().interpolate(d3.interpolateRound)))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", 0.1)
          .attr("y1", -height))
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", -3)
          .attr("fill", "currentColor")
          .attr("font-weight", "bold")
          .text("Batch 2"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft - 6},0)`)
      .call(d3.axisLeft(y.copy().interpolate(d3.interpolateRound)))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", 0.1)
          .attr("x1", width))
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Batch 1"));

  svg.append("line")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.3)
      .attr("x1", x(qmin))
      .attr("x2", x(qmax))
      .attr("y1", y(qmin))
      .attr("y2", y(qmax));

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(d3.range(n))
    .join("circle")
      .attr("cx", i => x(q(qx, i)))
      .attr("cy", i => y(q(qy, i)))
      .attr("r", 3);

  return svg.node();
}
```

After loading the dataset, we separate it into the two batches, and sort each batch by value:

```js echo
data = FileAttachment("ceramics.csv").csv({typed: true})
```

```js echo
batches = d3.rollup(data, v => Float64Array.from(v, d => d.value).sort(), d => d.batch)
```

```js echo
qx = batches.get(2)
```

```js echo
qy = batches.get(1)
```

Per NIST: “If the data sets are not of equal size, the quantiles are usually picked to correspond to the sorted values from the smaller data set and then the quantiles for the larger data set are interpolated.”

```js echo
n = Math.min(qx.length, qy.length)
```

```js echo
qmin = Math.min(qx[0], qy[0])
```

```js echo
qmax = Math.max(qx[qx.length - 1], qy[qy.length - 1])
```

```js echo
function q(Q, i) {
  if (Q.length === n) return Q[i];
  const j = i / (n - 1) * (Q.length - 1);
  const j0 = Math.floor(j);
  const t = j - j0;
  return t ? Q[j0] * (1 - t) + Q[j0 + 1] * t : Q[j0];
}
```

For an Observable Plot version, see [this notebook](https://observablehq.com/@observablehq/qq-plot?intent=fork).
