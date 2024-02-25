---
source: https://observablehq.com/@observablehq/plot-tips-additional-channels
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Interactive tips with additional channels</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Interactive tips with additional channels

If no **title** channel is supplied, the [tip mark](https://observablehq.com/plot/marks/tip) displays all channel values. You can supply additional name-value pairs by registering extra channels using the **channels** mark option.

```js echo
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot();
```

<blockquote style="font-family: sans-serif; font-size: smaller;">The tallest athlete in this dataset, swimmer **Kevin Cordes**, is likely an error: his official height is 1.96m (6′ 5″) not 2.21m (7′ 3″). Basketball player **Li Muhao** is likely the true tallest. — _Can you spot them?_
