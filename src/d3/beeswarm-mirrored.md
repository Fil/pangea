---
source: https://observablehq.com/@d3/beeswarm-mirrored/2
index: true
---

# Mirrored beeswarm

A mirrored variation of the [beeswarm chart](./beeswarm).

```js echo
// Declare the chart dimensions and margins.
const width = 928;
const height = 160;
const marginRight = 20;
const marginLeft = 20;
const marginBottom = 20;

// Dot size and padding.
const radius = 3;
const padding = 1.5;

// Declare the horizontal (x) encoding.
const x = d3.scaleLinear()
    .domain(d3.extent(cars, d => d["weight (lb)"]))
    .range([marginLeft, width - marginRight]);

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add the x axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

// Add a dot for each data point, positioned with the dodge function.
svg.append("g")
  .attr("fill", "currentColor")
  .selectAll("circle")
  .data(dodge(cars, {radius: radius * 2 + padding, x: d => x(d["weight (lb)"])}))
  .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => height / 2 - radius - padding - d.y)
    .attr("r", radius)
  .append("title")
    .text(d => d.data.name);

display(svg.node());
```

```js echo
const dodge = (data, {radius, x}) => {
  const radius2 = radius ** 2;
  const circles = data.map((d) => ({x: x(d), data: d})).sort((a, b) => a.x - b.x);
  const epsilon = 1e-3;
  let head = null,
    tail = null;

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
    if (intersects(b.x, (b.y = 0))) {
      let a = head;
      b.y = Infinity;
      do {
        let y1 = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
        let y2 = a.y - Math.sqrt(radius2 - (a.x - b.x) ** 2);
        if (Math.abs(y1) < Math.abs(b.y) && !intersects(b.x, y1)) b.y = y1;
        if (Math.abs(y2) < Math.abs(b.y) && !intersects(b.x, y2)) b.y = y2;
        a = a.next;
      } while (a);
    }

    // Add b to the queue.
    b.next = null;
    if (head === null) head = tail = b;
    else tail = tail.next = b;
  }

  return circles;
};
```

The [dodge transform](/plot/transforms/dodge) is natively available in the [Observable Plot](/plot/) API, allowing you to create a similar chart with a few lines of code:

```js echo
Plot.plot({
  height: 165,
  x: {line: true},
  marks: [
    Plot.dotX(
      cars,
      Plot.dodgeY({
        x: "weight (lb)",
        sort: "weight (lb)",
        title: "name",
        fill: "currentColor",
        anchor: "middle"
      })
    )
  ]
})
```
