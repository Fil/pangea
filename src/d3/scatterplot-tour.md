---
source: https://observablehq.com/@d3/scatterplot-tour
index: true
---

# Scatterplot tour

This notebook implements an animated tour of a scatterplot using zoom transitions. The tour zooms in on each cluster’s [bounding box](https://observablehq.com/@d3/zoom-to-bounding-box) in succession before zooming back out to the overview. To improve rendering performance, the circles are drawn as zero-length strokes with round caps.

```js
const form = Inputs.radio(new Map(transforms), {value: transforms[0][1]});
const transform = view(form);
const timeout = setInterval(() => {
  const i = transforms.findIndex(([, d]) => d === form.value);
  form.value = transforms[(i + 1) % transforms.length][1];
  form.dispatchEvent(new CustomEvent("input"));
}, 2500);
form.oninput = (event) => event.isTrusted && clearInterval(timeout);
invalidation.then(() => clearInterval(timeout));
```

```js echo
const color = d3.scaleOrdinal()
    .domain(data.map(d => d[2]))
    .range(d3.schemeObservable10);

const zoom = d3.zoom()
    .on("zoom", zoomed);

const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

const g = svg.append("g")
    .attr("fill", "none")
    .attr("stroke-linecap", "round");

g.selectAll("path")
  .data(data)
  .join("path")
    .attr("d", d => `M${x(d[0])},${y(d[1])}h0`)
    .attr("stroke", d => color(d[2]));

const gx = svg.append("g")
      .attr("transform", `translate(0,${height})`);
const xAxis = (g, x) => g
    .call(d3.axisTop(x).ticks(12))
    .call(g => g.select(".domain").attr("display", "none"));

const gy = svg.append("g");
const yAxis = (g, y) => g
    .call(d3.axisRight(y).ticks(12 * k))
    .call(g => g.select(".domain").attr("display", "none"));

svg.call(zoom.transform, form.value);

function zoomed({transform}) {
  g.attr("transform", transform).attr("stroke-width", 5 / transform.k);
  gx.call(xAxis, transform.rescaleX(x));
  gy.call(yAxis, transform.rescaleY(y));
}

const chart = Object.assign(svg.node(), {
  update(transform) {
    svg.transition()
        .duration(1500)
        .call(zoom.transform, transform);
  }
});

display(chart);
```

```js echo
chart.update(transform);
```

```js echo
const random = d3.randomNormal(0, 0.2);
const sqrt3 = Math.sqrt(3);
const data = [].concat(
  Array.from({length: 300}, () => [random() + sqrt3, random() + 1, 0]),
  Array.from({length: 300}, () => [random() - sqrt3, random() + 1, 1]),
  Array.from({length: 300}, () => [random(), random() - 1, 2])
);
```

```js echo
const transforms = [["Overview", d3.zoomIdentity]].concat(
  d3
    .groups(data, (d) => d[2])
    .map(([key, data]) => {
      const [x0, x1] = d3.extent(data, (d) => d[0]).map(x);
      const [y1, y0] = d3.extent(data, (d) => d[1]).map(y);
      const k = 0.9 * Math.min(width / (x1 - x0), height / (y1 - y0));
      const tx = (width - k * (x0 + x1)) / 2;
      const ty = (height - k * (y0 + y1)) / 2;
      return [`Cluster ${key}`, d3.zoomIdentity.translate(tx, ty).scale(k)];
    })
);
```

```js echo
const height = 600;
const k = height / width;
const x = d3.scaleLinear().domain([-4.5, 4.5]).range([0, width]);
const y = d3.scaleLinear().domain([-4.5 * k, 4.5 * k]).range([height, 0]);
```
