---
source: https://observablehq.com/@observablehq/plot-marimekko
index: true
---

# Marimekko

A Marimekko chart, or mosaic plot, visualizes a distribution along two dimensions. Here, sales are broken down by market along the _x_-axis and segment along the _y_-axis. The area of each [rect](https://observablehq.com/plot/marks/rect) encodes the value sold. A custom [transform](https://observablehq.com/plot/features/transforms) is used to apply Plot’s [stack](https://observablehq.com/plot/transforms/stack) transform twice; first along _x_ and then along _y_.

```js echo
const xy = (options) => Marimekko({...options, x: "market", y: "segment", value: "value"});

const chart = Plot.plot({
  width: 960,
  height: 640,
  label: null,
  x: {percent: true, ticks: 10, tickFormat: (d) => (d === 100 ? `100%` : d)},
  y: {percent: true, ticks: 10, tickFormat: (d) => (d === 100 ? `100%` : d)},
  marks: [
    Plot.frame(),
    Plot.rect(sales, xy({fill: "segment", fillOpacity: 0.5})),
    Plot.text(sales, xy({text: (d) => [d.value.toLocaleString("en"), d.segment, d.market].join("\n")})),
    Plot.text(
      sales,
      Plot.selectMaxX(
        xy({
          z: "segment",
          text: "segment",
          anchor: "right",
          textAnchor: "middle",
          lineAnchor: "bottom",
          rotate: 90,
          dx: 6
        })
      )
    ),
    Plot.text(sales, Plot.selectMaxY(xy({z: "market", text: "market", anchor: "top", lineAnchor: "bottom", dy: -6})))
  ]
});

display(chart);
```

```js echo
const sales = FileAttachment("../data/sales.csv").csv({typed: true});
```

```js echo
import {Marimekko} from "../components/marimekko.js";
```
