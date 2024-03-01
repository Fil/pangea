---
index: true
author: Jeff Heer
---

# NYC Taxi Rides

## Pickup and dropoff points for 1M NYC taxi rides on Jan 1-3, 2010.

Using a data loader, we ingest a remote file into DuckDB and project [_longitude_, _latitude_] coordinates (in the database!) to spatial positions with units of feet (1 foot = 12 inches).
We then load the prepared data to visualize taxi pickup and dropoff locations, as well as the volume of rides by the time of day.

_Please wait a few seconds for the dataset to load._

${chart}

${chart2}

Select an interval in a plot to filter the maps.
_What spatial patterns can you find?_

```js echo
import {vgplot} from "../components/mosaic.js";
const trips = await FileAttachment("../data/nyc-taxi.parquet").url();
const vg = vgplot((vg) => [vg.loadParquet("trips", trips)]);
```

```js
import {showCode} from "../components/showCode.js";
display(showCode(FileAttachment("../data/nyc-taxi.parquet.sh")));
```

```js echo
const $filter = vg.Selection.crossfilter();
const defaultAttributes = [
  vg.width(335),
  vg.height(550),
  vg.margin(0),
  vg.xAxis(null),
  vg.yAxis(null),
  vg.xDomain([975000, 1005000]),
  vg.yDomain([190000, 240000]),
  vg.colorScale("symlog")
];
```

```js echo
const chart = vg.hconcat(
  vg.plot(
    vg.raster(vg.from("trips", {filterBy: $filter}), {x: "px", y: "py", imageRendering: "pixelated"}),
    vg.intervalXY({as: $filter}),
    vg.text([{label: "Taxi Pickups"}], {
      dx: 10,
      dy: 10,
      text: "label",
      fill: "black",
      fontSize: "1.2em",
      frameAnchor: "top-left"
    }),
    ...defaultAttributes,
    vg.colorScheme("blues")
  ),
  vg.hspace(10),
  vg.plot(
    vg.raster(vg.from("trips", {filterBy: $filter}), {x: "dx", y: "dy", imageRendering: "pixelated"}),
    vg.intervalXY({as: $filter}),
    vg.text([{label: "Taxi Dropoffs"}], {
      dx: 10,
      dy: 10,
      text: "label",
      fill: "black",
      fontSize: "1.2em",
      frameAnchor: "top-left"
    }),
    ...defaultAttributes,
    vg.colorScheme("oranges")
  )
);
```

```js echo
const chart2 = vg.plot(
  vg.rectY(vg.from("trips"), {x: vg.bin("time"), y: vg.count(), fill: "steelblue", inset: 0.5}),
  vg.intervalX({as: $filter}),
  vg.yTickFormat("s"),
  vg.xLabel("Pickup Hour"),
  vg.yLabel("Number of Rides"),
  vg.width(680),
  vg.height(100)
);
```
