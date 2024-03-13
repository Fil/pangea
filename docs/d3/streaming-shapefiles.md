---
index: true
---

# Streaming shapefiles

See [@d3/streaming-shapefiles](https://observablehq.com/@d3/streaming-shapefiles).

This is a 13.6MB shapefile! If your browser supports streaming fetch, it will be displayed progressively as it downloads.

```js echo
const canvas = display(document.createElement("canvas"));
const width = canvas.parentElement.getBoundingClientRect().width;
canvas.setAttribute("style", `max-width: 100%`);
const scale = width / 954;
const height = Math.ceil(600 * scale);
canvas.setAttribute("width", width << 1);
canvas.setAttribute("height", height << 1);
const context = canvas.getContext("2d");
context.scale(2 * scale, 2 * scale);
context.clearRect(0, 0, width, height);
context.strokeStyle = dark ? "#ccc" : "#333";

const projection = d3
  .geoAlbersUsa()
  .scale(1272)
  .translate([width / scale / 2, height / scale / 2]);

const path = d3.geoPath(projection, context);

const source = await shapefile.open(await FileAttachment("../data/us-counties.shp").stream(), null);
while (true) {
  const result = await source.read();
  if (result.done) break;
  context.beginPath(), path(result.value), context.stroke();
}
```

```js echo
import * as d3 from "npm:d3-geo@1";
import * as shapefile from "npm:shapefile@0.6";
```
