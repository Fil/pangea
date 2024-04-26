source: https://observablehq.com/@observablehq/plot-ridgeline
<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Ridgeline Plot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Ridgeline Plot

Ridgeline plots are an alternative to [horizon charts](/@observablehq/plot-horizon) and small-multiple area charts that allow greater precision for a given vertical space at the expense of occlusion (overlapping areas). See also the [D3 version](/@d3/ridgeline-plot). Data: [Christopher Möller](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea).

```js
viewof overlap = Inputs.range([0, 9], {step: 0.1, label: "Overlap"})
```

```js echo
chart = Plot.plot({
  height: 40 + new Set(traffic.map(d => d.name)).size * 17,
  width,
  marginBottom: 1,
  marginLeft: 120,
  x: {axis: "top"},
  y: {axis: null, range: [2.5 * 17 - 2, (2.5 - overlap) * 17 - 2]},
  fy: {label: null, domain: traffic.map(d => d.name)}, // preserve input order
  marks: [
    Plot.areaY(traffic, {x: "date", y: "value", fy: "name", curve: "basis", sort: "date", fill: "#ccc"}),
    Plot.lineY(traffic, {x: "date", y: "value", fy: "name", curve: "basis", sort: "date", strokeWidth: 1})
  ]
})
```

```js echo
traffic = FileAttachment("traffic.csv").csv({typed: true})
```
