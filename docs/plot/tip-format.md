---
source: https://observablehq.com/@observablehq/plot-tip-format
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Tip format</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Tip format

The [tip](https://observablehq.com/plot/marks/tip) **format** option controls which channels are displayed and how, and in what order. A channel’s label can be specified alongside its value in the **channels** option as a {value, label} object (_e.g._, country).

```js echo
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {
    name: "name",
    nationality: {
      value: "nationality",
      label: "country"
    },
    sport: "sport"
  },
  tip: {
    format: {
      name: true,
      sport: true,
      nationality: true,
      y: (d) => `${d}m`,
      x: (d) => `${d}kg`,
      stroke: false
    }
  }
}).plot();
```
