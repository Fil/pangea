---
source: https://observablehq.com/@mbostock/lunar-visibility
author: Mike Bostock
index: false
draft: true
---

# Lunar visibility

<div class=warning> TODO: This does not work well depending on your time zone and the location’s time zone.</div>

This diagram shows the visibility of the moon from San Francisco in ${start.getFullYear()}, combining the phase of the moon with moonrise, moonset, sunrise and sunset.

```js
const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .style("width", "100%")
  .style("height", "auto")
  .style("color", "#fff")
  .style("background", "#333");

svg
  .append("g")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 3)
  .selectAll("path")
  .data(data)
  .enter()
  .append("path")
  .attr("transform", (d, i) => `translate(0,${y(i)})`)
  .attr("d", (d) => `M${x(d.sunrise - d.day)},0H${x(d.sunset - d.day)}`);

svg
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 2.5)
  .selectAll("path")
  .data(data)
  .enter()
  .append("path")
  .attr("stroke-opacity", (d) => d.moonfraction)
  .attr("transform", (d, i) => `translate(0,${y(i) + 0.25})`)
  .attr("d", (d) => {
    return d.moonstate === 1
      ? `M${x(0)},0H${x(864e5)}`
      : d.moonstate === -1
      ? null
      : d.moonrise <= d.moonset
      ? `M${x(d.moonrise - d.day)},0H${x(d.moonset - d.day)}`
      : d.moonrise == null
      ? `M${x(0)},0H${x(d.moonset - d.day)}`
      : d.moonset == null
      ? `M${x(d.moonrise - d.day)},0H${x(864e5)}`
      : `M${x(0)},0H${x(d.moonset - d.day)}M${x(d.moonrise - d.day)},0H${x(864e5)}`;
  });

svg
  .append("g")
  .attr("stroke", "#000")
  .attr("stroke-opacity", 0.5)
  .attr("transform", "translate(0.5,0)")
  .selectAll("line")
  .data([6, 12, 18].map((h) => h * 36e5))
  .enter()
  .append("line")
  .attr("y1", margin.top - 3)
  .attr("y2", height - margin.bottom + 3)
  .attr("x1", x)
  .attr("x2", x);

svg
  .append("g")
  .attr("transform", `translate(0,${margin.top - 3})`)
  .call(
    d3
      .axisTop(x)
      .tickValues(d3.range(25).map((h) => h * 36e5))
      .tickFormat((d, i) => (i % 3 ? null : d3.timeFormat("%-I %p")(+start + +d)))
  );

svg
  .append("g")
  .attr("transform", `translate(0,${height - margin.bottom + 3})`)
  .call(
    d3
      .axisBottom(x)
      .tickValues(d3.range(25).map((h) => h * 36e5))
      .tickFormat((d, i) => (i % 3 ? null : d3.timeFormat("%-I %p")(+start + +d)))
  );

svg
  .append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(
    d3
      .axisLeft(y)
      .tickSizeOuter(0)
      .tickValues(d3.timeMonth.range(start, end).map((d) => d3.timeDay.count(start, d)))
      .tickFormat((d) => d3.timeFormat("%b")(d3.timeDay.offset(start, d)))
  );

svg
  .append("g")
  .attr("transform", `translate(${width - margin.right},0)`)
  .call(
    d3
      .axisRight(y)
      .tickSizeOuter(0)
      .tickValues(events.map((d) => d3.timeDay.count(start, d.date)))
  )
  .selectAll(".tick text")
  .data(events)
  .text((d) => `${d3.timeFormat("%b %-d")(d.date)} ${d.type === "full" ? "●" : "○"}`)
  .select(function () {
    return this.parentNode.insertBefore(this.cloneNode(), this);
  })
  .attr("dy", "1.5em")
  .style("text-transform", "capitalize")
  .text((d) => `${d3.timeFormat("%-I:%M %p")(d.date)}`);

svg
  .append("text")
  .attr("fill", "#fff")
  .attr("font-size", 10)
  .attr("font-family", "sans-serif")
  .attr("transform", `translate(${width - margin.right},${height - margin.bottom + 43})`)
  .attr("text-anchor", "end")
  .text(`Lunar Visibility for San Francisco in ${start.getFullYear()} — @mbostock`);

display(svg.node());
```

To localize this chart, edit these cells to reflect your longitude and latitude:

```js
const longitude = view(Inputs.number({value: -122.4194, label: "lon"}));
const latitude = view(Inputs.number({value: 37.7749, label: "lat"}));
```

---

## Appendix

```js echo
import suncalc from "npm:suncalc@1";
```

```js echo
const start = d3.timeYear(new Date());
const end = d3.timeYear.offset(start, 1);
const days = d3.timeDay.range(start, end);

const data = days.map((day) => {
  var noon = d3.timeHour.offset(day, 12),
    sun = suncalc.getTimes(noon, latitude, longitude),
    moon = suncalc.getMoonTimes(noon, latitude, longitude);
  return {
    day: day,
    sunrise: sun.sunrise,
    sunset: sun.sunset,
    moonrise: moon.rise,
    moonset: moon.set,
    moonstate: moon.alwaysUp ? 1 : moon.alwaysDown ? -1 : 0,
    moonfraction: suncalc.getMoonIllumination(noon).fraction
  };
});
```

```js echo
function findMinimum(f, x0, x1) {
  (x0 = +x0), (x1 = +x1);
  while (Math.abs(x1 - x0) > 1) {
    var dx = (x1 - x0) / 3;
    if (f(x0 + dx) > f(x1 - dx)) x0 += dx;
    else x1 -= dx;
  }
  return new Date((x0 + x1) / 2);
}
```

```js echo
const events = (() => {
  var events = [],
    d0,
    d1 = d3.timeDay.offset(start, -1),
    d2 = d3.timeDay.offset(start, 0),
    x0,
    x1 = suncalc.getMoonIllumination(d1).fraction,
    x2 = suncalc.getMoonIllumination(d2).fraction;
  for (var i = 0; i < 365; ++i) {
    (d0 = d1), (d1 = d2), (d2 = d3.timeDay.offset(start, i + 1));
    (x0 = x1), (x1 = x2), (x2 = suncalc.getMoonIllumination(d2).fraction);
    if (x1 > x0 && x1 > x2) {
      events.push({date: findMinimum((x) => 1 - suncalc.getMoonIllumination(x).fraction, d0, d2), type: "full"});
    } else if (x1 < x0 && x1 < x2) {
      events.push({date: findMinimum((x) => suncalc.getMoonIllumination(x).fraction, d0, d2), type: "new"});
    }
  }
  return events;
})();
```

```js echo
const margin = {top: 40, right: 70, bottom: 60, left: 50};
const height = 364 * 3 + margin.top + margin.bottom;
const x = d3
  .scaleLinear()
  .domain([0, 864e5])
  .range([margin.left, width - margin.right]);
const y = d3
  .scaleLinear()
  .domain([0, 364])
  .range([margin.top, height - margin.bottom]);
```
