---
index: true
source: https://github.com/observablehq/framework/discussions/1394

---

# Vega lite tooltips

```js echo
import * as vega from "npm:vega";
import * as vegaLite from "npm:vega-lite";
import * as vegaLiteApi from "npm:vega-lite-api";
import * as vegaTooltip from "npm:vega-tooltip";
const vl = vegaLiteApi.register(vega, vegaLite, {
  init: (view) => {
    view.tooltip(new vegaTooltip.Handler().call);
    if (view.container()) view.container().style["overflow-x"] = "auto";
  }
});

const df = [
  { city: "Seattle", month: "Apr", precip: 2.68 },
  { city: "Seattle", month: "Aug", precip: 0.87 },
  { city: "New York", month: "Apr", precip: 3.94 },
  { city: "New York", month: "Aug", precip: 4.13 },
  { city: "Chicago", month: "Apr", precip: 3.62 },
  { city: "Chicago", month: "Aug", precip: 3.98 },
];

const weatherChart = vl
  .markCircle()
  .data(df)
  .encode(
    vl.x().fieldN("city"),
    vl.y().fieldQ("precip"),
    vl.color().fieldN("city"),
    vl.tooltip([vl.fieldN("city"), vl.fieldQ("precip")])
  )
  .render();

```

```js echo
weatherChart
```
