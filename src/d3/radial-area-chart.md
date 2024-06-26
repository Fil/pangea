---
source: https://observablehq.com/@d3/radial-area-chart/2
index: true
---

# Radial area chart

This chart shows the daily average temperature range and recorded extremes at San Francisco International Airport from 1999–2018. This form is useful for showing cycles, such as seasonal weather. Data: [National Climatic Data Center](https://www.ncdc.noaa.gov/cdo-web/datatools/findstation)

```js echo
const height = width;
const margin = 10;
const innerRadius = width / 5;
const outerRadius = width / 2 - margin;

const x = d3.scaleUtc()
    .domain([new Date("2000-01-01"), new Date("2001-01-01") - 1])
    .range([0, 2 * Math.PI]);

const y = d3.scaleRadial()
    .domain([d3.min(data, d => d.minmin), d3.max(data, d => d.maxmax)])
    .range([innerRadius, outerRadius]);

const line = d3.lineRadial()
    .curve(d3.curveLinearClosed)
    .angle(d => x(d.date));

const area = d3.areaRadial()
    .curve(d3.curveLinearClosed)
    .angle(d => x(d.date));

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

svg.append("path")
    .attr("fill", "lightsteelblue")
    .attr("fill-opacity", 0.2)
    .attr("d", area
        .innerRadius(d => y(d.minmin))
        .outerRadius(d => y(d.maxmax))
      (data));

svg.append("path")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr("d", area
        .innerRadius(d => y(d.min))
        .outerRadius(d => y(d.max))
      (data));

svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line
        .radius(d => y(d.avg))
      (data));

svg.append("g")
  .selectAll()
  .data(x.ticks())
  .join("g")
    .each((d, i) => d.id = DOM.uid("month"))
    .call(g => g.append("path")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
        .attr("d", d => `
          M${d3.pointRadial(x(d), innerRadius)}
          L${d3.pointRadial(x(d), outerRadius)}
        `))
    .call(g => g.append("path")
        .attr("id", d => d.id.id)
        .datum(d => [d, d3.utcMonth.offset(d, 1)])
        .attr("fill", "none")
        .attr("d", ([a, b]) => `
          M${d3.pointRadial(x(a), innerRadius)}
          A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
        `))
    .call(g => g.append("text")
      .append("textPath")
        .attr("startOffset", 6)
        .attr("xlink:href", d => d.id.href)
        .text(d3.utcFormat("%B")));

svg.append("g")
    .attr("text-anchor", "middle")
  .selectAll()
  .data(y.ticks().reverse())
  .join("g")
    .call(g => g.append("circle")
        .attr("fill", "none")
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.2)
        .attr("r", y))
    .call(g => g.append("text")
        .attr("y", d => -y(d))
        .attr("dy", "0.35em")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .attr("fill", "currentColor")
        .attr("paint-order", "stroke")
        .text((x, i) => `${x.toFixed(0)}${i ? "" : "°F"}`)
      .clone(true)
        .attr("y", d => y(d)));

display(svg.node());
```

```js echo
const data = d3
  .groups(
    await FileAttachment("/data/sfo-temperature.csv").csv({typed: true}),
    ({DATE}) => new Date(Date.UTC(2000, DATE.getUTCMonth(), DATE.getUTCDate())) // group by day of year
  )
  .sort(([a], [b]) => d3.ascending(a, b)) // sort chronologically
  .map(([date, v]) => ({
    date,
    avg: d3.mean(v, (d) => d.TAVG || NaN),
    min: d3.mean(v, (d) => d.TMIN || NaN),
    max: d3.mean(v, (d) => d.TMAX || NaN),
    minmin: d3.min(v, (d) => d.TMIN || NaN),
    maxmax: d3.max(v, (d) => d.TMAX || NaN)
  }));
```


```js echo
import * as DOM from "/components/DOM.js";
```