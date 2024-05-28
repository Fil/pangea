---
source: https://observablehq.com/@d3/adaptive-sampling
author: Mike Bostock
index: true
---

# Adaptive sampling

D3’s projections use **adaptive sampling** to increase the accuracy of projected lines and polygons while still performing efficiently.

<figure>${c1}<figcaption>No sampling</figcaption></figure>

Without sampling, only the input vertices of polygons are projected. This results in the artifacts (visible above) due to projected lines becoming curves.

<figure>${c2}<figcaption>Uniform sampling</figcaption></figure>

Uniform sampling improves the appearance by adding interstitial samples between input vertices. It is inefficient because most samples are not needed, and even areas of extreme distortion still exhibit artifacts!

<figure>${c3}<figcaption>Adaptive sampling</figcaption></figure>

Adaptive sampling takes an idea from [line simplification](https://bost.ocks.org/mike/simplify/) and prioritizes samples based on curvature, producing high-quality results with low overhead.


```js
function Chart(coordinates, {
  width = 640,
  height = width / 2,
  inset = 0,
  precision = 0.2,
  graticule = d3.geoGraticule10(),
  projection = d3.geoEquirectangular().fitExtent([[inset, inset], [width - inset, height - inset]], {type: "Sphere"})
} = {}) {
  const path = d3.geoPath(projection);
  const line = {type: "LineString", coordinates};

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");
  
  const g = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#f00")
      .attr("stroke-width", 1.5);

  const pathGraticule = g.append("path")
      .attr("stroke", "#999")
      .attr("stroke-width", 0.5);
  
  const pathLine = g.append("path");

  let point = g.append("g")
    .selectAll("circle");

  return Object.assign(svg.node(), {
    rotate(rotate) {
      projection.rotate(rotate);

      // Render the line with the specified precision.
      projection.precision(precision);
      pathLine.attr("d", path(line));

      // Override the path context to extract the coordinates.
      const context = new BufferContext();
      path.context(context)(line);
      path.context(null);
      point = point      
        .data(context.buffer())
        .join("circle")
          .attr("r", 4.5)
          .attr("transform", (d) => `translate(${d})`);

      // Render the graticule with the default precision.
      projection.precision(0.2);
      pathGraticule.attr("d", path(graticule));

      return svg.node();
    }
  });
}

class BufferContext {
  constructor() { this._ = []; }
  moveTo(x, y) { this._.push([x, y]); }
  lineTo(x, y) { this._.push([x, y]); }
  closePath() {}
  buffer() {const _ = this._; this._ = []; return _;}
}

const c1 = Chart([180, ...d3.range(-90, 180, 90), 180].map((x) => [x, 0]), {precision: 0});
const c2 = Chart([180].concat(d3.range(-176, 180, 4), [180]).map((x) => [x, 0]), {precision: 0});
const c3 = Chart([180, ...d3.range(-90, 180, 90), 180].map((x) => [x, 0]));

const animate = (function* () {
  while (true) {
    const rotate = [Date.now() * -0.003, 0, 89];
    c1.rotate(rotate);
    c2.rotate(rotate);
    c3.rotate(rotate);
    yield rotate;
  }
})();
```