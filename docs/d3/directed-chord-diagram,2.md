---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Directed chord diagram</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Directed chord diagram

This chord diagram, inspired by Bill Marsh’s [overview of the 2011 Euro crisis](http://archive.nytimes.com/www.nytimes.com/interactive/2011/10/23/sunday-review/an-overview-of-the-euro-crisis.html), visualizes debts between countries.

```js echo
const chart = {
  const width = 1080;
  const height = width;
  const innerRadius = Math.min(width, height) * 0.5 - 20;
  const outerRadius = innerRadius + 6;

  // Compute a dense matrix from the weighted links in data.
  const names = Array.from(d3.union(data.flatMap(d => [d.source, d.target])));
  const index = new Map(names.map((name, i) => [name, i]));
  const matrix = Array.from(index, () => new Array(names.length).fill(0));
  for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;

  const chord = d3.chordDirected()
      .padAngle(12 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

  const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  const ribbon = d3.ribbonArrow()
      .radius(innerRadius - 0.5)
      .padAngle(1 / innerRadius);

  const colors = d3.schemeCategory10;

  const formatValue = x => `${x.toFixed(0)}B`;

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  const chords = chord(matrix);

  const textId = DOM.uid("text");

  svg.append("path")
      .attr("id", textId.id)
      .attr("fill", "none")
      .attr("d", d3.arc()({outerRadius, startAngle: 0, endAngle: 2 * Math.PI}));

  svg.append("g")
      .attr("fill-opacity", 0.75)
    .selectAll()
    .data(chords)
    .join("path")
      .attr("d", ribbon)
      .attr("fill", d => colors[d.target.index])
      .style("mix-blend-mode", "multiply")
    .append("title")
      .text(d => `${names[d.source.index]} owes ${names[d.target.index]} ${formatValue(d.source.value)}`);

  const g = svg.append("g")
    .selectAll()
    .data(chords.groups)
    .join("g");

  g.append("path")
      .attr("d", arc)
      .attr("fill", d => colors[d.index])
      .attr("stroke", "#fff");

  g.append("text")
      .attr("dy", -3)
    .append("textPath")
      .attr("xlink:href", textId.href)
      .attr("startOffset", d => d.startAngle * outerRadius)
      .text(d => names[d.index]);

  g.append("title")
      .text(d => `${names[d.index]}
owes ${formatValue(d3.sum(matrix[d.index]))}
is owed ${formatValue(d3.sum(matrix, row => row[d.index]))}`);

  return svg.node();
}
```

```js echo
const data = FileAttachment("debt.csv").csv({typed: true});
```
