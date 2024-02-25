---
source: https://observablehq.com/@d3/solar-path
index: false
draft: true
---

# Solar path

This chart shows how the Sun’s path varies throughout the year for the given location. The outer black circle represents the horizon; outside this circle, the Sun is below the horizon. The radiating lines represent [azimuth](https://en.wikipedia.org/wiki/Horizontal_coordinate_system); for example, 0° azimuth means that the Sun is due North.

```js
viewof location = {
  const form = html`<form style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;">
  <button name=b type=button style="margin-right: 0.4em; width: 5em;">Locate!</button>
  <output name=o></output>
</form>`;
  const formatLocation = ([x, y]) => [
    `${Math.abs(y).toFixed(4)}°${y > 0 ? "N" : "S"}`,
    `${Math.abs(x).toFixed(4)}°${x > 0 ? "E" : "W"}`
  ].join(", ");
  form.b.onclick = async event => {
    form.value = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords: {longitude, latitude}}) => resolve([longitude, latitude]),
        reject
      );
      form.o.value = "Locating…";
    });
    form.o.value = formatLocation(form.value);
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = Object.assign([-122.4194, 37.7749], {timeZone: "America/Los_Angeles"});
  form.o.value = formatLocation(form.value);
  return form;
}
```

```js
viewof date = Scrubber(d3.utcDays(new Date(Date.UTC(2019, 0, 1)), new Date(Date.UTC(2020, 0, 1))), {
  format: date => date.toLocaleString("en", {month: "long", day: "numeric", timeZone: "UTC"})
})
```

```js
const chart = {
  const width = 960 + 28;
  const height = width;
  const cx = width / 2;
  const cy = height / 2;
  const formatHour = d => d.toLocaleString("en", {hour: "numeric", timeZone: location.timeZone});
  const formatMonth = d => d.toLocaleString("en", {month: "long", timeZone: location.timeZone});
  const outline = d3.geoCircle().radius(90).center([0, 90])();
  const graticule = d3.geoGraticule().stepMinor([15, 10])();

  const projection = d3.geoStereographic()
      .reflectY(true)
      .scale((width - 120) * 0.5)
      .clipExtent([[0, 0], [width, height]])
      .rotate([0, -90])
      .translate([width / 2, height / 2])
      .precision(0.1);

  const path = d3.geoPath(projection);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "display: block; margin: 0 -14px; width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor");

  svg.append("path")
      .attr("d", path(graticule))
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.2);

  svg.append("path")
      .attr("d", path(outline))
      .attr("fill", "none")
      .attr("stroke", "currentColor");

  svg.append("g")
      .attr("stroke", "currentColor")
    .selectAll()
    .data(d3.range(360))
    .join("line")
      .datum(d => [
        projection([d, 0]),
        projection([d, d % 10 ? -1 : -2])
      ])
      .attr("x1", ([[x1]]) => x1)
      .attr("x2", ([, [x2]]) => x2)
      .attr("y1", ([[, y1]]) => y1)
      .attr("y2", ([, [, y2]]) => y2);

  svg.append("g")
    .selectAll()
    .data(d3.range(0, 360, 10))
    .join("text")
      .attr("dy", "0.35em")
      .text(d => d === 0 ? "N" : d === 90 ? "E" : d === 180 ? "S" : d === 270 ? "W" : `${d}°`)
      .attr("font-size", d => d % 90 ? null : 14)
      .attr("font-weight", d => d % 90 ? null : "bold")
      .datum(d => projection([d, -4]))
      .attr("x", ([x]) => x)
      .attr("y", ([, y]) => y);

  svg.append("g")
    .selectAll()
    .data(d3.range(10, 91, 10)) // every 10°
    .join("text")
      .attr("dy", "0.35em")
      .text(d => `${d}°`)
      .datum(d => projection([180, d]))
      .attr("x", ([x]) => x)
      .attr("y", ([, y]) => y);

  const sunPath = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2);

  const hour = svg.append("g")
    .selectAll()
    .data(d3.range(24))
    .join("g");

  hour.append("circle")
      .attr("fill", "black")
      .attr("r", 2);

  hour.append("text")
      .attr("dy", "-0.4em")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .attr("fill", "none")
    .clone(true)
      .attr("stroke", null)
      .attr("fill", "black");

  function update(date) {
    const start = d3.utcHour.offset(solar.noon(date), -12);
    const end = d3.utcHour.offset(start, 24);
    sunPath.attr("d", path({type: "LineString", coordinates: d3.utcMinutes(start, end).map(solar.position)}));
    hour.data(d3.utcHours(start, end));
    hour.attr("transform", d => `translate(${projection(solar.position(d))})`);
    hour.select("text:first-of-type").text(formatHour);
    hour.select("text:last-of-type").text(formatHour);
  }

  return Object.assign(svg.node(), {update});
}
```

```js echo
const update = chart.update(date);
```

```js echo
const solar = (await require("solar-calculator@0.2"))(location);
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
