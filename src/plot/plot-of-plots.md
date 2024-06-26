---
index: true
source: https://observablehq.com/@observablehq/plot-of-plots
---

# Plot of plots

With the [render transform](https://observablehq.com/plot/features/marks) we can create small multiples charts (or “collections of maps”, as Bertin writes), in which a parameter varies along the *x* and *y* axes.

```js echo
Plot.plot({
  width: 520,
  height: 260,
  x: {type: "band"},
  y: {type: "band"},
  marks: [
    Plot.frame(),
    Plot.cell(
      d3.cross([-1, 0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4]).map(([a, b]) => ({a, b})),
      {
        x: "a",
        y: "b",
        render: (index, {x, y}, { x: X, y: Y, channels: { x: {value: a}, y: {value: b} } }) =>
          d3.create("svg:g")
            .call((g) => g.selectAll()
                .data(index)
                .join("g")
                  .attr("transform", (i) => `translate(${X[i]},${Y[i]})`)
                  .append((i) => subPlot(a[i], b[i], x.bandwidth(), y.bandwidth()))
            )
            .node()
      }
    )
  ]
})
```

```js echo
const subPlot = (a, b, width, height) =>
  Plot.plot({
    width,
    height,
    marks: [
      Plot.frame({strokeWidth: 0.5}),
      Plot.lineY(
        Array.from(
          { length: 100 },
          (_, i) => Math.sin((i * a) / 50) + Math.cos((i * b) / 10)
        )
      )
    ],
    x: { axis: null },
    y: { axis: null }
  });
```