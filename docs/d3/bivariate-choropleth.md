---
source: https://observablehq.com/@d3/bivariate-choropleth
index: true
---

# Bivariate choropleth

Diabetes and obesity prevalence by county, 2020. Colors: [Joshua Stevens](http://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/) Data: [CDC](https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html)

```js
const colors = view(
  Inputs.select(new Map(schemes.map((s) => [s.name, s.colors])), {key: "BuPu", label: "Color scheme"})
);
```

```js echo
const chart = d3
  .create("svg")
  .attr("width", 975)
  .attr("height", 610)
  .attr("viewBox", [0, 0, 975, 610])
  .attr("style", "max-width: 100%; height: auto;");

const x = d3.scaleQuantile(
  Array.from(data, (d) => d.diabetes),
  d3.range(n)
);
const y = d3.scaleQuantile(
  Array.from(data, (d) => d.obesity),
  d3.range(n)
);

const index = d3.index(data, (d) => d.county);

const path = d3.geoPath();

const color = (value) => {
  if (!value) return "#ccc";
  const {diabetes: a, obesity: b} = value;
  return colors[y(b) + x(a) * n];
};

const format = (value) => {
  if (!value) return "N/A";
  const {diabetes: a, obesity: b} = value;
  return `${a}% Diabetes${labels[x(a)] && ` (${labels[x(a)]})`}
  ${b}% Obesity${labels[y(b)] && ` (${labels[y(b)]})`}`;
};

chart
  .append("g")
  .selectAll("path")
  .data(topojson.feature(us, us.objects.counties).features)
  .join("path")
  .attr("fill", (d) => color(index.get(d.id)))
  .attr("d", path)
  .append("title")
  .text(
    (d) => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
${format(index.get(d.id))}`
  );

chart
  .append("path")
  .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
  .attr("fill", "none")
  .attr("stroke", "white")
  .attr("stroke-linejoin", "round")
  .attr("d", path);

chart.append(legend).attr("transform", "translate(870,450)");

display(chart.node());
```

```js echo
function legend() {
  const k = 24;
  const arrow = DOM.uid();
  return svg`<g font-family=sans-serif font-size=10>
  <g transform="translate(-${(k * n) / 2},-${(k * n) / 2}) rotate(-45 ${(k * n) / 2},${(k * n) / 2})">
    <marker id="${arrow.id}" markerHeight=10 markerWidth=10 refX=6 refY=3 orient=auto>
      <path d="M0,0L9,3L0,6Z" fill="currentColor" />
    </marker>
    ${d3.cross(d3.range(n), d3.range(n)).map(
      ([i, j]) => svg`<rect width=${k} height=${k} x=${i * k} y=${(n - 1 - j) * k} fill=${colors[j * n + i]}>
      <title>Diabetes${labels[j] && ` (${labels[j]})`}
Obesity${labels[i] && ` (${labels[i]})`}</title>
    </rect>`
    )}
    <line marker-end="${arrow}" x1=0 x2=${n * k} y1=${n * k} y2=${n * k} stroke=currentColor stroke-width=1.5 />
    <line marker-end="${arrow}" y2=0 y1=${n * k} stroke=currentColor stroke-width=1.5 />
    <text fill="currentColor" font-weight="bold" dy="0.71em" transform="rotate(90) translate(${
      (n / 2) * k
    },6)" text-anchor="middle">Diabetes</text>
    <text fill="currentColor" font-weight="bold" dy="0.71em" transform="translate(${(n / 2) * k},${
    n * k + 6
  })" text-anchor="middle">Obesity</text>
  </g>
</g>`;
}
```

```js echo
const data = FileAttachment("../data/cdc_diabetes_obesity_2020.csv")
  .csv()
  .then((data) => {
    data.forEach((d) => {
      d.obesity = +d.obesity; // type as numeric
      d.diabetes = +d.diabetes;
    });
    return data;
  });
```

```js echo
const schemes = [
  {
    name: "RdBu",
    colors: ["#e8e8e8", "#e4acac", "#c85a5a", "#b0d5df", "#ad9ea5", "#985356", "#64acbe", "#627f8c", "#574249"]
  },
  {
    name: "BuPu",
    colors: ["#e8e8e8", "#ace4e4", "#5ac8c8", "#dfb0d6", "#a5add3", "#5698b9", "#be64ac", "#8c62aa", "#3b4994"]
  },
  {
    name: "GnBu",
    colors: ["#e8e8e8", "#b5c0da", "#6c83b5", "#b8d6be", "#90b2b3", "#567994", "#73ae80", "#5a9178", "#2a5a5b"]
  },
  {
    name: "PuOr",
    colors: ["#e8e8e8", "#e4d9ac", "#c8b35a", "#cbb8d7", "#c8ada0", "#af8e53", "#9972af", "#976b82", "#804d36"]
  }
];
```

```js echo
const labels = ["low", "", "high"];
const n = Math.floor(Math.sqrt(colors.length));
const states = new Map(us.objects.states.geometries.map((d) => [d.id, d.properties]));
```

```js echo
const us = FileAttachment("../data/counties-albers-10m.json").json();
```

```js echo
import * as DOM from "../components/DOM.js";
```

For more details, see our [tutorial on building a bivariate choropleth](https://observablehq.com/@observablehq/plot-bivariate-choropleth) and the [Observable Plot version](../plot/bivariate-choropleth).
