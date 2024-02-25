<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Cancer survival rates</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Cancer survival rates

A [slope chart](/@observablehq/plot-slope-chart) with intermediate values. The values here are survival rate (in percents) for various cancers. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
Plot.plot({
  width: 800,
  height: 700,
  x: {
    axis: "top",
    type: "point",
    domain: ["5 Year", "10 Year", "15 Year", "20 Year"],
    inset: 60,
    label: null
  },
  y: { axis: null, inset: 20 },
  marks: [
    Plot.line(cancer, { x: "year", y: "survival", z: "name" }),
    d3
      .groups(cancer, (d) => d.year)
      .map(([year, cancer]) =>
        Plot.text(
          cancer,
          occlusionY({
            x: "year",
            y: "survival",
            text:
              year === "5 Year"
                ? (d) => `${d.name} ${d.survival}`
                : year === "20 Year"
                ? (d) => `${d.survival} ${d.name}`
                : "survival",
            textAnchor:
              year === "5 Year"
                ? "end"
                : year === "20 Year"
                ? "start"
                : "middle",
            fill: "currentColor",
            stroke: "white",
            strokeWidth: 5,
            dx: year === "5 Year" ? -3 : year === "20 Year" ? 3 : 0
          })
        )
      )
  ]
})
```

```js echo
// OcclusionY adds an initializer that shifts nodes vertically with a tiny force simulation.
occlusionY = ({radius = 6.5, ...options} = {}) => Plot.initializer(options, (data, facets, { y: {value: Y}, text: {value: T} }, {y: sy}, dimensions, context) => {
  for (const index of facets) {
    const unique = new Set();
    const nodes = Array.from(index, (i) => ({
      fx: 0,
      y: sy(Y[i]),
      visible: unique.has(T[i]) // remove duplicate labels
        ? false
        : !!unique.add(T[i]),
      i
    }));
    d3.forceSimulation(nodes.filter((d) => d.visible))
      .force("y", d3.forceY(({y}) => y)) // gravitate towards the original y
      .force("collide", d3.forceCollide().radius(radius)) // collide
      .stop()
      .tick(20);
    for (const { y, node, i, visible } of nodes) Y[i] = !visible ? NaN : y;
  }
  return {data, facets, channels: {y: {value: Y}}};
})
```

```js echo
cancer = FileAttachment("cancer.csv").csv({ typed: true })
```
