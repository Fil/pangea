---
source: https://observablehq.com/@d3/seamless-zoomable-map-tiles
index: true
---

# Seamless zoomable map tiles

This notebook avoids the flickering in [Zoomable map tiles](https://observablehq.com/@d3/zoomable-map-tiles) by adding [low-resolution](/@d3/tile-zoomdelta) tiles under the main tiles. During zoom, these larger tiles may be visible while the new tiles load in lieu of the white background. This technique also mostly fixes the [subpixel gap issue](https://observablehq.com/d/32027f96a5d4aa89).

The marginal cost of the low-resolution tiles is negligible for a zoom delta less than -2; for -1 it is about a quarter the cost of 0. The deltas are defined below; -100 forces the use of the _z_=0 “world” tile.

```js
const showlayers = view(Inputs.toggle({label: "Show low-resolution tiles"}));
```

```js echo
const deltas = [-100, -4, -1, 0];

const transform = d3.zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 12)

const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

const tile = Tile()
    .extent([[0, 0], [width, height]])
    .tileSize(512)
    .clampX(false);

const zoom = d3.zoom()
    .scaleExtent([1 << 8, 1 << 22])
    .extent([[0, 0], [width, height]])
    .on("zoom", (event) => zoomed(event.transform));

const levels = svg.append("g")
    .attr("pointer-events", "none")
  .selectAll("g")
  .data(deltas)
  .join("g")
    .style("opacity", showlayers ? 0.3 : null);

svg
    .call(zoom)
    .call(zoom.transform, transform);

function zoomed(transform) {
  levels.each(function(delta) {
    const tiles = tile.zoomDelta(delta)(transform);

    d3.select(this)
      .selectAll("image")
      .data(tiles, d => d)
      .join("image")
        .attr("xlink:href", d => url(...tileWrap(d)))
        .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
        .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
        .attr("width", tiles.scale)
        .attr("height", tiles.scale);
  });
}

display(svg.node());

```

```js echo
// Kartendaten: © [OpenStreetMap](https://openstreetmap.org/copyright)-Mitwirkende, SRTM | Kartendarstellung: © [OpenTopoMap](http://opentopomap.org/) (CC-BY-SA)
const url = (x, y, z) => `https://tile.opentopomap.org/${z}/${x}/${y}.png`;
```

```js echo
import {tile as Tile, tileWrap} from "npm:d3-tile@1";
```

```js echo
const height = 600; // note: observable sets a responsive *width*
```
