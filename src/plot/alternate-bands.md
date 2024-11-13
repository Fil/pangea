---
index: true
---

# Alternate bands

As suggested by Éric Mauvière, here’s a way to create alternate bands behind a bar chart (or waffle chart for that matter). The bands spread over the full _step_ of the band scale, so that the empty space and the band are of the same size.

```js echo
Plot.plot({
  x: { tickFormat: (d) => (d == null ? "N/A" : d) },
  y: { tickFormat: Math.abs },
  insetTop: 10,
  insetBottom: 10,
  color: { legend: true },
  marks: [
    bandX(),
    Plot.waffleY(
      olympians,
      Plot.groupX(
        { y: "sum" },
        {
          fill: "sex",
          x: (d) => d.weight && 10 * Math.floor(d.weight / 10),
          y: (d) => (d.sex === "female" ? 1 : -1),
          unit: 10
        }
      )
    )
  ]
})
```

```js echo
function bandX() {
  return Plot.gridX({
    render(index, {x}, {x: X}, {height, marginTop, marginBottom}, context) {
      const step = x.step();
      const dx = (x.bandwidth() - step) / 2;
      const h = height - marginTop - marginBottom;
      const g = d3
        .create("svg:g", context.document)
        .attr("aria-label", "bands")
        .attr("fill", "currentColor")
        .attr("fill-opacity", 0.05);
      g.selectAll("rect")
        .data(index.filter((i) => i % 2 === 1))
        .join("rect")
        .attr("width", step)
        .attr("height", h)
        .attr("x", (i) => X[i] + dx)
        .attr("y", marginTop);
      return g.node();
    }
  });
}
```
