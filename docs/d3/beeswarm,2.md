<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Beeswarm</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Beeswarm

A beeswarm plot functions similarly to a [histogram](/@d3/histogram/2?intent=fork), except it allows individual data points to be seen. Dots are offset vertically, without affecting horizontal position. (See also the [mirrored variant](/@d3/beeswarm-mirrored/2?intent=fork).) This chart shows the weights of cars from 1974. Data: *Motor Trend*

```js echo
chart = {
  const width = 928;
  const height = 160;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 20;
  const radius = 3;
  const padding = 1.5;

  const x = d3.scaleLinear()
      .domain(d3.extent(cars, d => d["weight (lb)"]))
      .range([marginLeft, width - marginRight]);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
  
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
  
  svg.append("g")
    .selectAll()
    .data(dodge(cars, {radius: radius * 2 + padding, x: d => x(d["weight (lb)"])}))
    .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => height - marginBottom - radius - padding - d.y)
      .attr("r", radius)
    .append("title")
      .text(d => d.data.name);

  return svg.node();
}
```

```js echo
function dodge(data, {radius = 1, x = d => d} = {}) {
  const radius2 = radius ** 2;
  const circles = data.map((d, i, data) => ({x: +x(d, i, data), data: d})).sort((a, b) => a.x - b.x);
  const epsilon = 1e-3;
  let head = null, tail = null;

  // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
  function intersects(x, y) {
    let a = head;
    while (a) {
      if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
        return true;
      }
      a = a.next;
    }
    return false;
  }

  // Place each circle sequentially.
  for (const b of circles) {

    // Remove circles from the queue that can’t intersect the new circle b.
    while (head && head.x < b.x - radius2) head = head.next;

    // Choose the minimum non-intersecting tangent.
    if (intersects(b.x, b.y = 0)) {
      let a = head;
      b.y = Infinity;
      do {
        let y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
        if (y < b.y && !intersects(b.x, y)) b.y = y;
        a = a.next;
      } while (a);
    }

    // Add b to the queue.
    b.next = null;
    if (head === null) head = tail = b;
    else tail = tail.next = b;
  }

  return circles;
}
```

The [dodge transform](/plot/transforms/dodge) is natively available in the [Observable Plot](/plot/) API, allowing you to create a similar chart with a few lines of code:

```js echo
Plot.plot({
  height: 165,
  x: {line: true},
  marks: [
    Plot.dotX(cars, Plot.dodgeY({
      x: "weight (lb)",
      sort: "weight (lb)",
      title: "name",
      fill: "currentColor"
    }))
  ]
})
```
