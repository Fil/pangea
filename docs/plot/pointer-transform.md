---
source: https://observablehq.com/@observablehq/plot-pointer-transform
index: true
---

# Pointer transform

The [pointer transform](https://observablehq.com/plot/interactions/pointer) is not limited to the [tip mark](https://observablehq.com/plot/marks/tip). Below, it is used to filter a filled <span style="border-bottom: solid 2px red;">red</span> dot behind a stroked <span style="border-bottom: solid 2px currentColor;">${dark ? "white" : "black"}</span> dot. As you hover the chart, only the closest red dot to the pointer is rendered. If you remove the pointer transform by toggling the checkbox, all the red dots will be visible.

```js
const pointered = view(Inputs.toggle({label: "Use pointer", value: true}));
```

```js echo
const chart = Plot.plot({
  marks: [
    Plot.dot(
      penguins,
      pointered
        ? Plot.pointer({
            x: "culmen_length_mm",
            y: "culmen_depth_mm",
            fill: "red",
            r: 8
          })
        : {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "red", r: 8}
    ),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
});

display(chart);
```

```js echo
const penguins = FileAttachment("../data/penguins.csv").csv({typed: true});
```

```js echo
import {dark} from "../components/dark.js";
```
