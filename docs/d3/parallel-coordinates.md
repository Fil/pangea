<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Parallel coordinates</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Parallel coordinates

Compare with the [brushable version](/@d3/brushable-parallel-coordinates).

```js
viewof keyz = {
  const form = html`<form>${Object.assign(html`<select name=select>${keys.map(key => Object.assign(html`<option>`, {value: key, textContent: key}))}</select>`, {value: "weight (lb)"})} <i style="font-size:smaller;">color encoding</i>`;
  form.select.onchange = () => (form.value = form.select.value, form.dispatchEvent(new CustomEvent("input")));
  form.select.onchange();
  return form;
}
```

```js
legend = Legend({color: chart.scales.color, title: keyz})
```

```js echo
chart = {

  // Specify the chart’s dimensions.
  const width = 928;
  const height = keys.length * 120;
  const marginTop = 20;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 10;

  // Create an horizontal (*x*) scale for each key.
  const x = new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(data, d => d[key]), [marginLeft, width - marginRight])]));

  // Create the vertical (*y*) scale.
  const y = d3.scalePoint(keys, [marginTop, height - marginBottom]);

  // Create the color scale.
  const color = d3.scaleSequential(x.get(keyz).domain(), t => d3.interpolateBrBG(1 - t));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  // Append the lines.
  const line = d3.line()
    .defined(([, value]) => value != null)
    .x(([key, value]) => x.get(key)(value))
    .y(([key]) => y(key));

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
    .selectAll("path")
    .data(data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz])))
    .join("path")
      .attr("stroke", d => color(d[keyz]))
      .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
    .append("title")
      .text(d => d.name);

  // Append the axis for each key.
  svg.append("g")
    .selectAll("g")
    .data(keys)
    .join("g")
      .attr("transform", d => `translate(0,${y(d)})`)
      .each(function(d) { d3.select(this).call(d3.axisBottom(x.get(d))); })
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", -6)
        .attr("text-anchor", "start")
        .attr("fill", "currentColor")
        .text(d => d))
      .call(g => g.selectAll("text")
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke-width", 5)
        .attr("stroke-linejoin", "round")
        .attr("stroke", "white"));

  return Object.assign(svg.node(), {scales: {color}});
}
```

```js echo
data = FileAttachment("cars.csv").csv({typed: true})
```

```js echo
keys = data.columns.slice(1)
```

```js echo
import {legend as Legend} from "@d3/color-legend"
```

For an alternative using [Observable Plot](/plot/)’s concise API, see [Plot: Parallel coordinates](https://observablehq.com/@observablehq/plot-parcoords).
