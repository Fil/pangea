---
source: https://observablehq.com/@observablehq/plot-floor-plan
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Floor plan</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Floor plan

The [geo](https://observablehq.com/plot/marks/geo) mark can display large scale maps such as this floor plan of the Westport House in Dundee, Ireland—using the _identity_ [projection](https://observablehq.com/plot/features/projections).

```js echo
Plot.geo(westport).plot({projection: {type: "identity", domain: westport}});
```

```js echo
const westport = FileAttachment("westport-house.json").json();
```
