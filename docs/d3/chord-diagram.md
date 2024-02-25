<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Chord diagram</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Chord diagram

The outer arcs in this [chord diagram](https://d3js.org/d3-chord) show the proportion of survey respondents owning a particular brand of phone, while the inner chords show the brand of these individuals’ previous phone. Hence, this chart shows how the consumers shift between brands. Data via [Nadieh Bremer](https://www.visualcinnamon.com/2014/12/using-data-storytelling-with-chord.html).

```js echo
chart = {
  const width = 928;
  const height = width;
  const {names, colors} = data;
  const outerRadius = Math.min(width, height) * 0.5 - 60;
  const innerRadius = outerRadius - 10;
  const tickStep = d3.tickStep(0, d3.sum(data.flat()), 100);
  const formatValue = d3.format(".1~%");

  const chord = d3.chord()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

  const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  const ribbon = d3.ribbon()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);

  const color = d3.scaleOrdinal(names, colors);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  const chords = chord(data);

  const group = svg.append("g")
    .selectAll()
    .data(chords.groups)
    .join("g");

  group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

  group.append("title")
      .text(d => `${names[d.index]}\n${formatValue(d.value)}`);

  const groupTick = group.append("g")
    .selectAll()
    .data(d => groupTicks(d, tickStep))
    .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

  groupTick.append("line")
      .attr("stroke", "currentColor")
      .attr("x2", 6);

  groupTick.append("text")
      .attr("x", 8)
      .attr("dy", "0.35em")
      .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => formatValue(d.value));

  group.select("text")
      .attr("font-weight", "bold")
      .text(function(d) {
        return this.getAttribute("text-anchor") === "end"
            ? `↑ ${names[d.index]}`
            : `${names[d.index]} ↓`;
      });

  svg.append("g")
      .attr("fill-opacity", 0.8)
    .selectAll("path")
    .data(chords)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.source.index]))
      .attr("d", ribbon)
    .append("title")
      .text(d => `${formatValue(d.source.value)} ${names[d.target.index]} → ${names[d.source.index]}${d.source.index === d.target.index ? "" : `\n${formatValue(d.target.value)} ${names[d.source.index]} → ${names[d.target.index]}`}`);

  return svg.node();
}
```

```js echo
function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {value: value, angle: value * k + d.startAngle};
  });
}
```

```js echo
data = Object.assign([
  [.096899, .008859, .000554, .004430, .025471, .024363, .005537, .025471],
  [.001107, .018272, .000000, .004983, .011074, .010520, .002215, .004983],
  [.000554, .002769, .002215, .002215, .003876, .008306, .000554, .003322],
  [.000554, .001107, .000554, .012182, .011628, .006645, .004983, .010520],
  [.002215, .004430, .000000, .002769, .104097, .012182, .004983, .028239],
  [.011628, .026024, .000000, .013843, .087486, .168328, .017165, .055925],
  [.000554, .004983, .000000, .003322, .004430, .008859, .017719, .004430],
  [.002215, .007198, .000000, .003322, .016611, .014950, .001107, .054264]
], {
  names: ["Apple", "HTC", "Huawei", "LG", "Nokia", "Samsung", "Sony", "Other"],
  colors: ["#c4c4c4", "#69b40f", "#ec1d25", "#c8125c", "#008fc8", "#10218b", "#134b24", "#737373"]
})
```
