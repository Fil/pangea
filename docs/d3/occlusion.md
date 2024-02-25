---
source: https://observablehq.com/@fil/occlusion
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Occlusion</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Occlusion

Hides the text nodes that are covered by another node. Add a data-priority attribute to sort by priority. (If you have very many labels, Benjamin Schmidt’s [version](https://observablehq.com/@bmschmidt/finding-text-occlusion-with-quadtrees) explores efficient optimization strategies with quadtrees or RBush.)

Usage:

```{js}
import {occlusion} from "@fil/occlusion"
svg.call(occlusion)
```

Style with CSS:

```{css}
.occluded { display:none }
```

```js echo
const svg = {
  const width = 928;
  const height = 400;

  const svg = d3
    .create("svg")
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 14.5px sans-serif;");

  // Important! Make sure the SVG is attached to the DOM before calling occlusion(),
  // so that the bounding boxes can be measured.
  yield svg.node();

  const n = 1000;
  svg
    .selectAll("text")
    .data(rwg(n))
    .join("text")
    .text((d) => d)
    .attr("x", () => (width * Math.random()) | 0)
    .attr("y", () => (height * Math.random()) | 0);

  // Raise on mouseover, set data-priority on click.
  let priority = 0;
  svg
    .selectAll("text")
    .on("mouseover", function () {
      d3.select(this).attr("fill", "red").raise();
      svg.call(occlusion);
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", null);
      svg.call(occlusion);
    })
    .on("click", function () {
      const node = d3.select(this);
      const cur = +node.attr("data-priority");
      node
        .attr("data-priority", cur ? null : ++priority)
        .style("fill", cur ? null : "steelblue");
      svg.call(occlusion);
    });

  // Introduce random changes.
  do {
    const i = (Math.random() * n) | 0;
    svg.select(`text:nth-of-type(${i})`).raise();
    svg.call(occlusion);

    await Promises.delay(300);
  } while (true);
}
```

```js echo
html`<style>
  svg {
    cursor: pointer;
  }
  svg text.occluded {
    opacity: 0.1;
  }
</style>`;
```

```js echo
function occlusion(svg, against = "text") {
  const nodes = d3
    .sort(svg.selectAll(against), (node) => +node.getAttribute("data-priority"))
    .reverse()
    .map((node) => {
      const {x, y, width, height} = node.getBoundingClientRect();
      return {node, x, y, width, height};
    });

  const visible = [];
  for (const d of nodes) {
    const occluded = visible.some((e) => intersectRect(d, e));
    d3.select(d.node).classed("occluded", occluded);
    if (!occluded) visible.push(d);
  }
  return visible;
}
```

```js echo
// This intersection function works for rect and text, but not so much for circles.
function intersectRect(a, b) {
  return !(a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y);
}
```

```js echo
// https://www.npmjs.com/package/random-words
rwg = require("random-words@1.1.0").catch(() => window.words);
```
