---
source: https://observablehq.com/@d3/horizon-chart-ii
index: true
---

# Diverging horizon chart

This [horizon chart](./horizon-chart) represents negative values in purples and positive values in greens, and shows the price of several stocks relative to May 2013. Compare to a [line chart](./line-chart) and an [area chart](./area-chart).

Data: [Yahoo Finance](https://finance.yahoo.com/lookup)

```js
const scheme = view(html`<select>
<option value="schemeBrBG">BrBG</option>
<option value="schemePRGn">PRGn</option>
<option value="schemePiYG" selected>PiYG</option>
<option value="schemePuOr">PuOr</option>
<option value="schemeRdBu">RdBu</option>
<option value="schemeRdGy">RdGy</option>
<option value="schemeRdYlBu">RdYlBu</option>
<option value="schemeRdYlGn">RdYlGn</option>
<option value="schemeSpectral">Spectral</option>
</select>`);
```

```js
const label = html`<label style="user-select:none;font:10px sans-serif;"><input type=checkbox> Mirror negative values`;
label.value = label.control.checked;
label.onclick = event => {
  label.value = label.control.checked;
  label.dispatchEvent(new CustomEvent("input"));
};
const mirror = view(label);
```

```js
const form = html`<form>
<input name=i type=range min=1 max=5 value=5 step=1 style="width:180px;">
<output style="font-size:smaller;font-style:oblique;" name=o></output>
</form>`;
form.i.oninput = () => form.o.value = `${form.value = form.i.valueAsNumber} band${form.i.valueAsNumber === 1 ? "" : "s"}`;
form.i.oninput();

const overlap = view(form);
```

```js echo
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

const g = svg.append("g")
  .selectAll("g")
  .data(data)
  .enter().append("g")
    .attr("transform", (d, i) => `translate(0,${i * (step + 1) + margin.top})`);

g.append("clipPath")
    .attr("id", d => (d.clip = DOM.uid("clip")).id)
  .append("rect")
    .attr("width", width)
    .attr("height", step);

g.append("defs").append("path")
    .attr("id", d => (d.path = DOM.uid("path")).id)
    .attr("d", d => area(d.values));

g.append("g")
    .attr("clip-path", d => d.clip)
  .selectAll("use")
  .data(d => Array.from(
    {length: overlap * 2}, 
    (_, i) => Object.assign({index: i < overlap ? -i - 1 : i - overlap}, d)
  ))
  .enter().append("use")
    .attr("fill", d => color(d.index))
    .attr("transform", d => mirror && d.index < 0
        ? `scale(1,-1) translate(0,${d.index * step})`
        : `translate(0,${(d.index + 1) * step})`)
    .attr("xlink:href", d => d.path.href);

g.append("text")
    .attr("x", 4)
    .attr("y", step / 2)
    .attr("dy", "0.35em")
    .text(d => d.key);

svg.append("g")
    .call(xAxis);

  display(svg.node());
```

```js echo
const height = data.length * (step + 1) + margin.top + margin.bottom;
```

```js echo
const margin = ({top: 30, right: 10, bottom: 0, left: 10});
```

```js echo
const step = 59;
```

```js echo
const color = i => d3[scheme][overlap * 2 + 1][i + (i >= 0) + overlap];
```

```js echo
const x = d3.scaleUtc()
    .domain([data[0].values[0].date, data[0].values[data[0].values.length - 1].date])
    .range([0, width]);
```

```js echo
const max = d3.max(data, d => d3.max(d.values, d => Math.abs(d.value)));
const y = d3.scaleLinear()
    .domain([-max, +max])
    .range([overlap * step, -overlap * step]);
```

```js echo
const xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0))
    .call(g => g.selectAll(".tick").filter(d => x(d) < margin.left || x(d) >= width - margin.right).remove())
    .call(g => g.select(".domain").remove());
```

```js echo
const area = d3.area()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y0(0)
    .y1(d => y(d.value));
```

```js echo
const data = Promise.all([FileAttachment("../data/aapl.csv"), FileAttachment("../data/amzn.csv"), FileAttachment("../data/goog.csv"), FileAttachment("../data/ibm.csv"), FileAttachment("../data/msft.csv")].map(async file => {
  const values = d3.csvParse(await file.text(), d => {
    const date = parseDate(d["Date"]);
    return {date, value: +d["Close"]};
  });
  const v = values[0].value;
  return {
    key: file.name.slice(0, -4),
    values: values.map(({date, value}) => ({date, value: Math.log(value / v)}))
  };
}));
```

```js echo
const parseDate = d3.utcParse("%Y-%m-%d");
```

```js echo
import * as DOM from "../components/DOM.js"
```