<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Scatterplot tour</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Scatterplot tour

This notebook implements an animated tour of a scatterplot using zoom transitions. The tour zooms in on each cluster’s [bounding box](/@d3/zoom-to-bounding-box) in succession before zooming back out to the overview. To improve rendering performance, the circles are drawn as zero-length strokes with round caps.

```js
viewof transform = {
  const form = html`<form style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;">
  ${transforms.map(([name, transform], i) => html`<label style="margin-right: 1em; display: inline-flex; align-items: center;">
    <input type="radio" name="radio" value="${i}" style="margin-right: 0.5em;" ${i === 0 ? "checked" : ""}> ${name}
  </label>`)}
</form>`;
  const timeout = setInterval(() => {
    form.value = transforms[form.radio.value = (+form.radio.value + 1) % transforms.length][1];
    form.dispatchEvent(new CustomEvent("input"));
  }, 2500);
  form.onchange = () => form.dispatchEvent(new CustomEvent("input")); // Safari
  form.oninput = event => { 
    if (event.isTrusted) clearInterval(timeout), form.onchange = null;
    form.value = transforms[form.radio.value][1];
  };
  form.value = transforms[form.radio.value][1];
  invalidation.then(() => clearInterval(timeout));
  return form;
}
```

```js echo
chart = {

  const color = d3.scaleOrdinal()
      .domain(data.map(d => d[2]))
      .range(d3.schemeCategory10);

  const zoom = d3.zoom()
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

  g.selectAll("path")
    .data(data)
    .join("path")
      .attr("d", d => `M${x(d[0])},${y(d[1])}h0`)
      .attr("stroke", d => color(d[2]));

  const gx = svg.append("g")
        .attr("transform", `translate(0,${height})`);
  const xAxis = (g, x) => g
      .call(d3.axisTop(x).ticks(12))
      .call(g => g.select(".domain").attr("display", "none"));

  const gy = svg.append("g");
  const yAxis = (g, y) => g
      .call(d3.axisRight(y).ticks(12 * k))
      .call(g => g.select(".domain").attr("display", "none"));

  svg.call(zoom.transform, viewof transform.value);

  function zoomed({transform}) {
    g.attr("transform", transform).attr("stroke-width", 5 / transform.k);
    gx.call(xAxis, transform.rescaleX(x));
    gy.call(yAxis, transform.rescaleY(y));
  }

  return Object.assign(svg.node(), {
    update(transform) {
      svg.transition()
          .duration(1500)
          .call(zoom.transform, transform);
    }
  });
}
```

```js echo
chart.update(transform)
```

```js echo
data = {
  const random = d3.randomNormal(0, 0.2);
  const sqrt3 = Math.sqrt(3);
  return [].concat(
    Array.from({length: 300}, () => [random() + sqrt3, random() + 1, 0]),
    Array.from({length: 300}, () => [random() - sqrt3, random() + 1, 1]),
    Array.from({length: 300}, () => [random(), random() - 1, 2])
  );
}
```

```js echo
transforms = [["Overview", d3.zoomIdentity]].concat(d3.groups(data, d => d[2]).map(([key, data]) => {
  const [x0, x1] = d3.extent(data, d => d[0]).map(x);
  const [y1, y0] = d3.extent(data, d => d[1]).map(y);
  const k = 0.9 * Math.min(width / (x1 - x0), height / (y1 - y0));
  const tx = (width - k * (x0 + x1)) / 2;
  const ty = (height - k * (y0 + y1)) / 2;
  return [`Cluster ${key}`, d3.zoomIdentity.translate(tx, ty).scale(k)];
}))
```

```js echo
x = d3.scaleLinear()
    .domain([-4.5, 4.5])
    .range([0, width])
```

```js echo
y = d3.scaleLinear()
    .domain([-4.5 * k, 4.5 * k])
    .range([height, 0])
```

```js echo
k = height / width
```

```js echo
height = 600
```
