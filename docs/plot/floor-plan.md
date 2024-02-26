---
source: https://observablehq.com/@observablehq/plot-floor-plan
index: true
---

# Floor plan

The [geo](https://observablehq.com/plot/marks/geo) mark can display large scale maps such as this floor plan of the Westport House in Dundee, Ireland—using the _identity_ [projection](https://observablehq.com/plot/features/projections).

```js echo
const chart = Plot.geo(westport).plot({projection: {type: "identity", domain: westport}});

display(chart);
```

```js echo
const westport = FileAttachment("../data/westport-house.json").json();
```
