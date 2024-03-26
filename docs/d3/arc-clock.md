---
source: https://blocks.roadtolarissa.com/mbostock/1098617
index: true
---

# Arc clock

<style>

#clock .label {
  font: 24px sans-serif;
  text-anchor: middle;
  fill: currentColor;
}

#clock path { fill: currentColor; }

#clock .path--background {
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
}

</style>

```js echo
const width = 960;
const height = 500;
const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("id", "clock");
display(svg.node());

const fields = [
  {value: 24, size: 24, label: "h", update: (date) => date.getHours()},
  {value: 60, size: 60, label: "m", update: (date) => date.getMinutes()},
  {value: 60, size: 60, label: "s", update: (date) => date.getSeconds()}
];

const arc = d3.arc()
    .innerRadius(width / 6.5 - 60)
    .outerRadius(width / 6.5 - 5)
    .startAngle(0)
    .endAngle((d) => (d.value / d.size) * 2 * Math.PI);

const field = svg.selectAll(".field")
    .data(fields)
  .enter().append("g")
    .attr("transform", (d, i) => `translate(${(i * 2 + 1.25) / 6.5 * width},${height / 2})`)
    .attr("class", "field");

field.append("path")
    .attr("class", "path path--background")
    .attr("d", arc);

const path = field.append("path")
    .attr("class", "path path--foreground");

const label = field.append("text")
    .attr("class", "label")
    .attr("dy", ".35em");

(function update() {
  const now = new Date();

  field.each((d) => (d.previous = d.value, d.value = d.update(now)));

  path.transition()
      .ease(d3.easeElastic)
      .duration(750)
      .attrTween("d", arcTween);

  label.text((d) => `${d.value}${d.label}`);

  setTimeout(update, 1000 - (now % 1000));
})();

function arcTween(b) {
  const i = d3.interpolate({value: b.previous}, b);
  return (t) => arc(i(t));
}

```