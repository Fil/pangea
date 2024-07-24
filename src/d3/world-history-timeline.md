---
source: https://observablehq.com/@tezzutezzu/world-history-timeline
index: true
---

# World history timeline

<p class="author">by <a href="https://observablehq.com/@tezzutezzu">Danilo Di Cuia</a></p>

Data adapted from [Essential Humanities](http://www.essential-humanities.net/history-overview/world-history-timeline/)

```js
const sorting = view(Inputs.select(["region", "time"], {label: "Sorted by", value: "time"}));
```

```js
data.forEach((d) => d.color = d3.color(color(d.region)));

const chart = document.createElement("div");
const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
  .style("font", "11px sans-serif");

const g = svg.append("g").attr("transform", (d,i)=>`translate(${margin.left} ${margin.top})`);

const groups = g.selectAll("g")
  .data(data)
  .join("g")
  .attr("class", "civ")

const tooltip = d3.select(document.createElement("div")).call(createTooltip);

const line = svg.append("line")
  .attr("y1", margin.top - 10)
  .attr("y2", height-margin.bottom)
  .attr("stroke", dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")
  .style("pointer-events","none");

groups.attr("transform", (d, i) => `translate(0;${y(i)})`);

groups
  .each(getRect)
  .on("mouseover", function(event, d) {
    d3.select(this).select("rect").attr("fill", d.color.darker())
    tooltip
      .style("opacity", 1)
      .html(getTooltipContent(d))
  })
  .on("mouseleave", function(event, d) {
    d3.select(this).select("rect").attr("fill", d.color)
    tooltip.style("opacity", 0)
  });

svg
  .append("g")
  .attr("transform", (d,i)=>`translate(${margin.left},${margin.top-10})`)
  .call(axisTop)

svg
  .append("g")
  .attr("transform", (d,i)=>`translate(${margin.left},${height-margin.bottom})`)
  .call(axisBottom)

svg.on("mousemove", function(event, d) {
  let [x,y] = d3.pointer(event, svg.node());
  line.attr("transform", `translate(${x} 0)`);
  y += 20;
  if (x > width / 2) x -= 100;
  tooltip
    .style("left", x + "px")
    .style("top", y + "px")
})

chart.style= "position: relative;";
chart.append(svg.node(), tooltip.node());
chart.groups = groups;

chart.update = ((data) => {
  const civs = d3.selectAll(".civ")
  civs.data(data, (d) => d.civilization)
    .transition()
    .ease(d3.easeCubic)
    .attr("transform", (d,i) => `translate(0 ${y(i)})`)
})

display(chart);
```

```js
chart.update(sorting === "time"
  ? data.sort((a,b)=>  a.start-b.start)
  : [].concat.apply([], [...dataByRegion.values()]));
```

```js
const getTooltipContent = function (d) {
  return `<b>${d.civilization}</b>
<br/>
<b style="color:${d.color.darker()}">${d.region}</b>
<br/>
${formatDate(d.start)} - ${formatDate(d.end)}
`;
};
```

```js
const height = 1000;
```

```js
const y = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, height - margin.bottom - margin.top])
  .padding(0.2);
```

```js
const x = d3
  .scaleLinear()
  .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
  .range([0, width - margin.left - margin.right]);
```

```js
const margin = {top: 30, right: 30, bottom: 30, left: 30};
```

```js
const createTooltip = function (el) {
  el.style("position", "absolute")
    .style("pointer-events", "none")
    .style("top", 0)
    .style("opacity", 0)
    .style("color", "black")
    .style("background", "white")
    .style("border-radius", "5px")
    .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
    .style("padding", "10px")
    .style("line-height", "1.3")
    .style("font", "11px sans-serif");
};
```

```js
const getRect = function (d) {
  const el = d3.select(this);
  const sx = x(d.start);
  const w = x(d.end) - x(d.start);
  const isLabelRight = sx > width / 2 ? sx + w < width : sx - w > 0;

  el.style("cursor", "pointer");

  el.append("rect").attr("x", sx).attr("height", y.bandwidth()).attr("width", w).attr("fill", d.color);

  el.append("text")
    .text(d.civilization)
    .attr("x", isLabelRight ? sx - 5 : sx + w + 5)
    .attr("y", 2.5)
    .attr("fill", "currentColor")
    .style("text-anchor", isLabelRight ? "end" : "start")
    .style("dominant-baseline", "hanging");
};
```

```js
const dataByTimeline = d3.group(data, (d) => d.timeline);
```

```js
const dataByRegion = d3.group(data, (d) => d.region);
```

```js
const axisBottom = d3.axisBottom(x).tickPadding(2).tickFormat(formatDate);
```

```js
const axisTop = d3.axisTop(x).tickPadding(2).tickFormat(formatDate);
```

```js
const formatDate = (d) => (d < 0 ? `${-d}BC` : `${d}AD`);
```

```js
const data = FileAttachment("/data/civilizations.csv").csv({typed: true})
  .then((data) => data.sort((a, b) => a.start - b.start));
```

```js
const regions = [...d3.group(data, (d) => d.region).keys()];
```

```js
const timelines = [...dataByTimeline.keys()];
```

```js
const color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);
```
