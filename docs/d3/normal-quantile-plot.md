---
source: https://observablehq.com/@d3/normal-quantile-plot
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Normal quantile plot</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Normal quantile plot

The [normal quantile plot](https://en.wikipedia.org/wiki/Normal_probability_plot) is a special case of the [Q–Q plot](/@d3/q-q-plot) that compares a given distribution to the standard normal distribution. If the plotted points fall along a straight line, the distribution is approximately normal.

```js echo
const chart = {
  const width = 640;
  const height = width;
  const marginTop = 20;
  const marginRight = 40;
  const marginBottom = 30;
  const marginLeft = 40;

  const x = d3.scaleLinear()
      .domain([-3, 3]).nice()
      .range([marginLeft, width - marginRight]);

  const regression = x.domain().map(ss.linearRegressionLine(ss.linearRegression(Array.from(qy, (d, i) => ([z(i), d])))));

  const y = d3.scaleLinear()
      .domain(regression).nice()
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
          .text("z"));

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
          .text("Strength"));

  svg.append("line")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.3)
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
      .attr("y1", y(regression[0]))
      .attr("y2", y(regression[1]));

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(d3.range(n))
    .join("circle")
      .attr("cx", i => x(z(i)))
      .attr("cy", i => y(qy[i]))
      .attr("r", 3);

  return svg.node();
}

```

```js echo
const qy = Float64Array.from(data).sort();
```

```js echo
const n = qy.length;
```

```js echo
const z = (i) => qnorm((i + a) / (n + 1 - 2 * a));
```

```js echo
const a = n <= 10 ? 5 / 8 : 0.5;
```

```js echo
const qnorm = (p) => Math.SQRT2 * erfinv(2 * p - 1);
```

```js echo
const erfinv = {
  const a = 8 * (Math.PI - 3) / (3 * Math.PI * (4 - Math.PI));
  return x => {
    const b = Math.log(1 - x * x);
    const c = b / 2 + (2 / (Math.PI * a));
    return Math.sign(x) * Math.sqrt(Math.sqrt((c * c) - b / a) - c);
  };
}
```

```js echo
const data = FileAttachment("JAHANMI2.DAT")
  .text()
  .then((text) =>
    text
      .split("\r\n")
      .slice(50, -1)
      .map((l) => +l.trim().split(/\s+/g)[4])
  );
```

```js echo
const ss = require("simple-statistics@7");
```
