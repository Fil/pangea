---
source: https://observablehq.com/@d3/u-s-population-by-state-1790-1990
index: true
---

# U.S. population by State, 1790–1990

As a stacked normalized area chart. Data: [U.S. Census Bureau](https://www.census.gov/population/www/censusdata/pop1790-1990.html)

```js
const id = uid().id;
const marginLeft = 40;
const {color} = chart.scales;

display(html`<style>
    .${id} {
      columns: 140px;
      font: 10px sans-serif;
      padding: 6px 0;
      margin-left: ${marginLeft}px;
    }

    .${id}-item {
      break-inside: avoid;
      display: flex;
      align-items: center;
      padding-bottom: 1px;
    }

    .${id}-swatch {
      width: 20px;
      height: 20px;
      margin: 0 5px 0 0;
    }
  </style>
  <div class="${id}">
    ${color.domain().map(
      (name) => html` <div class="${id}-item">
        <div class="${id}-swatch" style="background:${color(name)};"></div>
        ${document.createTextNode(name)}
      </div>`
    )}
  </div>`);
```

```js echo
// Declare the chart dimensions and margins.
const width = 928;
const height = 720;
const marginTop = 10;
const marginRight = 10;
const marginBottom = 30;
const marginLeft = 40;

// Declare the scales.
const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([marginLeft, width - marginRight]);

const y = d3.scaleLinear()
    .range([height - marginBottom, marginTop]);

const color = d3.scaleOrdinal()
    .domain(regionRank)
    .range(d3.schemeCategory10)
    .unknown("gray");

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Create the areas
const area = d3.area()
    .x(d => x(d.data.date))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));
svg.append("g")
    .attr("fill-opacity", 0.8)
  .selectAll("path")
  .data(series)
  .join("path")
    .attr("fill", ({key}) => color(regionByState.get(key)))
    .attr("d", area)
  .append("title")
    .text(({key}) => key);

// Create the lines.
const midline = d3.line()
    .curve(d3.curveBasis)
    .x(d => x(d.data.date))
    .y(d => y((d[0] + d[1]) / 2));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke-width", 0.75)
  .selectAll("path")
  .data(series)
  .join("path")
    .attr("stroke", ({key}) => d3.lab(color(regionByState.get(key))).darker())
    .attr("d", area.lineY1());

// Append a path for text labels
svg.append("defs")
  .selectAll("path")
  .data(series)
  .join("path")
    .attr("id", d => (d.id = uid("state")).id)
    .attr("d", midline);

// Append the labels.
svg.append("g")
    .style("font", "10px sans-serif")
    .attr("text-anchor", "middle")
  .selectAll("text")
  .data(series)
  .join("text")
    .attr("dy", "0.35em")
  .append("textPath")
    .attr("href", d => d.id.href)
    .attr("startOffset", d => `${Math.max(0.05, Math.min(0.95, d.offset = d3.maxIndex(d, d => d[1] - d[0]) / (d.length - 1))) * 100}%`)
    .text(d => d.key);

// Append the axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(10, "%"))
    .call(g => g.select(".domain").remove());

const chart = display(Object.assign(svg.node(), {scales: {color}}));
```

```js echo
const years = d3.range(1790, 2000, 10);
const states = d3.tsvParse(await FileAttachment("/data/population.tsv").text(), (d, i) => i === 0 ? null : ({name: d[""], values: years.map(y => +d[y].replace(/,/g, "") || 0)}));
states.sort((a, b) => d3.ascending(regionRank.indexOf(regionByState.get(a.name)), regionRank.indexOf(regionByState.get(b.name))) || d3.descending(d3.sum(a.values), d3.sum(b.values)));
const data = Object.assign(years.map((y, i) => Object.fromEntries([["date", new Date(Date.UTC(y, 0, 1))]].concat(states.map(s => [s.name, s.values[i]])))), {columns: ["date", ...states.map(s => s.name)]});
```

```js echo
const series = d3.stack().keys(data.columns.slice(1)).offset(d3.stackOffsetExpand)(data);
```

```js echo
const regionRank = [
  "New England",
  "Middle Atlantic",
  "South Atlantic",
  "East South Central",
  "West South Central",
  "East North Central",
  "West North Central",
  "Mountain",
  "Pacific"
];
```

```js echo
const regions = await d3.csv("https://raw.githubusercontent.com/cphalpert/census-regions/7bdc6aa1cb0892361e90ce9ad54983041c2ad015/us%20census%20bureau%20regions%20and%20divisions.csv");
const regionByState = new Map(regions.map(d => [d.State, d.Division]));
```

```js echo
import {uid} from "/components/DOM.js";
```
