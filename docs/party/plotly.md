---
index: true
---

# Plotly

```js echo
const container = display(document.createElement("div"));
Plotly.newPlot(container, {
  data: [{y: [1, 2, 5, 0, 8]}],
  layout: {width: 600, height: 400}
});
```

```js echo
import Plotly from "npm:plotly.js-dist-min";
```
