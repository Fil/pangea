---
index: true
source:
author: Mike Bostock
---

# Apollonius’ Problem

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

[Apollonius’ Problem](https://mathworld.wolfram.com/ApolloniusProblem.html) is to compute the circle that is tangent to three given circles. There are up to eight such circles. In the interactive chart below, only one is shown: the circle that is internally tangent to the three given circles, if it exists.

Drag the circles to see the tangent circle change.

```js
const width = 928;
const height = 600;
const svg = d3.create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

const c1 = ({x: 180, y: 250, r: 80});
const c2 = ({x: 400, y: 100, r: 20});
const c3 = ({x: 400, y: 300, r: 120});

const circle = svg.selectAll(".circle")
    .data([c1, c2, c3])
  .enter().append("g")
    .attr("class", "circle")
    .attr("transform", ({x, y}) => `translate(${x},${y})`)
    .call(g => g.append("circle").attr("r", ({r}) => r))
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const ring = svg.append("g")
    .attr("class", "ring");

ring.append("circle")
    .attr("class", "ring-outer");

ring.append("circle")
    .attr("class", "ring-inner");

update();

function dragstarted() {
  d3.select(this).raise();
  svg.style("overflow", "visible");
}

function dragged({x, y}, d) {
  d3.select(this).attr("transform", `translate(${d.x = clamp(x, d.r, width - d.r)},${d.y = clamp(y, d.r, height - d.r)})`);
  update();
}

function dragended() {
  svg.style("overflow", null);
}

function update() {
  const c = apolloniusCircle(c1.x, c1.y, c1.r, c2.x, c2.y, c2.r, c3.x, c3.y, c3.r);
  if (c.r > 0) {
    ring.style("display", null).attr("transform", "translate(" + c.x + "," + c.y + ")");
    ring.select(".ring-inner").attr("r", c.r - 3);
    ring.select(".ring-outer").attr("r", c.r);
  } else {
    ring.style("display", "none");
  }
}

display(svg.node());
```

The second chart shows all the circles.

```js
const width = 928;
const height = 600;
const svg = d3.create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

const c1 = ({x: 180, y: 250, r: 80});
const c2 = ({x: 400, y: 100, r: 20});
const c3 = ({x: 400, y: 300, r: 120});

const color = d3.scaleOrdinal().range(d3.schemeCategory10);

const circle = svg.selectAll(".circle")
    .data([c1, c2, c3])
  .enter().append("g")
    .attr("class", "circle")
    .attr("transform", ({x, y}) => `translate(${x},${y})`)
    .call(g => g.append("circle").attr("r", ({r}) => r))
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const ring = svg.selectAll(".ring")
    .data([
      () => apolloniusCircle(c1.x, c1.y, +c1.r, c2.x, c2.y, +c2.r, c3.x, c3.y, +c3.r),
      () => apolloniusCircle(c1.x, c1.y, +c1.r, c2.x, c2.y, +c2.r, c3.x, c3.y, -c3.r),
      () => apolloniusCircle(c1.x, c1.y, +c1.r, c2.x, c2.y, -c2.r, c3.x, c3.y, +c3.r),
      () => apolloniusCircle(c1.x, c1.y, +c1.r, c2.x, c2.y, -c2.r, c3.x, c3.y, -c3.r),
      () => apolloniusCircle(c1.x, c1.y, -c1.r, c2.x, c2.y, +c2.r, c3.x, c3.y, +c3.r),
      () => apolloniusCircle(c1.x, c1.y, -c1.r, c2.x, c2.y, +c2.r, c3.x, c3.y, -c3.r),
      () => apolloniusCircle(c1.x, c1.y, -c1.r, c2.x, c2.y, -c2.r, c3.x, c3.y, +c3.r),
      () => apolloniusCircle(c1.x, c1.y, -c1.r, c2.x, c2.y, -c2.r, c3.x, c3.y, -c3.r)
    ])
  .enter().insert("g", ".circle")
    .attr("class", "ring")
    .style("stroke", color);

ring.append("circle")
    .attr("class", "ring-outer");

ring.append("circle")
    .attr("class", "ring-inner");

update();

function dragstarted() {
  d3.select(this).raise();
  svg.style("overflow", "visible");
}

function dragged({x, y}, d) {
  d3.select(this).attr("transform", `translate(${d.x = clamp(x, d.r, width - d.r)},${d.y = clamp(y, d.r, height - d.r)})`);
  update();
}

function dragended() {
  svg.style("overflow", null);
}

function update() {
  ring.each(function(f) {
    const c = f();
    if (!isNaN(c.r)) {
      const r = Math.abs(c.r);
      const ring = d3.select(this).style("display", null)
          .attr("transform", `translate(${c.x},${c.y})`);
      ring.select(".ring-inner").attr("r", r - 3);
      ring.select(".ring-outer").attr("r", r);
    } else {
      d3.select(this).style("display", "none");
    }
  })
}

display(svg.node());
```

---

```js echo
function apolloniusCircle(x1, y1, r1, x2, y2, r2, x3, y3, r3) {

  // The quadratic equation (1):
  //
  //    0 = (x - x1)² + (y - y1)² - (r ± r1)²
  //    0 = (x - x2)² + (y - y2)² - (r ± r2)²
  //    0 = (x - x3)² + (y - y3)² - (r ± r3)²
  //
  // Use a negative radius to choose a different circle.
  // We must rewrite this in standard form Ar² + Br + C = 0 to solve for r.
  // Per //mathworld.wolfram.com/ApolloniusProblem.html

  const a2 = 2 * (x1 - x2),
      b2 = 2 * (y1 - y2),
      c2 = 2 * (r2 - r1),
      d2 = x1 * x1 + y1 * y1 - r1 * r1 - x2 * x2 - y2 * y2 + r2 * r2,
      a3 = 2 * (x1 - x3),
      b3 = 2 * (y1 - y3),
      c3 = 2 * (r3 - r1),
      d3 = x1 * x1 + y1 * y1 - r1 * r1 - x3 * x3 - y3 * y3 + r3 * r3;

  // Giving:
  //
  //   x = (b2 * d3 - b3 * d2 + (b3 * c2 - b2 * c3) * r) / (a3 * b2 - a2 * b3)
  //   y = (a3 * d2 - a2 * d3 + (a2 * c3 - a3 * c2) * r) / (a3 * b2 - a2 * b3)
  //
  // Expand x - x1, substituting definition of x in terms of r.
  //
  //   x - x1 = (b2 * d3 - b3 * d2 + (b3 * c2 - b2 * c3) * r) / (a3 * b2 - a2 * b3) - x1
  //          = (b2 * d3 - b3 * d2) / (a3 * b2 - a2 * b3) + (b3 * c2 - b2 * c3) / (a3 * b2 - a2 * b3) * r - x1
  //          = bd / ab + bc / ab * r - x1
  //          = xa + xb * r
  //
  // Where:

  const ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / ab - x1,
      xb = (b3 * c2 - b2 * c3) / ab;

  // Likewise expand y - y1, substituting definition of y in terms of r.
  //
  //   y - y1 = (a3 * d2 - a2 * d3 + (a2 * c3 - a3 * c2) * r) / (a3 * b2 - a2 * b3) - y1
  //          = (a3 * d2 - a2 * d3) / (a3 * b2 - a2 * b3) + (a2 * c3 - a3 * c2) / (a3 * b2 - a2 * b3) * r - y1
  //          = ad / ab + ac / ab * r - y1
  //          = ya + yb * r
  //
  // Where:

  const ya = (a3 * d2 - a2 * d3) / ab - y1,
      yb = (a2 * c3 - a3 * c2) / ab;

  // Expand (x - x1)², (y - y1)² and (r - r1)²:
  //
  //  (x - x1)² = xb * xb * r² + 2 * xa * xb * r + xa * xa
  //  (y - y1)² = yb * yb * r² + 2 * ya * yb * r + ya * ya
  //  (r - r1)² = r² - 2 * r1 * r + r1 * r1.
  //
  // Substitute back into quadratic equation (1):
  //
  //   0 = xb * xb * r² + yb * yb * r² - r²
  //       + 2 * xa * xb * r + 2 * ya * yb * r + 2 * r1 * r
  //       + xa * xa + ya * ya - r1 * r1
  //
  // Rewrite in standard form Ar² + Br + C = 0,
  // then plug into the quadratic formula to solve for r, x and y.

  const A = xb * xb + yb * yb - 1,
      B = 2 * (xa * xb + ya * yb + r1),
      C = xa * xa + ya * ya - r1 * r1,
      r = A ? (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A) : (-C / B);
  return {x: xa + xb * r + x1, y: ya + yb * r + y1, r};
}


function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}
```

<style>

.circle {
  fill-opacity: .5;
  fill: currentColor;
}

.ring {
  fill: none;
  stroke: currentColor;
  pointer-events: none;
}

.ring-inner {
  stroke-width: 5px;
  stroke-opacity: .25;
}

</style>
