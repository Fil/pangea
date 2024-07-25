---
index: true
source: https://observablehq.com/d/64ae824759ebe815
---

# Walmart’s growth - tree

```js
const width = 960;
const height = 600;
const path = d3.geoPath();
const quadtree = d3.quadtree().extent([[0, 0], [width, height]]);

const x = d3.scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .rangeRound([0, 240]);

const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");

const legend = svg.append("g")
    .attr("transform", `translate(0,${height - 30})`)
    .call(d3.axisBottom(x).tickSize(13).ticks(5))
    .call(g => g.selectAll(".tick line").attr("stroke", "#fff"))
    .call(g => g.select(".domain").remove());

legend.insert("image", "*")
    .attr("width", x.range()[1])
    .attr("height", 13)
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", ramp(color).toDataURL());

legend.append("text")
    .attr("class", "caption")
    .attr("y", -6)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Year opened");

svg.append("path")
    .datum(topojson.merge(us, us.objects.lower48.geometries))
    .attr("fill", "#ddd")
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

const lines = svg.append("g")
    .attr("stroke-width", 2)
    .attr("stroke-linecap", "round");

svg.append("circle")
    .attr("cx", data[0][0])
    .attr("cy", data[0][1])
    .attr("r", 3.5);

display(svg.node());
```

```js
(async () => {
for (const d of data) {
  const p = quadtree.find(...d);

  quadtree.add(d);

  if (p) lines.append("line")
      .attr("stroke", color(d.date))
      .attr("x1", p[0])
      .attr("y1", p[1])
      .attr("x2", d[0])
      .attr("y2", d[1]);

  await delay(2);
}
})();
```

Data: [Thomas J. Holmes](http://users.econ.umn.edu/~holmes/data/WalMart/index.html)

This map shows the expansion of Walmart over the last fifty years. The first Walton’s <svg width=8 height=16><circle cx=4 cy=10 r=4></circle></svg> opened on July 2, 1962 in [Rogers, Arkansas](https://en.wikipedia.org/wiki/Rogers,_Arkansas). Each subsequent Walmart is shown connected ${htl.svg`<svg width=16 height=16><line x1=0 y1=10 x2=16 y2=10 stroke="${color(data[0].date)}" stroke-width=1.5></line></svg>`} to its nearest previous Walmart, colored according to the year the new location was opened.

Below is a histogram showing the number of stores opened per year. However, note this dataset only includes about 3,100 openings in the lower 48 United States as of January, 2006; as of 2018, Walmart has more than 11,700 stores in 28 countries.

```js
const histogram = display(Plot.plot({
  height: 240,
  color: {scheme: "spectral"},
  marks: [
    Plot.rectY(data, Plot.binX({
      y: "count",
      fill: "first",
      interval: "year"
    }, {
      x: "date",
      fill: "date"
    }))
  ]
}));
```

```js
const color = d3.scaleSequential(d3.interpolateSpectral).domain([data[0].date, data[data.length - 1].date]);

function ramp(color, n = 512) {
  const context = context2d(n, 1, 1);
  const interpolate = d3.interpolateNumber(...color.domain());
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(interpolate(i / (n - 1)));
    context.fillRect(i, 0, 1, 1);
  }
  return context.canvas;
}
```

```js
const projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
const data = FileAttachment("../data/walmarts.tsv").tsv({typed: true})
  .then((data) => data.map((d) => Object.assign(
    projection([d.longitude, d.latitude]), {date: d.date}
  ))
  .sort((a, b) => a.date - b.date)
);

const us = fetch(import.meta.resolve("npm:us-atlas/counties-albers-10m.json"))
  .then((response) => response.json())
  .then(us => {
    us.objects.lower48 = {
      type: "GeometryCollection",
      geometries: us.objects.states.geometries
        .filter(d => d.id !== "02" && d.id !== "15")
    };
    return us;
  });
```

```js
import {context2d} from "../components/DOM.js";
import {delay} from "../components/Promises.js";
```
