---
source: https://observablehq.com/@d3/seamless-zoomable-map-tiles
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Seamless zoomable map tiles</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Seamless zoomable map tiles

This notebook avoids the flickering in [Zoomable map tiles](/@d3/zoomable-map-tiles) by adding [low-resolution](/@d3/tile-zoomdelta) tiles under the main tiles. During zoom, these larger tiles may be visible while the new tiles load in lieu of the white background. This technique also mostly fixes the [subpixel gap issue](/d/32027f96a5d4aa89).

The marginal cost of the low-resolution tiles is negligible for a zoom delta less than -2; for -1 it is about a quarter the cost of 0. The deltas are defined below; -100 forces the use of the _z_=0 “world” tile. Try editing to see the effect of different deltas.

```js
viewof showlayers = {
  const form = html`<form>
  <label><input type=checkbox name=i> Show low-resolution tiles</label>
</form>`;
  form.i.onchange = () => {
    form.value = form.i.checked;
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = form.i.checked;
  return form;
}
```

```js echo
const deltas = [-100, -4, -1, 0];
```

```js echo
const map = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const tile = d3.tile()
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
      .call(zoom.transform, mutable transform);

  function zoomed(transform) {
    mutable transform = transform;

    levels.each(function(delta) {
      const tiles = tile.zoomDelta(delta)(transform);

      d3.select(this)
        .selectAll("image")
        .data(tiles, d => d)
        .join("image")
          .attr("xlink:href", d => url(...d3.tileWrap(d)))
          .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
          .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
          .attr("width", tiles.scale)
          .attr("height", tiles.scale);
    });
  }

  return svg.node();
}
```

```js echo
mutable transform = d3.zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 12)
```

```js echo
// Kartendaten: © [OpenStreetMap](https://openstreetmap.org/copyright)-Mitwirkende, SRTM | Kartendarstellung: © [OpenTopoMap](http://opentopomap.org/) (CC-BY-SA)
url = (x, y, z) => `https://tile.opentopomap.org/${z}/${x}/${y}.png`;
```

```js echo
const d3 = require("d3@7", "d3-tile@1");
```

```js echo
const height = 600; // note: observable sets a responsive *width*
```
