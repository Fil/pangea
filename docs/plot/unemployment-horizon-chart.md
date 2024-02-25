<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Unemployment horizon chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Unemployment horizon chart

By layering colored [bands](https://observablehq.com/plot/marks/area), the horizon chart makes the most of a limited vertical space. For another example, see [Horizon chart](https://observablehq.com/@observablehq/plot-horizon).

```js echo
Plot.plot({
  height: 720,
  axis: null,
  y: {domain: [0, step]},
  color: {scheme: "YlGnBu"},
  facet: {data: industries, y: "industry"},
  marks: [
    d3.range(bands).map((i) => Plot.areaY(industries, {x: "date", y: (d) => d.unemployed - i * step, fill: i, clip: true})),
    Plot.text(industries, Plot.selectFirst({text: "industry", frameAnchor: "top-left", dx: 6, dy: 6})),
    Plot.frame()
  ]
})
```

```js echo
bands = 7
```

```js echo
step = d3.max(industries, (d) => d.unemployed) / bands
```
