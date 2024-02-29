---
index: true
---

# Greek youth

A DuckDB data loader.

```js echo
const chart = Plot.plot({
  x: {tickFormat: "", label: null, inset: 10},
  y: {grid: true, label: "Greek youth living with parents (%, ↑more male, ↓more female)"},
  color: {legend: true},
  marks: [Plot.ruleY([0, 100]), Plot.arrow(data, {x: "year", y1: "M", y2: "F", stroke: "age", bend: true})]
});

display(chart);
```

```js
display(showCode(FileAttachment("../data/greek-youth.csv.sh")));
```

```js echo
const data = FileAttachment("../data/greek-youth.csv").csv({typed: true});
```

```js
import {showCode} from "../components/showCode.js";
```

```js
display(Inputs.table(data, {width: 640, format: {year: (d) => `${d}`}}));
```

_Data: [Eurostat](https://ec.europa.eu/eurostat/databrowser/view/ILC_LVPS08__custom_7530569/default/table?lang=en)._
