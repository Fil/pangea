---
index: true
---

# Plotly 3D elevation map

Reference: https://plotly.com/javascript/

```js echo
const container = display(document.createElement("div"));
Plotly.newPlot(container, [{z: elevation, type: "surface"}], {
  title: "Mt Bruno Elevation",
  width,
  height: Math.min(800, width)
});
```

```js echo
const elevation = FileAttachment("/data/mt_bruno.csv").csv({array: true, typed: true});
```

```js echo
import Plotly from "npm:plotly.js-dist-min";
```
