---
index: true
---

# Walmart’s growth

This animation shows the expansion of Walmart over the last fifty years. On July 2, 1962 in [Rogers, Arkansas](https://en.wikipedia.org/wiki/Rogers,_Arkansas), the first Walton’s <svg width=8 height=16><circle cx=4 cy=10 r=4 fill=blue></circle></svg> opened. [This dataset](http://users.econ.umn.edu/~holmes/data/WalMart/index.html) from 2006 includes about 3,100 Walmart locations <svg width=8 height=16><circle cx=4 cy=10 r=3.5 fill=none stroke=black></circle></svg> in the continguous United States.

```js
const date = view(
  Scrubber(d3.utcWeek.every(2).range(...d3.extent(data, (d) => d.date)), {
    format: d3.utcFormat("%Y %b %-d"),
    loop: false
  })
);
```

```js echo
const chart = (function () {
  const svg = d3.create("svg").attr("viewBox", [0, 0, 960, 600]);

  svg
    .append("path")
    .datum(topojson.merge(us, us.objects.lower48.geometries))
    .attr("fill", "#ddd")
    .attr("d", d3.geoPath());

  svg
    .append("path")
    .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", d3.geoPath());

  const g = svg.append("g").attr("fill", "none").attr("stroke", "black");

  const dot = g
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("transform", (d) => `translate(${d})`);

  svg.append("circle").attr("fill", "blue").attr("transform", `translate(${data[0]})`).attr("r", 3);

  let previousDate = -Infinity;

  return Object.assign(svg.node(), {
    update(date) {
      dot // enter
        .filter((d) => d.date > previousDate && d.date <= date)
        .transition()
        .attr("r", 3);
      dot // exit
        .filter((d) => d.date <= previousDate && d.date > date)
        .transition()
        .attr("r", 0);
      previousDate = date;
    }
  });
})();

display(chart);
```

```js echo
const update = chart.update(date);
```

```js echo
const data = (await FileAttachment("../data/walmarts.tsv").tsv())
  .map((d) => {
    const p = projection([d.longitude, d.latitude]);
    p.date = parseDate(d.date);
    return p;
  })
  .sort((a, b) => a.date - b.date);
```

```js echo
const parseDate = d3.utcParse("%m/%d/%Y");
```

```js echo
const projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
```

```js echo
const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@1/us/10m.json");
us.objects.lower48 = {
  type: "GeometryCollection",
  geometries: us.objects.states.geometries.filter((d) => d.id !== "02" && d.id !== "15")
};
```

```js echo
import {Scrubber} from "../components/scrubber.js";
```
