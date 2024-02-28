---
status: draft
index: true
---

# Mollweide projection with ticks

Re: [this question](https://talk.observablehq.com/t/using-d3-d3-geo-type-plots-offline-i-e-in-observable-framework/8808/2).

```js
import {geoMollweide} from "https://cdn.skypack.dev/d3-geo-projection@4";
```

```js
const chart = Plot.plot({
  width,
  projection: {
    type: ({width, height}) => geoMollweide().fitSize([width - 10, height], {type: "Sphere"})
  },
  marks: [
    Plot.graticule(),
    Plot.sphere(),
    Plot.text(d3.range(-80, 90, 20), {
      x: 179.9,
      y: Plot.identity,
      text: Plot.identity,
      fill: "currentColor",
      stroke: "var(--plot-background)"
    })
  ]
});

display(chart);
```
