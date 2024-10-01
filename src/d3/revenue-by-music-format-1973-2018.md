---
source: https://observablehq.com/@d3/revenue-by-music-format-1973-2018
index: true
---

# Revenue by music format, 1973–2018

Data: [RIAA](https://www.riaa.com/u-s-sales-database/)

```js
Swatches(chart.scales.color, {
  columns: "130px 4",
  marginLeft: 10
})
```

```js echo
const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 30;

// Create scales.
const x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .rangeRound([marginLeft, width - marginRight]);

const y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
    .range([height - marginBottom, marginTop]);

const color = d3.scaleOrdinal()
    .domain(colors.keys())
    .range(colors.values());

// Create the SVG container.
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

// Create the bars.
const formatRevenue = x => (+(x / 1e3).toFixed(2) >= 1)
  ? `${(x / 1e3).toFixed(2)}B`
  : `${(x / 1).toFixed(0)}M`;

svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
    .attr("fill", ({key}) => color(key))
    .call(g => g.selectAll("rect")
      .data(d => d)
      .join("rect")
        .attr("x", d => x(d.data.year))
        .attr("y", d => y(d[1]))
        .attr("width", x.bandwidth() - 1)
        .attr("height", d => y(d[0]) - y(d[1]))
      .append("title")
        .text(d => `${d.data.format}, ${d.data.year.getUTCFullYear()}
${formatRevenue(d.data.revenue)}`));

// Create axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.utcTicks(...d3.extent(x.domain()), width / 80))
        .tickFormat(d3.utcFormat("%Y"))
        .tickSizeOuter(0));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y)
        .tickFormat(x => (x / 1e3).toFixed(0)))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Revenue (billions, adj.)"));

const chart = display(Object.assign(svg.node(), {scales: {color}}));
```

```js echo
const data = FileAttachment("/data/riaa-us-revenue.csv").csv({typed: true});
```

```js echo
const colors = new Map([
  ["LP/EP", "#2A5784"],
  ["Vinyl Single", "#43719F"],
  ["8 - Track", "#5B8DB8"],
  ["Cassette", "#7AAAD0"],
  ["Cassette Single", "#9BC7E4"],
  ["Other Tapes", "#BADDF1"],
  ["Kiosk", "#E1575A"],
  ["CD", "#EE7423"],
  ["CD Single", "#F59D3D"],
  ["SACD", "#FFC686"],
  ["DVD Audio", "#9D7760"],
  ["Music Video (Physical)", "#F1CF63"],
  ["Download Album", "#7C4D79"],
  ["Download Single", "#9B6A97"],
  ["Ringtones & Ringbacks", "#BE89AC"],
  ["Download Music Video", "#D5A5C4"],
  ["Other Digital", "#EFC9E6"],
  ["Synchronization", "#BBB1AC"],
  ["Paid Subscription", "#24693D"],
  ["On-Demand Streaming (Ad-Supported)", "#398949"],
  ["Other Ad-Supported Streaming", "#61AA57"],
  ["SoundExchange Distributions", "#7DC470"],
  ["Limited Tier Paid Subscription", "#B4E0A7"]
]);
```

```js echo
const series = d3
  .stack()
  .keys(colors.keys())
  .value((group, key) => group.get(key).revenue)
  .order(d3.stackOrderReverse)(
    d3
      .rollup(
        data,
        ([d]) => d,
        (d) => d.year,
        (d) => d.format
      )
      .values()
  )
  .map((s) => (s.forEach((d) => (d.data = d.data.get(s.key))), s));
```

```js echo
import {Swatches} from "/components/color-legend.js";
```

For a similar chart using [Observable Plot](https://observablehq.com/plot/)’s concise API, see [this notebook](https://observablehq.com/@observablehq/plot-stacking-order), that emphasizes the various ways data can be stacked.
