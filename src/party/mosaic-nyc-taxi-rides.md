---
index: true
author: Jeff Heer
keywords: mosaic
---

# NYC Taxi Rides

## Pickup and dropoff points for 1M NYC taxi rides on Jan 1-3, 2010.

[Mosaic](https://uwdata.github.io/mosaic/) is a system for linking data visualizations, tables, and input widgets, all leveraging a database (DuckDB) for scalable processing. With Mosaic, you can interactively visualize and explore millions —and even billions— of data points.

This example uses a data loader that ingests a remote file with taxi pickup and dropoff locations into DuckDB and projects point coordinates (_longitude_, _latitude_) to meters with the [EPSG:32118](https://epsg.io/32118) projection.

For more Mosaic examples, see the [Mosaic + Framework](https://uwdata.github.io/mosaic-framework-example/) website.

<em id="loading">Please wait a few seconds for the dataset to load.</em>

${maps}

${histogram}

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
  vg.xDomain([297000, 297000 + 28.36 * 335]),
  vg.yDomain([57900, 57900 + 28.36 * 550]), // ensure aspect ratio of 1
  vg.colorScale("symlog")
];
document.querySelector("#loading")?.remove();
```

```js echo
const maps = vg.hconcat(
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
const histogram = vg.plot(
  vg.rectY(vg.from("trips"), {x: vg.bin("time"), y: vg.count(), fill: "steelblue", inset: 0.5}),
  vg.intervalX({as: $filter}),
  vg.yTickFormat("s"),
  vg.xLabel("Pickup Hour"),
  vg.yLabel("Number of Rides"),
  vg.width(680),
  vg.height(100)
);
```
