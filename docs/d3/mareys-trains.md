---
source: https://observablehq.com/@d3/mareys-trains
index: false
draft: true
---

```js
md`# Marey’s Trains

A recreation of [E.J. Marey](https://en.wikipedia.org/wiki/Étienne-Jules_Marey)’s graphical train schedule. Stations are positioned to scale so that slope encodes speed. This display also reveals when and where <b style="color:${colors.L}">limited service trains</b> are passed by <b style="color:${colors.B}">baby bullets</b>. This type of plot is sometimes called a stringline chart.`;
```

```js
viewof days = {
  const values = {
    weekday: d => /^[NLB]$/.test(d.type),
    saturday: d => /^[WS]$/.test(d.type),
    sunday: d => /^[W]$/.test(d.type)
  };
  const form = html`<form><select name=i>
  <option value="weekday">Weekdays
  <option value="saturday">Saturday
  <option value="sunday">Sunday
</select></form>`;
  form.i.onchange = () => {
    form.value = values[form.i.value];
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = values[form.i.value];
  return form;
}
```

```js
viewof direction = {
  const values = {
    either: () => true,
    north: d => d.direction === "N",
    south: d => d.direction === "S"
  };
  const form = html`<form><select name=i>
  <option value="either">Either direction
  <option value="north">Northbound
  <option value="south">Southbound
</select></form>`;
  form.i.onchange = () => {
    form.value = values[form.i.value];
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = values[form.i.value];
  return form;
}
```

```js echo
const chart = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const train = svg.append("g")
      .attr("stroke-width", 1.5)
    .selectAll("g")
    .data(data)
    .join("g");

  train.append("path")
      .attr("fill", "none")
      .attr("stroke", d => colors[d.type])
      .attr("d", d => line(d.stops));

  train.append("g")
      .attr("stroke", "white")
      .attr("fill", d => colors[d.type])
    .selectAll("circle")
    .data(d => d.stops)
    .join("circle")
      .attr("transform", d => `translate(${x(d.station.distance)},${y(d.time)})`)
      .attr("r", 2.5);

  svg.append("g")
      .call(tooltip);

  return svg.node();
}
```

```js echo
const colors = {
  N: "rgb(34, 34, 34)",
  L: "rgb(183, 116, 9)",
  B: "rgb(192, 62, 29)",
  W: "currentColor",
  S: "currentColor"
};
```

```js echo
const line = d3
  .line()
  .x((d) => x(d.station.distance))
  .y((d) => y(d.time));
```

```js echo
const x = d3
  .scaleLinear()
  .domain(d3.extent(stations, (d) => d.distance))
  .range([margin.left + 10, width - margin.right]);
```

```js echo
const y = d3
  .scaleUtc()
  .domain([parseTime("4:30AM"), parseTime("1:30AM")])
  .range([margin.top, height - margin.bottom]);
```

```js echo
const xAxis = (g) =>
  g
    .style("font", "10px sans-serif")
    .selectAll("g")
    .data(stations)
    .join("g")
    .attr("transform", (d) => `translate(${x(d.distance)},0)`)
    .call((g) =>
      g
        .append("line")
        .attr("y1", margin.top - 6)
        .attr("y2", margin.top)
        .attr("stroke", "currentColor")
    )
    .call((g) =>
      g
        .append("line")
        .attr("y1", height - margin.bottom + 6)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "currentColor")
    )
    .call((g) =>
      g
        .append("line")
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke-opacity", 0.2)
        .attr("stroke-dasharray", "1.5,2")
        .attr("stroke", "currentColor")
    )
    .call((g) =>
      g
        .append("text")
        .attr("transform", `translate(0,${margin.top}) rotate(-90)`)
        .attr("x", 12)
        .attr("dy", "0.35em")
        .text((d) => d.name)
    )
    .call((g) =>
      g
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", `translate(0,${height - margin.top}) rotate(-90)`)
        .attr("x", -12)
        .attr("dy", "0.35em")
        .text((d) => d.name)
    );
```

```js echo
const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(d3.utcHour).tickFormat(d3.utcFormat("%-I %p")))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").clone().lower().attr("stroke-opacity", 0.2).attr("x2", width));
```

```js echo
const tooltip = (g) => {
  const formatTime = d3.utcFormat("%-I:%M %p");

  const tooltip = g.append("g").style("font", "10px sans-serif");

  const path = tooltip.append("path").attr("fill", "white");

  const text = tooltip.append("text");

  const line1 = text.append("tspan").attr("x", 0).attr("y", 0).style("font-weight", "bold");

  const line2 = text.append("tspan").attr("x", 0).attr("y", "1.1em");

  const line3 = text.append("tspan").attr("x", 0).attr("y", "2.2em");

  g.append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .selectAll("path")
    .data(stops)
    .join("path")
    .attr("d", (d, i) => voronoi.renderCell(i))
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("mouseover", (event, d) => {
      tooltip.style("display", null);
      line1.text(`${d.train.number}${d.train.direction}`);
      line2.text(d.stop.station.name);
      line3.text(formatTime(d.stop.time));
      path.attr("stroke", colors[d.train.type]);
      const box = text.node().getBBox();
      path.attr(
        "d",
        `
          M${box.x - 10},${box.y - 10}
          H${box.width / 2 - 5}l5,-5l5,5
          H${box.width + 10}
          v${box.height + 20}
          h-${box.width + 20}
          z
        `
      );
      tooltip.attr("transform", `translate(${x(d.stop.station.distance) - box.width / 2},${y(d.stop.time) + 28})`);
    });
};
```

```js echo
const voronoi = d3.Delaunay.from(
  stops,
  (d) => x(d.stop.station.distance),
  (d) => y(d.stop.time)
).voronoi([0, 0, width, height]);
```

```js echo
const data = alldata.filter((d) => days(d) && direction(d));
```

```js echo
const stations = alldata.stations;
```

```js echo
const stops = d3.merge(data.map((d) => d.stops.map((s) => ({train: d, stop: s}))));
```

```js echo
const alldata = {
  const data = d3.tsvParse(await FileAttachment("schedule.tsv").text());

  // Extract the stations from the "stop|*" columns.
  const stations = data.columns
    .filter(key => /^stop\|/.test(key))
    .map(key => {
      const [, name, distance, zone] = key.split("|");
      return {key, name, distance: +distance, zone: +zone};
    });

  return Object.assign(
    data.map(d => ({
      number: d.number,
      type: d.type,
      direction: d.direction,
      stops: stations
          .map(station => ({station, time: parseTime(d[station.key])}))
          .filter(station => station.time !== null)
    })),
    {stations}
  );
}
```

```js echo
const parseTime = {
  const parseTime = d3.utcParse("%I:%M%p");
  return string => {
    const date = parseTime(string);
    if (date !== null && date.getUTCHours() < 3) date.setUTCDate(date.getUTCDate() + 1);
    return date;
  };
}
```

```js echo
const height = 2400;
```

```js echo
const margin = {top: 120, right: 30, bottom: 120, left: 50};
```
