---
source: https://observablehq.com/@d3/sankey-component
index: true
---

# Sankey diagram

This diagram show how energy is converted or transmitted before being consumed or lost: _supplies_ are on the left, and _demands_ are on the right. Data: [Department of Energy & Climate Change](http://www.decc.gov.uk/en/content/cms/tackling/2050/calculator_on/calculator_on.aspx) via [Tom Counsell](https://tamc.github.io/Sankey/)

```js
const linkColor = view(
  Inputs.select(
    new Map([
      ["static", "#aaa"],
      ["source-target", "source-target"],
      ["source", "source"],
      ["target", "target"]
    ]),
    {
      value: new URLSearchParams(html`<a href></a>`.search).get("color") || "source-target",
      label: "Link color"
    }
  )
);
```

```js
const nodeAlign = view(
  Inputs.select(["left", "right", "center", "justify"], {
    value: "justify",
    label: "Node alignment"
  })
);
```

```js echo
const chart = SankeyChart(
  {links: energy},
  {
    nodeGroup: (d) => d.id.split(/\W/)[0], // take first word for color
    nodeAlign, // e.g., d3.sankeyJustify; set by input above
    linkColor, // e.g., "source" or "target"; set by input above
    format: (
      (f) => (d) =>
        `${f(d)} TWh`
    )(d3.format(",.1~f")),
    width,
    dark,
    height: 600
  }
);

display(chart);
```

```js echo
const energy = FileAttachment("../data/energy.csv").csv({typed: true});
```

```js echo
import {SankeyChart} from "../components/sankey.js";
```
