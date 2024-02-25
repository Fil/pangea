<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Marimekko</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Marimekko

A Marimekko chart, or mosaic plot, visualizes a distribution along two dimensions. Here, sales are broken down by market along the *x*-axis and segment along the *y*-axis. The area of each [rect](https://observablehq.com/plot/marks/rect) encodes the value sold. A custom [transform](https://observablehq.com/plot/features/transforms) is used to apply Plot’s [stack](https://observablehq.com/plot/transforms/stack) transform twice; first along *x* and then along *y*.

```js echo
chart = {
  const xy = (options) => marimekko({...options, x: "market", y: "segment", value: "value"});
  return Plot.plot({
    width: 960,
    height: 640,
    label: null,
    x: {percent: true, ticks: 10, tickFormat: (d) => d === 100 ? `100%` : d},
    y: {percent: true, ticks: 10, tickFormat: (d) => d === 100 ? `100%` : d},
    marks: [
      Plot.frame(),
      Plot.rect(sales, xy({fill: "segment", fillOpacity: 0.5})),
      Plot.text(sales, xy({text: d => [d.value.toLocaleString("en"), d.segment, d.market].join("\n")})),
      Plot.text(sales, Plot.selectMaxX(xy({z: "segment", text: "segment", anchor: "right", textAnchor: "middle", lineAnchor: "bottom", rotate: 90, dx: 6}))),
      Plot.text(sales, Plot.selectMaxY(xy({z: "market", text: "market", anchor: "top", lineAnchor: "bottom", dy: -6})))
    ]
  });
}
```

```js echo
sales = FileAttachment("sales.csv").csv({typed: true})
```

```js echo
function marimekko({
  x,
  y,
  z,
  value = z,
  anchor = "middle",
  inset = 0.5,
  ...options
} = {}) {
  const stackX = /\bleft$/i.test(anchor) ? Plot.stackX1 : /\bright$/i.test(anchor) ? Plot.stackX2 : Plot.stackX;
  const stackY = /^top\b/i.test(anchor) ? Plot.stackY2 : /^bottom\b/i.test(anchor) ? Plot.stackY1 : Plot.stackY;
  const [Xv, setXv] = Plot.column(value);
  const {x: X, x1, x2, transform: tx} = stackX({offset: "expand", y, x: Xv});
  const {y: Y, y1, y2, transform: ty} = stackY({offset: "expand", x, y: value});
  return Plot.transform({x: X, x1, x2, y: Y, y1, y2, z, inset, frameAnchor: anchor, ...options}, (data, facets) => {
    const I = d3.range(data.length);
    const X = Plot.valueof(data, x);
    const Z = Plot.valueof(data, value);
    const sum = d3.rollup(I, I => d3.sum(I, i => Z[i]), i => X[i]);
    setXv(I.map(i => sum.get(X[i])));
    tx(data, facets);
    ty(data, facets);
    return {data, facets};
  });
}
```

---


```js echo
marimekkoXY = (sX, sY, options) => marimekko(options) // deprecated, do not use
```

```js echo
marimekkoMid = marimekko // deprecated, do not use
```

```js echo
marimekkoTopLeft = options => marimekko({...options, anchor: "top-left"}) // deprecated, do not use
```
