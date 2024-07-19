---
source: https://observablehq.com/@d3/contours
index: true
---

# Function contours

Showing the [Goldstein–Price test function](https://en.wikipedia.org/wiki/Test_functions_for_optimization).

```js echo
const value = (x, y) =>
  (1 + (x + y + 1) ** 2 * (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2)) *
  (30 + (2 * x - 3 * y) ** 2 * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2));
```

```js
Legend(color, {title: "Value", tickFormat: ","})
```

```js echo
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width + 28, height])
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("width", "calc(100% + 28px)");

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-opacity", 0.5)
    .selectAll("path")
    .data(contours)
    .join("path")
      .attr("fill", d => color(d.value))
      .attr("d", d3.geoPath());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  display(svg.node());
```

```js echo
const color = d3.scaleSequentialLog(d3.extent(thresholds), d3.interpolateMagma);
```

```js echo
const thresholds = d3.range(1, 20).map((i) => Math.pow(2, i));
```

```js echo
const q = 4; // The level of detail, e.g., sample every 4 pixels in x and y.
const x0 = -q / 2, x1 = width + 28 + q;
const y0 = -q / 2, y1 = height + q;
const n = Math.ceil((x1 - x0) / q);
const m = Math.ceil((y1 - y0) / q);
const grid = new Array(n * m);
for (let j = 0; j < m; ++j) {
  for (let i = 0; i < n; ++i) {
    grid[j * n + i] = value(x.invert(i * q + x0), y.invert(j * q + y0));
  }
}
grid.x = -q;
grid.y = -q;
grid.k = q;
grid.n = n;
grid.m = m;
```

```js echo
// Converts from grid coordinates (indexes) to screen coordinates (pixels).
const transform = ({type, value, coordinates}) => {
  return {
    type,
    value,
    coordinates: coordinates.map((rings) => {
      return rings.map((points) => {
        return points.map(([x, y]) => [grid.x + grid.k * x, grid.y + grid.k * y]);
      });
    })
  };
};
```

```js echo
const contours = d3.contours().size([grid.n, grid.m]).thresholds(thresholds)(grid).map(transform);
```

```js echo
const x = d3.scaleLinear([-2, 2], [0, width + 28]);
```

```js echo
const y = d3.scaleLinear([-2, 1], [height, 0]);
```

```js echo
const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisTop(x).ticks((width / height) * 10))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick")
        .filter((d) => x.domain().includes(d))
        .remove()
    );
```

```js echo
const yAxis = (g) =>
  g
    .attr("transform", "translate(-1,0)")
    .call(d3.axisRight(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick")
        .filter((d) => y.domain().includes(d))
        .remove()
    );
```

```js echo
const height = 600;
```

```js echo
import {Legend} from "/components/color-legend.js";
```

---

Using [Observable Plot](/plot/)’s built-in [contour mark](/plot/marks/contour), we can create the same chart in a few lines—or see the [complete example with custom axes](/@observablehq/plot-goldstein-price-contours). Explicit thresholds are necessary due to the skewed distribution of the value.

```js echo
Plot.plot({
  color: {
    scheme: "Magma",
    type: "log",
    legend: true,
    width: 300,
    label: "Value",
    tickFormat: ","
  },
  marks: [
    Plot.contour({
      x1: -2,
      x2: 2,
      y1: -2,
      y2: 1,
      fill: value,
      stroke: "#fff",
      strokeOpacity: 0.5,
      thresholds: d3.range(1, 20).map((n) => 2 ** n)
    })
  ]
});
```
