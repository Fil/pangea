---
index: true
source: https://observablehq.com/@fil/rough-plot
---

# Rough Plot

Applies Fabian Schwarzkopf’s [svg2rough](https://fskpf.github.io/) to [Observable Plot](https://observablehq.com/plot); based on Saneef H. Ansari’s [Hello, svg2rough.js](https://observablehq.com/@saneef/hello-svg2rough-js) demo notebook.

```js echo
rough(Plot.barY([1, 2, 4, 3]).plot())
```

```js
const roughness = view(Inputs.range([0, 10], {
  label: "Roughness",
  step: 1,
  value: 1
}));

const bowing = view(Inputs.range([0, 10], { label: "Bowing", step: 1, value: 1 }));

const pencilFilter = view(Inputs.toggle({ label: "Pencil effect", value: false }));

const fillStyle = view(Inputs.radio(
  [
    "hachure",
    "solid",
    "zigzag",
    "cross-hatch",
    "dots",
    "dashed",
    "zigzag-line"
  ],
  { label: "Fill Style", value: "cross-hatch" }
));

const randomize = view(Inputs.toggle({ label: "Randomize", value: false }));
```

```js echo
const rough = (svg) => {
  const S = Object.assign(
    new svg2rough.Svg2Roughjs(document.createElement("SVG")),
    {
      svg,
      backgroundColor: "white",
      pencilFilter,
      randomize,
      fontFamily: "cursive",
      roughConfig: { bowing, roughness, fillStyle }
    }
  );
  S.sketch();
  return S.outputElement;
}
```

```js echo
import * as svg2rough from "npm:svg2roughjs@3";
```