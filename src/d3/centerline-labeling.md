---
source: https://observablehq.com/@veltman/centerline-labeling
index: false
draft: true
---

```js
md`
# Centerline labeling

An explorable calculator for placing curved labels inside weird shapes.
`;
```

```js
viewof place = radio({
  options: places.features.map(f => f.properties.name),
  value: "California"
})
```

```js
{
  const {id, href} = DOM.uid("centerline"); // necessary for Firefox
  return svg`<svg width=${width} height=${height}>
    <path d="${background}" stroke="#444" fill="#f9f9f9"/>
    <path d=${centerline} id="${id}" stroke="none" fill="none" />
    <text class="label" dy="0.35em" fill="#444" style="font-size: ${maxFontSize}px;">
      <textPath xlink:href="${href}" startOffset="${100 * offset}%" text-anchor="middle">${place}</textPath>
    </text>
  </svg>`;
}
```

```js
md`
## Step 1: turn the shape into evenly spaced points

First, we walk the perimeter of the shape to get a set of evenly spaced points that approximate the original shape. Adjust the slider to change how many points we're using (more points = more precision and more computation).
`;
```

```js
viewof numPerimeterPoints = slider({
  min: 10,
  max: 200,
  step: 1,
  value: 50,
  title: "Number of perimeter points"
})
```

```js
svg`<svg width=${width} height=${height}>
  <path d="${background}" stroke="#444" fill="#f9f9f9"/>
  ${polygon.map((p) => `<circle cx=${p[0]} cy=${p[1]} fill="#e91e63" r="2"/>`)}
</svg>`;
```

```js
const polygon = getPointsAlongPolyline(outerRing, numPerimeterPoints);
```

```js
const outerRing = {
  const s = projection.scale(),
    t = projection.translate();

  return feature.geometry.coordinates[0][0]
    .slice(1)
    .map(point => [s * point[0] + t[0], s * point[1] + t[1]]);
}
```

```js
md`
## Step 2: compute the Voronoi diagram of the points

Next, we compute the Voronoi diagram from our generated points, and we clip all the edges to the boundary of our polygon.
`;
```

```js
svg`<svg width=${width} height=${height}>
  <path d="${background}" stroke="#444" fill="#f9f9f9" opacity="0.15"/>
  ${(clipped ? edges : voronoi).map(
    (e) => `<line stroke="#999" x1=${e[0][0]} y1=${e[0][1]} x2=${e[1][0]} y2=${e[1][1]} />`
  )}
  ${polygon.map((p) => `<circle cx=${p[0]} cy=${p[1]} fill="#e91e63" r="2"/>`)}
</svg>`;
```

```js
const clipped = {
  let clip = false;
  yield clip;
  while (true) {
    clip = !clip;
    yield Promises.delay(1000, clip);
  }
}
```

```js
const voronoi = {
  const [x0, x1] = d3.extent(polygon.map(d => d[0])),
    [y0, y1] = d3.extent(polygon.map(d => d[1]));

  return d3.voronoi().extent([[x0 - 1, y0 - 1], [x1 + 1, y1 + 1]])(polygon).edges;
}
```

```js
const edges = voronoi
  .filter((edge) => {
    if (edge && edge.right) {
      const inside = edge.map((point) => d3.polygonContains(polygon, point));
      if (inside[0] === inside[1]) {
        return inside[0];
      }
      if (inside[1]) {
        edge.reverse();
      }
      return true;
    }
    return false;
  })
  .map(([start, end] = []) => {
    const {intersection, distance} = findClosestPolygonIntersection(start, end, polygon);

    if (intersection) {
      intersection.clipped = true;
    }

    // Each edge has a starting point, a clipped end point, and an original end point
    const edge = [start, intersection || end];
    edge.distance = intersection ? distance : distanceBetween(start, end);

    return edge;
  });
```

```js
md`
## Step 3: Compute a graph from the clipped Voronoi edges

Use [node-dijkstra](https://github.com/albertorestifo/node-dijkstra) to construct a graph of all the nodes and edges in the Voronoi diagram.
`;
```

```js
svg`<svg width=${width} height=${height}>
  <path d="${background}" stroke="#444" fill="#f9f9f9" opacity="0.15"/>
  ${edges.map((e) => `<line stroke="#999" x1=${e[0][0]} y1=${e[0][1]} x2=${e[1][0]} y2=${e[1][1]} />`)}
  ${nodes.map((p) => `<circle cx=${p[0]} cy=${p[1]} fill=${p.clipped ? "#e91e63" : "#4db6ac"} r="2"/>`)}
</svg>`;
```

```js
const graph = {
  const graph = new Graph();
  nodes.forEach(node => graph.addNode(node.id, node.links));
  return graph;
}
```

```js
const nodes = {
  const nodes = [];

  edges.forEach(edge => {
    edge.forEach((node, i) => {
      if (!i || !node.clipped) {
        const match = nodes.find(d => d === node);
        if (match) {
          return (node.id = match.id);
        }
      }
      node.id = nodes.length.toString();
      node.links = {};
      nodes.push(node);
    });
    edge[0].links[edge[1].id] = edge.distance;
    edge[1].links[edge[0].id] = edge.distance;
  });

  return nodes;
}
```

```js
const perimeterNodes = nodes.filter((d) => d.clipped);
```

```js
md`
## Step 4: walk the graph and find the best path

For each pair of perimeter nodes, find the shortest path between them. Keep the longest one we find, or use a strategy that also factors in how straight the line is.
`;
```

```js
viewof strategy = radio({
  title: "Optimization strategy",
  description: "edit fitnessFunction() below to create a custom strategy!",
  options: [
    { label: "Just take the longest one", value: "longest" },
    { label: "Care a little about straightness", value: "medium" },
    { label: "Care a lot about straightness", value: "high" }
  ],
  value: "medium"
})
```

```js
svg`<svg width=${width} height=${height}>
  ${edges.map((e) => `<line stroke="#999" x1=${e[0][0]} y1=${e[0][1]} x2=${e[1][0]} y2=${e[1][1]} />`)}
  ${
    traversal.bestPath &&
    `<path stroke-width="3" stroke="#e91e63" fill="none" d=${"M" + traversal.bestPath.join("L")} />`
  }
  ${
    traversal.currentPath &&
    `<path stroke-width="3" stroke="#ffd54f" fill="none" d=${"M" + traversal.currentPath.join("L")} />`
  }
</svg>`;
```

```js
viewof speed = radio({
  title: "Traversal speed",
  description: "Slow things down to see each step.",
  options: [
    { label: "Slow", value: "250" },
    { label: "Medium", value: "100" },
    { label: "Fast", value: "0" }
  ],
  value: "0"
})
```

```js
const traversal = {
  let totalBest;

  for (let i = 0; i < perimeterNodes.length; i++) {
    const start = perimeterNodes[i];
    const longestShortestPath = perimeterNodes.slice(i + 1).reduce((nodeBest, node) => {
      const path = graph.path(node.id, start.id, { cost: true });
      if (path && (!nodeBest || path.cost > nodeBest.cost)) {
        return path;
      }
      return nodeBest;
    }, null);

    if (longestShortestPath && longestShortestPath.path) {
      longestShortestPath.path = longestShortestPath.path.map(id => nodes[+id]);
      longestShortestPath.cost = fitnessFunction(longestShortestPath.path, longestShortestPath.cost);
      if (!totalBest || longestShortestPath.cost > totalBest.cost) {
        totalBest = longestShortestPath;
      }

      yield Promises.delay(+speed, {
        bestPath: totalBest.path,
        currentPath: longestShortestPath.path
      });
    }
  }
  if (totalBest) {
    yield {
      bestPath: totalBest.path
    };
  }
}
```

```js
md`
## Step 5: simplify the best line

We can use [simplify-js](http://mourner.github.io/simplify-js/) and a basis spline to smooth out our best candidate, and flip the direction of the line if the text would be upside down.
`;
```

```js
viewof simplification = slider({
  min: 0.1,
  max: 50,
  value: 8,
  title: "Simplification tolerance",
  description: "How much should we simplify the best line once we find it?"
})
```

```js
svg`<svg width=${width} height=${height}>
  <path d="${background}" stroke="#444" fill="#f9f9f9" opacity="0.15"/>
  <path d="M${traversal.bestPath.join(
    "L"
  )}" stroke-width="2" stroke-dasharray="5,5" stroke="#f06292" fill="none" opacity="0.75"/>
  <path d="${centerline}" stroke-width="2" stroke="#e91e63" fill="none" opacity="0.75" />
</svg>`;
```

```js
const simplifiedLine = simplify(traversal.bestPath);
```

```js
const flipText = {
  const svg = DOM.svg(width, height);

  const path = d3.select(svg)
    .append("path")
    .attr("d", "M" + simplifiedLine.join("L"))
    .node();

  const tangent = tangentAt(path, path.getTotalLength() * offset);

  return Math.abs(tangent) > Math.PI / 2;
}
```

```js
const centerline = d3.line().curve(d3.curveBasis)(flipText ? simplifiedLine.slice(0).reverse() : simplifiedLine);
```

```js
md`
## Step 7: choose the best offset and font size

As a final step, we can roughly estimate how large we can make the text without overrunning the shape's borders.

We'll approximate this by walking the centerline from the middle out, and measuring the shortest perpendicular distance from the center to the boundary at each step. Combined with the aspect ratio of the text, we then know roughly how large we can make the text without it overrunning the containing shape's border.
`;
```

```js
viewof measurementStep = slider({
  min: 1,
  max: 25,
  value: 5,
  title: "Measurement step",
  description: "How frequently should we measure the available space?"
})
```

```js
viewof offset = slider({
  min: 0.01,
  max: 0.99,
  value: 0.5,
  title: "Text offset",
  description: "How far along the path should we place the label? (0.5 = the center)"
})
```

```js
{
  const {id, href} = DOM.uid("centerline"); // necessary for Firefox
  return svg`<svg width=${width} height=${height}>
    <path d="${background}" stroke="#444" fill="#f9f9f9" opacity="0.15"/>
    <path d=${centerline} id="${id}" stroke="#ddd" fill="none" stroke-dasharray="4,4" />
    ${measurements.map((pair, i) =>
      pair.map(
        (line) =>
          `<line x1=${line[0][0]} y1=${line[0][1]} x2=${line[1][0]} y2=${line[1][1]} stroke=${
            i <= (maxFontSize * widthPerPixel) / (2 * measurementStep) ? "#F8BBD0" : "#ddd"
          } />`
      )
    )}
    <text class="label" opacity="0.5" dy="0.35em" style="font-size: ${maxFontSize}px;" fill="none" stroke="#444">
      <textPath xlink:href="${href}" startOffset="${100 * offset}%" text-anchor="middle">${place}</textPath>
    </text>
  </svg>`;
}
```

```js
const maxFontSize = {
 let ceiling = Infinity,
     maxWidth = 0;

 measurements.forEach((pair, i) => {
   pair.forEach(measurement => {
     ceiling = Math.min(measurement.distance, ceiling);
   });
   maxWidth = Math.max(maxWidth, 2 * Math.min(i * measurementStep, ceiling * aspectRatio));
 });

 return maxWidth / widthPerPixel;
}
```

```js
const measurements = {
  const svg = DOM.svg(width, height);

  const path = d3
    .select(svg)
    .append("path")
    .attr("d", centerline)
    .node();

  const length = path.getTotalLength();

  const measurements = [];

  for (
    let halfwidth = 0;
    halfwidth < Math.min(length * offset, length * (1 - offset));
    halfwidth += measurementStep
  ) {
    measurements.push(
      [length * offset + halfwidth, length * offset - halfwidth]
        .map(l => {
          const { x, y } = path.getPointAtLength(l),
            tangent = tangentAt(path, l);

          const perpendiculars = [tangent - Math.PI / 2, tangent + Math.PI / 2]
            .map(angle =>
              findClosestPolygonIntersection(
                [x, y],
                rotatePoint([x + width, y], angle, [x, y]),
                polygon
              )
            )
            .filter(d => d.intersection)
            .sort((a, b) => a.distance - b.distance);

          if (!perpendiculars.length) {
            return null;
          }

          const { intersection, distance } = perpendiculars[0];

          const line = [
            intersection,
            [2 * x - intersection[0], 2 * y - intersection[1]]
          ];

          line.distance = distance;

          return line;
        })
        .filter(d => d)
    );
  }

  return measurements;
}
```

```js
const aspectRatio = bbox.width / bbox.height;
```

```js
const widthPerPixel = bbox.width / 100;
```

```js
const bbox = {
  const svg = DOM.svg(width, height);

  const text = d3.select(svg)
    .append("text")
    .attr("class", "label")
    .style("font-size", "100px")
    .text(place)
    .node();

  // Have to yield the SVG first before element has a measurable width and height
  yield svg;
  yield text.getBBox();
}
```

```js
md`
## Epilogue: other potential exercises

1. Rather than manually select the starting offset along the path, we could [automatically find the roomiest offset](https://bl.ocks.org/veltman/6204863ae290904fbae83ca5490d4b1b).
2. We could do a side-by-side comparison of the results of this approach vs. a flat label using [Polylabel](https://github.com/mapbox/polylabel) for different kinds of shapes and see where it tends to break down.
3. We could make a label span multiple shapes, like the Hawaiian Islands, by using the [concave hull](https://github.com/mapbox/concaveman) of the group of shapes as the basis for all our operations.
4. Sinuosity might not be the best choice for a fitness function, we could come up with some other heuristic that factors in some other sense of straightness or smoothness of the centerline.
5. We could avoid using \`.getPointAtLength()\` for measurement and do everything with DOM-less math for better performance (but maybe more verbose code).
`;
```

```js
md`
## Appendix
`;
```

```js
const height = Math.min(width / 2, 400);
```

```js
const places = d3.json(
  "https://gist.githubusercontent.com/veltman/644f16a90259a20a88b036ef189d71fd/raw/d2f0a027bfc9b63ca223b509bd2cfe0cf5d138c2/places.geojson"
);
```

```js
const feature = places.features.find((f) => f.properties.name === place);
```

```js
// Rescale to fit at the current screen width
projection = d3.geoIdentity().fitExtent(
  [
    [5, 5],
    [width - 5, height - 5]
  ],
  feature
);
```

```js
const background = d3.geoPath().projection(projection)(feature);
```

```js
function fitnessFunction(path, length) {
  let fitness = length;
  if (strategy !== "longest") {
    const sinuosity = length / distanceBetween(path[0], path[path.length - 1]);

    // divide the length by some power of the sinuosity
    // these choices are arbitrary, play with them!
    fitness /= Math.pow(sinuosity, strategy === "medium" ? 2 : 4);
  }
  return fitness;
}
```

```js
function findClosestPolygonIntersection(start, end, polygon) {
  return polygon.reduce((best, point, i) => {
    const intersection = findIntersection(start, end, point, polygon[i + 1] || polygon[0]);
    if (intersection) {
      const distance = distanceBetween(start, intersection);
      if (!best.distance || distance < best.distance) {
        return {intersection, distance};
      }
    }
    return best;
  }, {});
}
```

```js
function getPointsAlongPolyline(polyline, count) {
  const distances = polyline.map((p, i) => distanceBetween(p, polyline[i + 1] || polyline[0]));
  const totalLength = d3.sum(distances);
  const step = totalLength / count;
  let traversed = 0;
  let next = step / 2;

  const done = polyline.reduce((arr, point, i) => {
    while (next < traversed + distances[i]) {
      let a = point,
        b = polyline[i + 1] || polyline[0],
        pct = (next - traversed) / distances[i];
      arr.push([a[0] + (b[0] - a[0]) * pct, a[1] + (b[1] - a[1]) * pct]);
      next += step;
    }
    traversed += distances[i];
    return arr;
  }, []);
  return done;
}
```

```js
function findIntersection(a1, a2, b1, b2) {
  // Adapted from https://github.com/Turfjs/turf-line-slice-at-intersection
  const uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]),
    ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]),
    uB = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

  if (uB !== 0) {
    const ua = uaT / uB,
      ub = ubT / uB;
    if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
      return [a1[0] + ua * (a2[0] - a1[0]), a1[1] + ua * (a2[1] - a1[1])];
    }
  }
}
```

```js
function rotatePoint(point, angle, center) {
  const x2 = (point[0] - center[0]) * Math.cos(angle) - (point[1] - center[1]) * Math.sin(angle),
    y2 = (point[0] - center[0]) * Math.sin(angle) + (point[1] - center[1]) * Math.cos(angle);

  return [
    (point[0] - center[0]) * Math.cos(angle) - (point[1] - center[1]) * Math.sin(angle) + center[0],
    (point[0] - center[0]) * Math.sin(angle) + (point[1] - center[1]) * Math.cos(angle) + center[1]
  ];
}
```

```js
function tangentAt(el, len) {
  const a = el.getPointAtLength(Math.max(len - 0.01, 0)),
    b = el.getPointAtLength(len + 0.01);

  return Math.atan2(b.y - a.y, b.x - a.x);
}
```

```js
function distanceBetween(a, b) {
  const dx = a[0] - b[0],
    dy = a[1] - b[1];

  return Math.sqrt(dx * dx + dy * dy);
}
```

```js
const Graph = {
  // Observable-compatible stub of Alberto Restifo's node-dijsktra
  // https://github.com/albertorestifo/node-dijkstra
  class Queue {

    /**
     * Creates a new empty priority queue
     */
    constructor() {
      // The `keys` set is used to greatly improve the speed at which we can
      // check the presence of a value in the queue
      this.keys = new Set();
      this.queue = [];
    }

    /**
     * Sort the queue to have the least expensive node to visit on top
     *
     * @private
     */
    sort() {
      this.queue.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Sets a priority for a key in the queue.
     * Inserts it in the queue if it does not already exists.
     *
     * @param {any}     key       Key to update or insert
     * @param {number}  value     Priority of the key
     * @return {number} Size of the queue
     */
    set(key, value) {
      const priority = Number(value);
      if (isNaN(priority)) throw new TypeError('"priority" must be a number');

      if (!this.keys.has(key)) {
        // Insert a new entry if the key is not already in the queue
        this.keys.add(key);
        this.queue.push({ key, priority });
      } else {
        // Update the priority of an existing key
        this.queue.map((element) => {
          if (element.key === key) {
            Object.assign(element, { priority });
          }

          return element;
        });
      }

      this.sort();
      return this.queue.length;
    }

    /**
     * The next method is used to dequeue a key:
     * It removes the first element from the queue and returns it
     *
     * @return {object} First priority queue entry
     */
    next() {
      const element = this.queue.shift();

      // Remove the key from the `_keys` set
      this.keys.delete(element.key);

      return element;
    }

    /**
     * @return {boolean} `true` when the queue is empty
     */
    isEmpty() {
      return Boolean(this.queue.length === 0);
    }

    /**
     * Check if the queue has a key in it
     *
     * @param {any} key   Key to lookup
     * @return {boolean}
     */
    has(key) {
      return this.keys.has(key);
    }

    /**
     * Get the element in the queue with the specified key
     *
     * @param {any} key   Key to lookup
     * @return {object}
     */
    get(key) {
      return this.queue.find(element => element.key === key);
    }

  }

  class Graph {
    /**
     * Creates a new Graph, optionally initializing it a nodes graph representation.
     *
     * A graph representation is an object that has as keys the name of the point and as values
     * the points reacheable from that node, with the cost to get there:
     *
     *     {
     *       node (Number|String): {
     *         neighbor (Number|String): cost (Number),
     *         ...,
     *       },
     *     }
     *
     * In alternative to an object, you can pass a `Map` of `Map`. This will
     * allow you to specify numbers as keys.
     *
     * @param {Objec|Map} [graph] - Initial graph definition
     * @example
     *
     * const route = new Graph();
     *
     * // Pre-populated graph
     * const route = new Graph({
     *   A: { B: 1 },
     *   B: { A: 1, C: 2, D: 4 },
     * });
     *
     * // Passing a Map
     * const g = new Map()
     *
     * const a = new Map()
     * a.set('B', 1)
     *
     * const b = new Map()
     * b.set('A', 1)
     * b.set('C', 2)
     * b.set('D', 4)
     *
     * g.set('A', a)
     * g.set('B', b)
     *
     * const route = new Graph(g)
     */
    constructor(graph) {
      if (graph instanceof Map) {
        validateDeep(graph);
        this.graph = graph;
      } else if (graph) {
        this.graph = toDeepMap(graph);
      } else {
        this.graph = new Map();
      }
    }

    /**
     * Adds a node to the graph
     *
     * @param {string} name      - Name of the node
     * @param {Object|Map} neighbors - Neighbouring nodes and cost to reach them
     * @return {this}
     * @example
     *
     * const route = new Graph();
     *
     * route.addNode('A', { B: 1 });
     *
     * // It's possible to chain the calls
     * route
     *   .addNode('B', { A: 1 })
     *   .addNode('C', { A: 3 });
     *
     * // The neighbors can be expressed in a Map
     * const d = new Map()
     * d.set('A', 2)
     * d.set('B', 8)
     *
     * route.addNode('D', d)
     */
    addNode(name, neighbors) {
      let nodes;
      if (neighbors instanceof Map) {
        validateDeep(neighbors);
        nodes = neighbors;
      } else {
        nodes = toDeepMap(neighbors);
      }

      this.graph.set(name, nodes);

      return this;
    }

    /**
     * @deprecated since version 2.0, use `Graph#addNode` instead
     */
    addVertex(name, neighbors) {
      return this.addNode(name, neighbors);
    }

    /**
     * Removes a node and all of its references from the graph
     *
     * @param {string|number} key - Key of the node to remove from the graph
     * @return {this}
     * @example
     *
     * const route = new Graph({
     *   A: { B: 1, C: 5 },
     *   B: { A: 3 },
     *   C: { B: 2, A: 2 },
     * });
     *
     * route.removeNode('C');
     * // The graph now is:
     * // { A: { B: 1 }, B: { A: 3 } }
     */
    removeNode(key) {
      this.graph = removeDeepFromMap(this.graph, key);

      return this;
    }

    /**
     * Compute the shortest path between the specified nodes
     *
     * @param {string}  start     - Starting node
     * @param {string}  goal      - Node we want to reach
     * @param {object}  [options] - Options
     *
     * @param {boolean} [options.trim]    - Exclude the origin and destination nodes from the result
     * @param {boolean} [options.reverse] - Return the path in reversed order
     * @param {boolean} [options.cost]    - Also return the cost of the path when set to true
     *
     * @return {array|object} Computed path between the nodes.
     *
     *  When `option.cost` is set to true, the returned value will be an object with shape:
     *    - `path` *(Array)*: Computed path between the nodes
     *    - `cost` *(Number)*: Cost of the path
     *
     * @example
     *
     * const route = new Graph()
     *
     * route.addNode('A', { B: 1 })
     * route.addNode('B', { A: 1, C: 2, D: 4 })
     * route.addNode('C', { B: 2, D: 1 })
     * route.addNode('D', { C: 1, B: 4 })
     *
     * route.path('A', 'D') // => ['A', 'B', 'C', 'D']
     *
     * // trimmed
     * route.path('A', 'D', { trim: true }) // => [B', 'C']
     *
     * // reversed
     * route.path('A', 'D', { reverse: true }) // => ['D', 'C', 'B', 'A']
     *
     * // include the cost
     * route.path('A', 'D', { cost: true })
     * // => {
     * //       path: [ 'A', 'B', 'C', 'D' ],
     * //       cost: 4
     * //    }
     */
    path(start, goal, options = {}) {
      // Don't run when we don't have nodes set
      if (!this.graph.size) {
        if (options.cost) return { path: null, cost: 0 };

        return null;
      }

      const explored = new Set();
      const frontier = new Queue();
      const previous = new Map();

      let path = [];
      let totalCost = 0;

      let avoid = [];
      if (options.avoid) avoid = [].concat(options.avoid);

      if (avoid.includes(start)) {
        throw new Error(`Starting node (${start}) cannot be avoided`);
      } else if (avoid.includes(goal)) {
        throw new Error(`Ending node (${goal}) cannot be avoided`);
      }

      // Add the starting point to the frontier, it will be the first node visited
      frontier.set(start, 0);

      // Run until we have visited every node in the frontier
      while (!frontier.isEmpty()) {
        // Get the node in the frontier with the lowest cost (`priority`)
        const node = frontier.next();

        // When the node with the lowest cost in the frontier in our goal node,
        // we can compute the path and exit the loop
        if (node.key === goal) {
          // Set the total cost to the current value
          totalCost = node.priority;

          let nodeKey = node.key;
          while (previous.has(nodeKey)) {
            path.push(nodeKey);
            nodeKey = previous.get(nodeKey);
          }

          break;
        }

        // Add the current node to the explored set
        explored.add(node.key);

        // Loop all the neighboring nodes
        const neighbors = this.graph.get(node.key) || new Map();
        neighbors.forEach((nCost, nNode) => {
          // If we already explored the node, or the node is to be avoided, skip it
          if (explored.has(nNode) || avoid.includes(nNode)) return null;

          // If the neighboring node is not yet in the frontier, we add it with
          // the correct cost
          if (!frontier.has(nNode)) {
            previous.set(nNode, node.key);
            return frontier.set(nNode, node.priority + nCost);
          }

          const frontierPriority = frontier.get(nNode).priority;
          const nodeCost = node.priority + nCost;

          // Otherwise we only update the cost of this node in the frontier when
          // it's below what's currently set
          if (nodeCost < frontierPriority) {
            previous.set(nNode, node.key);
            return frontier.set(nNode, nodeCost);
          }

          return null;
        });
      }

      // Return null when no path can be found
      if (!path.length) {
        if (options.cost) return { path: null, cost: 0 };

        return null;
      }

      // From now on, keep in mind that `path` is populated in reverse order,
      // from destination to origin

      // Remove the first value (the goal node) if we want a trimmed result
      if (options.trim) {
        path.shift();
      } else {
        // Add the origin waypoint at the end of the array
        path = path.concat([start]);
      }

      // Reverse the path if we don't want it reversed, so the result will be
      // from `start` to `goal`
      if (!options.reverse) {
        path = path.reverse();
      }

      // Return an object if we also want the cost
      if (options.cost) {
        return {
          path,
          cost: totalCost,
        };
      }

      return path;
    }

    /**
     * @deprecated since version 2.0, use `Graph#path` instead
     */
    shortestPath(...args) {
      return this.path(...args);
    }

  }

  function validateDeep(map) {
    if (!(map instanceof Map)) {
      throw new Error(`Invalid graph: Expected Map instead found ${typeof map}`);
    }

    map.forEach((value, key) => {
      if (typeof value === 'object' && value instanceof Map) {
        validateDeep(value);
        return;
      }

      if (typeof value !== 'number' || value <= 0) {
        throw new Error(`Values must be numbers greater than 0. Found value ${value} at ${key}`);
      }
    });
  }

  function toDeepMap(source) {
    const map = new Map();
    const keys = Object.keys(source);

    keys.forEach((key) => {
      const val = source[key];

      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        return map.set(key, toDeepMap(val));
      }

      if (!isValidNode(val)) {
        throw new Error(`Could not add node at key "${key}", make sure it's a valid node`, val);
      }

      return map.set(key, Number(val));
    });

    return map;
  }

  function isValidNode(val) {
    const cost = Number(val);

    if (isNaN(cost) || cost <= 0) {
      return false;
    }

    return true;
  }

  function removeDeepFromMap(map, key) {
    const newMap = new Map();

    for (const [aKey, val] of map) {
      if (aKey !== key && val instanceof Map) {
        newMap.set(aKey, removeDeepFromMap(val, key));
      } else if (aKey !== key) {
        newMap.set(aKey, val);
      }
    }

    return newMap;
  }

  return Graph;
}
```

```js
function simplify(points) {
  // Convert from [x, y] to { x, y } and back for simplify-js
  return simplifyJS(
    points.map((p) => ({x: p[0], y: p[1]})),
    simplification
  ).map((p) => [p.x, p.y]);
}
```

```js
const simplifyJS = require("simplify-js");
```

```js
const d3 = require("d3@5");
```

```js
import {slider, radio} from "@jashkenas/inputs";
```

```js
const styles = html`<style>
  .label {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
</style>`;
```
