---
source: https://observablehq.com/@mbostock/electric-usage-2019
index: true
---

# Electricity Usage, 2019

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

During sunny days in the summer, my home’s solar cells typically produce more energy than we consume. However, at night, on cloudy days, and during the winter when the sun is lower in the sky, we pull energy from PG&E’s grid.

We also have an electric car and a fast charger that can draw 10 kW! The frequent 4-6 hour evening spikes in energy consumption show the car charging. You can also see our electric furnace warming up the house on cold February mornings. And you can see our four-day power outage in October. 😣

You can visualize your own data from PG&E, too! Follow the instructions below.

```js
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .append(() => Legend(color, {
      title: "Net power consumption (kW)",
      tickFormat: "+d"
    }));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.date.getHours()))
      .attr("y", d => y(d3.timeDay(d.date)))
      .attr("width", x.bandwidth() - 1)
      .attr("height", y.bandwidth() - 1)
      .attr("fill", d => color(d.usage))
    .append("title")
      .text(d => `${formatDate(d.date)}
${formatUsage(d.usage)} kW`);

display(svg.node());
```

To incorporate your own data into this chart:

1. Go to your [PG&E account](https://pge.com)
2. Under _Your Account_, click _Your Energy Use_
3. Under _Understand your energy use_, click _View Your Energy Use_
4. Scroll down and click the _Green Button_ (Download my data)
5. Select _Export usage for a range of days_ and _CSV_ format
6. Expand the downloaded ZIP file
7. Open the CSV file in a text editor
8. _Delete the first five lines_ including your account numbers ⚠️
9. Save the file
10. _Rename the file_ to remove your account number ⚠️
11. Hover the _data_ cell below
12. Click the <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke-width="2"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg> file icon
13. Click _Replace_ and select your file

```js echo
const parseDate = d3.timeParse("%Y-%m-%dT%H:%M");
const parseData = (d) => ({
  date: parseDate(`${d["DATE"]}T${d["START TIME"]}`),
  usage: +d["USAGE"]
});
const data = d3.csvParse(await FileAttachment("/data/pge-electric-data.csv").text(), parseData);
```

```js echo
const dateExtent = d3.extent(data, (d) => d.date);
```

```js echo
const x = d3.scaleBand(d3.range(24), [margin.left, width - margin.right]).round(true);
const y = d3.scaleBand(d3.timeDays(...dateExtent), [margin.top, height - margin.bottom]).round(true);

let [min, max] = d3.extent(data, d => d.usage);
let color;
if (min < 0) {
  max = Math.max(-min, max);
  color = d3.scaleDiverging([-max, 0, max], t => d3.interpolateRdBu(1 - t));
} else {
  color = d3.scaleSequential([0, max], d3.interpolateReds);
}
```

```js echo
const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).tickFormat(formatHour))
    .call((g) => g.select(".domain").remove());
```

```js echo
const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(formatDay))
    .call((g) => g.select(".domain").remove());
```

```js echo
const formatUsage = d3.format(".2f");
```

```js echo
const formatDate = d3.timeFormat("%B %-d, %-I %p");
```

```js echo
const formatMonth = d3.timeFormat("%b %-d");
const formatD = d3.timeFormat("%-d");
const formatDay = (d) => (d.getDate() === 1 ? formatMonth : formatD)(d);
const formatHour = (d) => d === 0 ? "12 AM" : d === 12 ? "12 PM" : (d % 12) + "";
```

```js echo
const width = 954;
```

```js echo
const height = margin.top + margin.bottom + (d3.timeDay.count(...dateExtent) + 1) * 10;
```

```js echo
const margin = {top: 70, right: 0, bottom: 0, left: 40};
```

```js echo
import {Legend} from "/components/color-legend.js";
```
