---
source: https://observablehq.com/@d3/web-mercator-tiles
author: Mike Bostock
index: true
---

# Web Mercator tiles

<p class=author>by <a href="https://observablehq.com/@mbostock">Mike Bostock</a></p>

You can use [d3.tile](https://github.com/d3/d3-tile) and [d3.geoMercator](https://d3js.org/d3-geo/cylindrical#geoMercator) together to project GeoJSON features on top of standard web Mercator tiles, such as those by Mapbox. The main challenge is that d3.tile uses planar coordinates (pixels) whereas d3.geoMercator uses spherical coordinates (longitude and latitude).

To draw a map, we need to know how big to make it. For a geographic projection, this is controlled by [_projection_.scale](https://d3js.org/d3-geo/projection#projection_scale): the bigger the scale, the bigger the map. The meaning of the scale value varies by projection, but for d3.geoMercator, the scale is equal to the projected size of the Earth divided by ${tex`2\pi`}.

We also need to specify where the map is geographically centered, and where to draw it on-screen. This requires a respective [_projection_.center](https://d3js.org/d3-geo/projection#projection_center) in geographic coordinates and a [_projection_.translate](https://d3js.org/d3-geo/projection#projection_translate) in pixels. The geographic coordinates of the projection’s center will appear at the projection’s translate. (This assumes that the projection isn’t rotated—a topic for another notebook!)

To draw a 512×512px world map in the Mercator projection, then, we specify: a geographic center of 0°N 0°E, where the prime meridian and the equator intersect (and the default value); a translate of [256, 256], the center of our canvas; and a scale of ${tex`\tfrac{512}{2 \pi}`}.

```js echo
const projection1 = d3
  .geoMercator()
  .center([0, 0])
  .translate([256, 256])
  .scale(512 / (2 * Math.PI));
```

```js echo
svg`<svg width="512" height="512">
  <path fill="currentColor" d="${d3.geoPath(projection1)(land)}" />
</svg>`
```

As functions:

```js echo
const mercatorSize = (scale) => scale * (2 * Math.PI);
```

```js echo
const mercatorScale = (size) => size / (2 * Math.PI);
```

To see how this projection translates into tiles, we need to consider how map tiles are structured. Each tile has integer coordinates [*x*, *y*, *z*] where _z_ is a zoom level, _x_ is a horizontal position (corresponding to longitude for web Mercator tiles) and _y_ is a vertical position (likewise latitude).

The [0, 0, 0] tile shows the entire world, or at least the part covered by tiles.

```js
html`<img src="${url(0, 0, 0)}" width="256" height="256" />`
```

The four [*x*, *y*, 1] tiles split the [0, 0, 0] tile into equal quadrants, which if arranged correctly will result in a world map that doubles in size, covering 512×512px.

```js
html`
<div style="position: relative; width: 512px; height: 512px;">
  <img src="${url(0, 0, 1)}" style="position: absolute; top: 0px; left: 0px;" width="256" height="256" />
  <img src="${url(1, 0, 1)}" style="position: absolute; top: 0px; left: 256px;" width="256" height="256" />
  <img src="${url(0, 1, 1)}" style="position: absolute; top: 256px; left: 0px;" width="256" height="256" />
  <img src="${url(1, 1, 1)}" style="position: absolute; top: 256px; left: 256px;" width="256" height="256" />
</div>
`
```

Already we can make the simple case of a 512×512px world map align.

```js
html`
<div style="position: relative; width: 512px; height: 512px;">
  <img src="${url(0, 0, 1)}" style="position: absolute; top: 0px; left: 0px;" width="256" height="256" />
  <img src="${url(1, 0, 1)}" style="position: absolute; top: 0px; left: 256px;" width="256" height="256" />
  <img src="${url(0, 1, 1)}" style="position: absolute; top: 256px; left: 0px;" width="256" height="256" />
  <img src="${url(1, 1, 1)}" style="position: absolute; top: 256px; left: 256px;" width="256" height="256" />
  <svg width="512" height="512" style="position: relative;">
    <path fill="none" stroke="red" d="${d3.geoPath(projection1)(land)}" />
  </svg>
</div>
`
```

More generally, of course, there’s more math required to determine which tiles should be displayed, and where, for a particular map. And that’s where [d3.tile](https://github.com/d3/d3-tile) comes in! Its API is similar to D3 geographic projections, given [_tile_.translate](https://github.com/d3/d3-tile/blob/master/README.md#tile_translate) and [_tile_.scale](https://github.com/d3/d3-tile/blob/master/README.md#tile_scale)… but different.

A tile layout’s translate is the projected coordinates of the center of the “world” tile [0.5, 0.5, 0] (or equivalently [1, 1, 1]); for web Mercator tiles, this is 0°N 0°E. A tile layout’s scale is the size of the world at the current zoom level. Lastly the tile layout’s extent specifies the viewport: the top-left and bottom-right corners of the canvas.

So to repeat our simple example of a 512×512px world map:

```js echo
const tile1 = Tile()
  .translate([256, 256])
  .scale(512)
  .extent([
    [0, 0],
    [512, 512]
  ]);
```

The returned tile layout is a function that returns an array of tile coordinates [*x*, *y*, *z*] which you can inspect below. Here, the coordinates correspond to the four _z_ = 1 tiles shown above.

```js echo
tile1();
```

Now let’s look at a more real-world example. Given a GeoJSON feature collection of the streets of Detroit, we can create a Mercator projection that fits Detroit to the desired canvas using [_projection_.fitSize](https://d3js.org/d3-geo/projection#projection_fitSize), and a corresponding tile layout.

```js echo
detroit
```

```js echo
const projection = d3.geoMercator().fitSize([width, height], detroit);
```

```js echo
const path = d3.geoPath(projection);
```

```js echo
const tile = Tile()
  .size([width, height])
  .scale(projection.scale() * 2 * Math.PI)
  .translate(projection([0, 0]));
```

<svg viewBox="0 0 ${width} ${height}">
  ${tile().map(
    ([x, y, z], i, {translate: [tx, ty], scale: k}) => svg`
    <image xlink:href="${url(x, y, z)}" x="${(x + tx) * k}" y="${(y + ty) * k}" width="${k}" height="${k}">
  `
  )}
  <path fill="none" stroke="red" d="${path(detroit)}"/>
</svg>

For crisp tiles, clamp the _projection_.scale to an exact power of two as shown in [Raster & Vector II](https://observablehq.com/@d3/raster-vector-ii). See also [Raster & Vector](splom.md/raster-vector) for how to computes the map’s aspect ratio to fit the displayed features automatically.

Thanks for reading! 🙏

---

## Appendix

```js echo
const height = Math.min(width, 720);
```

```js echo
const url = (x, y, z) =>
  `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/${z}/${x}/${y}${
    devicePixelRatio > 1 ? "@2x" : ""
  }?access_token=${ACCESS_TOKEN}`;
```

```js echo
const land = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json"))
  .then((d) => d.json())
  .then((topology) => topojson.feature(topology, topology.objects.land));
```

```js echo
const detroit = FileAttachment("/data/detroit.json")
  .json()
  .then((topology) => topojson.feature(topology, topology.objects.detroit));
```

```js echo
import {tile as Tile} from "npm:d3-tile@1";
```

```js
// registered for @fil
const ACCESS_TOKEN = "pk.eyJ1IjoiZmlsIiwiYSI6ImNscnV0ZWMzdzA2c2wybm14NGdhbDBqeXkifQ.he-qZ179Xez4BkAMk6vRfA";
```
