---
index: true
source: https://observablehq.com/@jwilber/roughviz-examples
---

# RoughViz

[RoughViz](https://github.com/jwilber/roughViz) is “a reusable JavaScript library for creating sketchy/hand-drawn styled charts in the browser”. See https://observablehq.com/@jwilber/roughviz-examples for more examples, and [Rough Plot](/plot/rough-plot) to see how to use this style of rendering with Observable Plot.

```js echo
const roughViz = import("npm:rough-viz");
```

```js echo
display(htl.html`<div style='display: flex'>
    <div id="bar-0" style="width: 400px; height: 400px;"></div>
    <div id="bar-1" style="width: 400px; height: 400px;"></div>
  </div>
  <style>text.title {fill: currentColor;}</style>`);

new roughViz.Bar({
  element: "#bar-0",
  data: {
    labels: ["North", "South", "East", "West"],
    values: [10, 5, 8, 3]
  },
  title: "Not rough enough",
  margin: {top: 50, left: 50, right: 50, bottom: 50},
  roughness: 0,
  colors: ["red", "orange", "blue", "skyblue"],
  stroke: "currentColor",
  strokeWidth: 1,
  fillStyle: "cross-hatch",
  fillWeight: 0.5
});

new roughViz.Bar({
  element: "#bar-1",
  data: {
    labels: ["North", "South", "East", "West"],
    values: [10, 5, 8, 3]
  },
  title: "Now we're talking!",
  margin: {top: 50, left: 50, right: 50, bottom: 50},
  roughness: 5,
  colors: ["red", "orange", "blue", "skyblue"],
  stroke: "currentColor",
  strokeWidth: 1,
  fillStyle: "dash",
  fillWeight: 0.85
});
```
