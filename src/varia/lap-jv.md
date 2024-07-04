---
index: true
source: https://observablehq.com/@fil/lap-jv
---

# The linear assignment problem

## LAP-JV

```js
const m = view(Inputs.range([2, 100], {step: 1, label: "size of the problem", format: (m) => m * m}));
```

```js
const n = m * m;
const data = d3
  .range(n)
  .map((k) => [(m - 1) * Math.random(), (m - 1) * Math.random()])
  .map((d) => {
    d.color = d3.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255).formatHex();
    return d;
  });
```

```js
const r = Math.min(140, 640 / Math.sqrt(data.length) / 3);
const chart = Plot.plot({
  aspectRatio: 1,
  axis: null,
  inset: r,
  marks: [
    Plot.link(data, {
      x1: "0",
      y1: "1",
      x2: (d, i) => row[i] % m,
      y2: (d, i) => Math.floor(row[i] / m),
      stroke: "color",
      render: (index, scales, values, dimensions, context, next) => {
        const g = next(index, scales, values, dimensions, context);
        d3.select(g)
          .selectAll("*")
          .style("opacity", 0)
          .transition()
          .delay((i) => 1000 + i * 3)
          .style("opacity", 1);
        d3.select(g)
          .selectAll("*")
          .transition()
          .delay((i) => 1400 + i * 3)
          .style("opacity", 0);

        return g;
      }
    }),
    Plot.dot(data, {
      x: "0",
      y: "1",
      fill: "color",
      r,
      render: (index, scales, values, dimensions, context, next) => {
        const g = next(index, scales, values, dimensions, context);
        d3.select(g)
          .selectAll("circle")
          .transition()
          .delay((i) => 1100 + i * 3)
          .attr("cx", (i) => scales.x(row[i] % m))
          .attr("cy", (i) => scales.y(Math.floor(row[i] / m)));
        return g;
      }
    })
  ]
});
display(chart);
```

```js
const row = solve(data);
```

```js echo
import greenlet from "npm:greenlet";
import {queue} from "../components/queue.js";
import {lap} from "../components/lap-jv.js";

const solve = queue((data) =>
  greenlet(async (data, lapjv) => {
    const {lap} = await import(lapjv);
    const n = data.length;
    const m = Math.ceil(Math.sqrt(n));
    const costs = data.map((d) =>
      data.map((_, k) => {
        const i = k % m;
        const j = (k - i) / m;
        const dx = d[0] - i - 0.5;
        const dy = d[1] - j - 0.5;
        return dx * dx + dy * dy;
      })
    );
    const t = performance.now();
    const {row} = lap(n, costs);
    console.warn("lap", n, performance.now() - t);
    return row;
  })(data, import.meta.resolve("../components/lap-jv.js")));
```

<div class="note">

We’re using [greenlet](../party/greenlet) and a queue to make computations happen in the background with a web worker.

</div>
