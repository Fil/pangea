<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Realtime horizon chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Realtime horizon chart

This [horizon chart](/@d3/horizon-chart/2?intent=fork) shows realtime [random walks](https://en.wikipedia.org/wiki/Random_walk). Only the new values are drawn on each tick, while the old values are shifted to the left.

```js
viewof scheme = Inputs.select(
  new Map([
    ["Blues", d3.schemeBlues],
    ["Greens", d3.schemeGreens],
    ["Greys", d3.schemeGreys],
    ["Oranges", d3.schemeOranges],
    ["Purples", d3.schemePurples],
    ["Reds", d3.schemeReds],
    ["BuGn", d3.schemeBuGn],
    ["BuPu", d3.schemeBuPu],
    ["GnBu", d3.schemeGnBu],
    ["OrRd", d3.schemeOrRd],
    ["PuBu", d3.schemePuBu],
    ["PuBuGn", d3.schemePuBuGn],
    ["PuRd", d3.schemePuRd],
    ["RdPu", d3.schemeRdPu],
    ["YlGn", d3.schemeYlGn],
    ["YlGnBu", d3.schemeYlGnBu],
    ["YlOrBr", d3.schemeYlOrBr],
    ["YlOrRd", d3.schemeYlOrRd]
  ]),
  {label: "Color scheme", value: d3.schemeGreens}
)
```

```js
viewof bands = Inputs.range([1, 9], {value: 7, step: 1, label: "Bands"})
```

```js echo
chart = {

  // Specify the chart’s dimensions.
  const marginTop = 30;
  const marginRight = 10;
  const marginBottom = 0;
  const marginLeft = 10;
  const step = 29;
  const height = data.length * (step + 1) + marginTop + marginBottom;

  // Create the scales.
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().rangeRound([0, -bands * step]);
  const color = i => scheme[Math.max(3, bands)][i + Math.max(0, 3 - bands)];

  // Create the container and append a canvas for each series.
  const div = d3.create("div").style("position", "relative");

  const canvas = div.selectAll("canvas")
    .data(data)
    .enter().append("canvas")
      .attr("width", width)
      .attr("height", step)
      .style("position", "absolute")
      .style("image-rendering", "pixelated")
      .style("top", (d, i) => `${i * (step + 1) + marginTop}px`)
      .property("context", function() { return this.getContext("2d"); })
      .each(horizon);

  // Create a SVG container for the axis and the interaction.
  const svg = div.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "relative")
      .style("font", "10px sans-serif");

  // Create a container for the axis.
  const gX = svg.append("g")
      .attr("transform", `translate(0,${marginTop})`);

  // Create the y axis.
  svg.append("g")
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", 4)
      .attr("y", (d, i) => (i + 0.5) * (step + 1) + marginTop)
      .attr("dy", "0.35em")
      .text((d, i) => i);

  // Create a moving rule that follows the mouse.
  const rule = svg.append("line")
      .attr("stroke", "#000")
      .attr("y1", marginTop - 6)
      .attr("y2", height - marginBottom - 1)
      .attr("x1", 0.5)
      .attr("x2", 0.5);

  svg.on("mousemove touchmove", (event) => {
    const x = d3.pointer(event, svg.node())[0] + 0.5;
    rule.attr("x1", x).attr("x2", x);
  });

  // This function draws each band in turn. There is no need to clip, since we’re working on
  // a canvas.
  function horizon(d) {
    const {context} = this;
    const {length: k} = d;
    if (k < width) context.drawImage(this, k, 0, width - k, step, 0, 0, width - k, step);
    context.fillStyle = "#fff";
    context.fillRect(width - k, 0, k, step);
    for (let i = 0; i < bands; ++i) {
      context.save();
      context.translate(width - k, (i + 1) * step);
      context.fillStyle = color(i);
      for (let j = 0; j < k; ++j) {
        context.fillRect(j, y(d[j]), 1, -y(d[j]));
      }
      context.restore();
    }
  }

  return Object.assign(div.node(), {
    update: (data, {then, period}) => {
      canvas.data(data).each(horizon);
      x.domain([then - period * width, then]);
      gX
       .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0))
       .call(g => g.selectAll(".tick").filter(d => x(d) < marginLeft || x(d) >= width - marginRight).remove())
       .call(g => g.select(".domain").remove());
    }
  });
}
```

```js echo
data = {
  const n = 20, m = 964;
  const data = new Array(n);
  for (let i = 0; i < n; ++i) {
    const d = data[i] = new Float64Array(m);
    for (let j = 0, v = 0; j < m; ++j) {
      d[j] = v = walk(v);
    }
  }
  return data;
}
```

```js echo
update = {
  const period = 250, m = data[0].length;
  const tail = data.map(d => d.subarray(m - 1, m));
  while (true) {
    const then = new Date(Math.ceil((Date.now() + 1) / period) * period);
    yield Promises.when(then, then);
    for (const d of data) d.copyWithin(0, 1, m), d[m - 1] = walk(d[m - 1]);
    chart.update(tail, {then, period});
  }
}
```

```js echo
function walk(v) {
  return Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.05));
}
```
