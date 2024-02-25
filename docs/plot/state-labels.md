---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: State labels</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# State labels

Add a label to U.S. states with a [text mark](https://observablehq.com/plot/marks/text) and a [centroid](https://observablehq.com/plot/transforms/centroid) transform.

```js echo
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh),
    Plot.text(
      states,
      Plot.centroid({
        text: (d) => d.properties.name,
        fill: "currentColor",
        stroke: "white"
      })
    )
  ]
});
```

```js echo
const states = topojson.feature(us, us.objects.states).features;
```

```js echo
const statemesh = topojson.mesh(us, us.objects.states);
```

```js echo
const us = FileAttachment("us-counties-10m.json").json();
```
