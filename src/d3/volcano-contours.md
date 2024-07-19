---
source: https://observablehq.com/@d3/volcano-contours/2
index: true
---

# Volcano contours

Showing the topography of [Maungawhau](https://en.wikipedia.org/wiki/Maungawhau) with [d3-contour](https://d3js.org/d3-contour).

```js echo
const n = data.width;
const m = data.height;
const width = 928;
const height = Math.round(m / n * width);
const path = d3.geoPath().projection(d3.geoIdentity().scale(width / n));
const contours = d3.contours().size([n, m]);
const color = d3.scaleSequential(d3.interpolateTurbo).domain(d3.extent(data.values)).nice();

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

svg.append("g")
    .attr("stroke", "black")
  .selectAll()
  .data(color.ticks(20))
  .join("path")
    .attr("d", d => path(contours.contour(data.values, d)))
    .attr("fill", color);

display(svg.node());
```

```js echo
const data = FileAttachment("/data/volcano.json").json();
```

Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a contour plot with the [contour mark](https://observablehq.com/plot/marks/contour), here using the **fill** channel to encode elevation as color.

```js echo
Plot.plot({
  color: {
    legend: true,
    label: "Elevation (m)"
  },
  marks: [
    Plot.contour(data.values, {
      width: data.width,
      height: data.height,
      fill: Plot.identity,
      stroke: "black"
    })
  ]
})
```
