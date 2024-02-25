---
index: false
status: draft
---

```js
md`
# The Wealth & Health of Nations

This is a recreation of a [Gapminder visualization](http://gapminder.org/world/) made famous by [Hans Rosling](https://www.ted.com/talks/hans_rosling_the_best_stats_you_ve_ever_seen). It shows per-capita income (_x_), life expectancy (_y_) and population (_area_) of 180 nations over the last 209 years, colored by region. Data prior to 1950 is sparse, so this chart uses [bisection](https://en.wikipedia.org/wiki/Binary_search_algorithm) and [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) to fill in missing data points.
`;
```

```js
const date = view(Scrubber(dates, {format: (d) => d.getUTCFullYear(), loop: false}));
```

```js
const legend = {
  const id = DOM.uid().id;
  return html`<style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  background: var(--color);
}

</style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${margin.left}px;"><div>${color.domain().map(region => html`<span class="${id}" style="--color: ${color(region)}">${document.createTextNode(region)}</span>`)}`;
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

  svg.append("g")
      .call(grid);

  const circle = svg.append("g")
      .attr("stroke", "black")
    .selectAll("circle")
    .data(dataAt(1800), d => d.name)
    .join("circle")
      .sort((a, b) => d3.descending(a.population, b.population))
      .attr("cx", d => x(d.income))
      .attr("cy", d => y(d.lifeExpectancy))
      .attr("r", d => radius(d.population))
      .attr("fill", d => color(d.region))
      .call(circle => circle.append("title")
        .text(d => [d.name, d.region].join("\n")));

  return Object.assign(svg.node(), {
    update(data) {
      circle.data(data, d => d.name)
          .sort((a, b) => d3.descending(a.population, b.population))
          .attr("cx", d => x(d.income))
          .attr("cy", d => y(d.lifeExpectancy))
          .attr("r", d => radius(d.population));
    }
  });
}
```

```js echo
const update = chart.update(currentData);
```

```js echo
const currentData = dataAt(date);
```

```js echo
const x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right]);
```

```js echo
const y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top]);
```

```js echo
const radius = d3.scaleSqrt([0, 5e8], [0, width / 24]);
```

```js echo
const color = d3
  .scaleOrdinal(
    data.map((d) => d.region),
    d3.schemeCategory10
  )
  .unknown("black");
```

```js echo
const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ","))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Income per capita (dollars) →")
    );
```

```js echo
const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Life expectancy (years)")
    );
```

```js echo
const grid = (g) =>
  g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
        .attr("x1", (d) => 0.5 + x(d))
        .attr("x2", (d) => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
    )
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("y1", (d) => 0.5 + y(d))
        .attr("y2", (d) => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
    );
```

```js echo
function dataAt(date) {
  return data.map((d) => ({
    name: d.name,
    region: d.region,
    income: valueAt(d.income, date),
    population: valueAt(d.population, date),
    lifeExpectancy: valueAt(d.lifeExpectancy, date)
  }));
}
```

```js echo
function valueAt(values, date) {
  const i = bisectDate(values, date, 0, values.length - 1);
  const a = values[i];
  if (i > 0) {
    const b = values[i - 1];
    const t = (date - a[0]) / (b[0] - a[0]);
    return a[1] * (1 - t) + b[1] * t;
  }
  return a[1];
}
```

```js echo
const data = (await FileAttachment("nations.json").json()).map(
  ({name, region, income, population, lifeExpectancy}) => ({
    name,
    region,
    income: parseSeries(income),
    population: parseSeries(population),
    lifeExpectancy: parseSeries(lifeExpectancy)
  })
);
```

```js echo
const interval = d3.utcMonth; // interval between animation frames
```

```js echo
const dates = interval.range(
  d3.min(data, (d) => {
    return d3.min([d.income[0], d.population[0], d.lifeExpectancy[0]], ([date]) => date);
  }),
  d3.min(data, (d) => {
    return d3.max(
      [
        d.income[d.income.length - 1],
        d.population[d.population.length - 1],
        d.lifeExpectancy[d.lifeExpectancy.length - 1]
      ],
      ([date]) => date
    );
  })
);
```

```js echo
function parseSeries(series) {
  return series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);
}
```

```js echo
const bisectDate = d3.bisector(([date]) => date).left;
```

```js echo
const margin = {top: 20, right: 20, bottom: 35, left: 40};
```

```js echo
const height = 560;
```

```js echo
const d3 = require("d3@6.7.0/dist/d3.min.js");
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
