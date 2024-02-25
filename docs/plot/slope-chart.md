<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Slope chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Slope chart

Also known as a *slopegraph*, this chart shows change between two (or a few) discrete points in time. A tiny [force simulation](https://d3js.org/d3-force) avoids label overlap. The values here are government receipts as a percentage of GDP. Based on [Tufte](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk).

```js echo
Plot.plot({
  height: 540,
  x: {axis: "top", type: "ordinal", tickFormat: "", inset: 90, label: null},
  y: {axis: null, inset: 20},
  marks: [
    Plot.line(receipts, {x: "year", y: "receipts", z: "country"}),
    d3.groups(receipts, (d) => d.year === 1970)
      .map(([left, receipts]) =>
        Plot.text(receipts, occlusionY({
          x: "year",
          y: "receipts",
          text: left
            ? (d) => `${d.country} ${d.receipts}`
            : (d) => `${d.receipts} ${d.country}`,
          textAnchor: left ? "end" : "start",
          dx: left ? -3 : 3,
          radius: 5.5
        }))
      )
  ],
  caption: "Current receipts of government as a percentage of gross domestic product"
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
receipts = FileAttachment("gdp-receipts.csv").csv({ typed: true })
```
