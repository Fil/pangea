---
source: https://observablehq.com/@d3/smooth-zooming
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Smooth zooming</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Smooth zooming

This notebook demonstrates using [d3.interpolateZoom](https://d3js.org/d3-interpolate/zoom) to implement smooth pan-and-zoom transitions between two views. See also [d3.zoom’s transitions](/@d3/programmatic-zoom), which also allows freeform zooming.

```js echo
const chart = {
  let currentTransform = [width / 2, height / 2, height];

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])

  const g = svg.append("g");

  g.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))

  function transition() {
    const d = data[Math.floor(Math.random() * data.length)];
    const i = d3.interpolateZoom(currentTransform, [...d, radius * 2 + 1]);

    g.transition()
        .delay(250)
        .duration(i.duration)
        .attrTween("transform", () => t => transform(currentTransform = i(t)))
        .on("end", transition);
  }

  function transform([x, y, r]) {
    return `
      translate(${width / 2}, ${height / 2})
      scale(${height / r})
      translate(${-x}, ${-y})
    `;
  }

  return svg.call(transition).node();
}
```

```js echo
const height = 500; // Observable provides a responsive *width*
```

```js echo
const radius = 6;
```

```js echo
const step = radius * 2;
```

```js echo
const data = Array.from({length: 2000}, (_, i) => {
  const r = step * Math.sqrt((i += 0.5)),
    a = theta * i;
  return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
});
```

```js echo
const theta = Math.PI * (3 - Math.sqrt(5));
```
