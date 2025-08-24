---
index: true
source: https://observablehq.com/@fil/linked-ternary-inputs
---

# Linked ternary inputs

```js
const plot = display(Plot.plot({
  width: 350,
  projection: { type: ternary.projection, inset: 25 },
  marks: [
    Plot.sphere(),
    ternary.graticule(),
    ternary.slider({ value: [55, 30, 15] }),
    ternary.labels(["a", "b", "c"])
  ]
}));
const z = Generators.input(plot);
```

```js
display(z);
```

```js
const x = view(Inputs.bind(ternary.combo(), plot))
```

```js
import * as ternary from "/components/ternary.js";
import * as Inputs from "npm:@observablehq/inputs";
```
