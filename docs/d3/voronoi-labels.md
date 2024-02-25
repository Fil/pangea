---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Voronoi labels</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Voronoi labels

Here a [Voronoi diagram](/@d3/hover-voronoi) is used to label [a scatterplot](/@mbostock/d3-scatterplot): the area of each Voronoi cell determines whether the associated label is visible: larger cells tend to have room to accommodate labels. The vector between the point and the cell’s centroid (orange) determines the label orientation: top, right, bottom or left.

```js echo
const chart = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  const cells = data.map((d, i) => [d, voronoi.cellPolygon(i)]);

  svg.append("g")
      .attr("stroke", "orange")
    .selectAll("path")
    .data(cells)
    .join("path")
      .attr("d", ([d, cell]) => `M${d3.polygonCentroid(cell)}L${d}`);

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", voronoi.render());

  svg.append("path")
      .attr("d", delaunay.renderPoints(null, 2));

  svg.append("g")
      .style("font", "10px sans-serif")
    .selectAll("text")
    .data(cells)
    .join("text")
      .each(function([[x, y], cell]) {
        const [cx, cy] = d3.polygonCentroid(cell);
        const angle = (Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2) + 4) % 4;
        d3.select(this).call(angle === 0 ? orient.right
            : angle === 3 ? orient.top
            : angle === 1 ? orient.bottom
            : orient.left);
      })
      .attr("transform", ([d]) => `translate(${d})`)
      .attr("display", ([, cell]) => -d3.polygonArea(cell) > 2000 ? null : "none")
      .text((d, i) => i);

  return svg.node();
}
```

```js echo
const delaunay = d3.Delaunay.from(data);
```

```js echo
const voronoi = delaunay.voronoi([-1, -1, width + 1, height + 1]);
```

```js echo
const orient = {
  top: (text) => text.attr("text-anchor", "middle").attr("y", -6),
  right: (text) => text.attr("text-anchor", "start").attr("dy", "0.35em").attr("x", 6),
  bottom: (text) => text.attr("text-anchor", "middle").attr("dy", "0.71em").attr("y", 6),
  left: (text) => text.attr("text-anchor", "end").attr("dy", "0.35em").attr("x", -6)
};
```

```js echo
const data = {
  const randomX = d3.randomNormal(width / 2, 80);
  const randomY = d3.randomNormal(height / 2, 80);
  return d3.range(200)
      .map(() => ([randomX(), randomY()]))
      .filter(d => 0 <= d[0] && d[0] <= width && 0 <= d[1] && d[1] <= height);
}
```

```js echo
const width = 928;
```

```js echo
const height = 600;
```

See also the [Observable Plot](/plot/) [version](/@fil/plot-voronoi-labels).
