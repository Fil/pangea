---
source: https://observablehq.com/@kerryrodden/sequences-sunburst
author: Kerry Rodden
index: true
---

# Sequences Sunburst

<p class=author>by <a href="https://observablehq.com/@kerryrodden">Kerry Rodden</a></p>

This example shows how it is possible to use a [sunburst visualization](./sunburst) with data that describes sequences of events. Hover over the segments to see the corresponding sequences.

A good use case is to summarize navigation paths through a web site or app, as in the sample data file. Where a funnel lets you understand a single pre-selected path, this allows you to see all possible paths. For example, you might want to compare visits that start directly on a product page (e.g. after landing there from a search engine) to visits where users arrive on the site's home page and navigate from there.

See also: the non-radial counterpart to this, [Sequences icicle](https://observablehq.com/@kerryrodden/sequences-icicle).

```js
const svg = d3.create("svg")
  .attr("viewBox", `0 0 ${breadcrumbWidth * 10} ${breadcrumbHeight}`)
  .style("font", "12px sans-serif")
  .style("margin", "5px");

const g = svg.selectAll("g")
  .data(sunburst.sequence)
  .join("g")
  .attr("transform", (d, i) => `translate(${i * breadcrumbWidth}, 0)`);

g.append("polygon")
  .attr("points", breadcrumbPoints)
  .attr("fill", d => color(d.data.name))
  .attr("stroke", "white");

g.append("text")
  .attr("x", (breadcrumbWidth + 10) / 2)
  .attr("y", 15)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .text(d => d.data.name);

svg
  .append("text")
  .text(sunburst.percentage > 0 ? sunburst.percentage + "%" : "")
  .attr("x", (sunburst.sequence.length + 0.5) * breadcrumbWidth)
  .attr("y", breadcrumbHeight / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle");

const breadcrumb = display(svg.node());
```

```js echo
const root = partition(data);
const svg = d3.create("svg");
// Make this into a view, so that the currently hovered sequence is available to the breadcrumb
const element = svg.node();
element.value = { sequence: [], percentage: 0.0 };

const label = svg
  .append("text")
  .attr("text-anchor", "middle")
  .attr("fill", "#888")
  .style("visibility", "hidden");

label
  .append("tspan")
  .attr("class", "percentage")
  .attr("x", 0)
  .attr("y", 0)
  .attr("dy", "-0.1em")
  .attr("font-size", "3em")
  .text("");

label
  .append("tspan")
  .attr("x", 0)
  .attr("y", 0)
  .attr("dy", "1.5em")
  .text("of visits begin with this sequence");

svg
  .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
  .style("max-width", `${width}px`)
  .style("font", "12px sans-serif");

const path = svg
  .append("g")
  .selectAll("path")
  .data(
    root.descendants().filter(d => {
      // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
      return d.depth && d.x1 - d.x0 > 0.001;
    })
  )
  .join("path")
  .attr("fill", d => color(d.data.name))
  .attr("d", arc);

svg
  .append("g")
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("mouseleave", () => {
    path.attr("fill-opacity", 1);
    label.style("visibility", "hidden");
    // Update the value of this view
    element.value = { sequence: [], percentage: 0.0 };
    element.dispatchEvent(new CustomEvent("input"));
  })
  .selectAll("path")
  .data(
    root.descendants().filter(d => {
      // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
      return d.depth && d.x1 - d.x0 > 0.001;
    })
  )
  .join("path")
  .attr("d", mousearc)
  .on("mouseenter", (event, d) => {
    // Get the ancestors of the current segment, minus the root
    const sequence = d
      .ancestors()
      .reverse()
      .slice(1);
    // Highlight the ancestors
    path.attr("fill-opacity", node =>
      sequence.indexOf(node) >= 0 ? 1.0 : 0.3
    );
    const percentage = ((100 * d.value) / root.value).toPrecision(3);
    label
      .style("visibility", null)
      .select(".percentage")
      .text(percentage + "%");
    // Update the value of this view with the currently hovered sequence and percentage
    element.value = { sequence, percentage };
    element.dispatchEvent(new CustomEvent("input"));
  });

const sunburst = view(element);
```

Features:

- works with data that is in a CSV format (you don't need to pre-generate a hierarchical JSON file, unless your data file is very large) - in Observable, you can just replace the file that's attached to the \`csv\` cell
- interactive breadcrumb trail helps to emphasize the sequence, so that it is easy for a first-time user to understand what they are seeing
- percentages are shown explicitly, to help overcome the distortion of the data that occurs when using a radial presentation

If you want to reuse this with your own data, here are some tips for generating the CSV file:

- no header is required (but it's OK if one is present)
- use a hyphen to separate the steps in the sequence
- every sequence should have an "end" marker as the last element, _unless_ it has been truncated because it is longer than the maximum sequence length (6, in the example). The purpose of the "end" marker is to distinguish a true end point (e.g. the user left the site) from an end point that has been forced by truncation.
- each line should be a complete path from root to leaf - don't include counts for intermediate steps. For example, include "home-search-end" and "home-search-product-end" but not "home-search" - the latter is computed by the partition layout, by adding up the counts of all the sequences with that prefix.
- to keep the number of permutations low, use a small number of unique step names, and a small maximum sequence length. Larger numbers of either of these will lead to a very large CSV that will be slow to process.
- keep the step names short

```js echo
const data = FileAttachment("/data/visit-sequences.csv").csv({array: true}).then(buildHierarchy);
```

```js echo
const partition = (data) =>
  d3.partition().size([2 * Math.PI, radius * radius])(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );
```

```js echo
const color = d3
  .scaleOrdinal()
  .domain(["home", "product", "search", "account", "other", "end"])
  .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"]);
```

```js echo
const width = 640;
const radius = width / 2;
```

```js echo
const arc = d3.arc()
  .startAngle((d) => d.x0)
  .endAngle((d) => d.x1)
  .padAngle(1 / radius)
  .padRadius(radius)
  .innerRadius((d) => Math.sqrt(d.y0))
  .outerRadius((d) => Math.sqrt(d.y1) - 1);
```

```js echo
const mousearc = d3.arc()
  .startAngle((d) => d.x0)
  .endAngle((d) => d.x1)
  .innerRadius((d) => Math.sqrt(d.y0))
  .outerRadius(radius);
```

```js echo
function buildHierarchy(csv) {
  // Helper function that transforms the given CSV into a hierarchical format.
  const root = {name: "root", children: []};
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0];
    const size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    const parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode["children"];
      const nodeName = parts[j];
      let childNode = null;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = {name: nodeName, children: []};
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = {name: nodeName, value: size};
        children.push(childNode);
      }
    }
  }
  return root;
}
```

```js echo
const breadcrumbWidth = 75;
const breadcrumbHeight = 30;
```

```js echo
// Generate a string that describes the points of a breadcrumb SVG polygon.
function breadcrumbPoints(d, i) {
  const tipWidth = 10;
  const points = [];
  points.push("0,0");
  points.push(`${breadcrumbWidth},0`);
  points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
  points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
  points.push(`0,${breadcrumbHeight}`);
  if (i > 0) {
    // Leftmost breadcrumb; don't include 6th vertex.
    points.push(`${tipWidth},${breadcrumbHeight / 2}`);
  }
  return points.join(" ");
}
```

This notebook reuses much of the `buildHierarchy` function from my original [Sequences sunburst](https://gist.github.com/kerryrodden/7090426) gist, which was published when I worked at Google, with the following [license](https://gist.github.com/kerryrodden/7090426#file-license):

> Copyright 2013 Google Inc. All Rights Reserved.
>
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.
