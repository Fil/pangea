<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Clipped map tiles</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Clipped map tiles

This map clips Mapbox Natural Earth II tiles to the contiguous United States. To avoid aliasing artifacts (thin white lines) between tiles, two layers of tiles are drawn, with the lower layer’s tiles enlarged by one pixel.

```js echo
map = svg`<svg viewBox="0 0 ${width} ${height}">
  <defs>
    <path id="land" d="${path(land)}"/>
    <clipPath id="clip"><use xlink:href="${location}#land" /></clipPath>
  </defs>
  <g clip-path="url(${location}#clip)">
    ${tile().map(([x, y, z], i, {translate: [tx, ty], scale: k}) => svg`<image xlink:href="${url(x, y, z)}" x="${(x + tx) * k - 0.5}" y="${(y + ty) * k - 0.5}" width="${k + 1}" height="${k + 1}">`)}
    ${tile().map(([x, y, z], i, {translate: [tx, ty], scale: k}) => svg`<image xlink:href="${url(x, y, z)}" x="${(x + tx) * k}" y="${(y + ty) * k}" width="${k}" height="${k}">`)}
  </g>
  <use xlink:href="${location}#land" fill="none" stroke="black" stroke-width="0.5" />
</svg>`
```

```js echo
url = (x, y, z) => `https://${"abc"[Math.abs(x + y) % 3]}.tiles.mapbox.com/v4/mapbox.natural-earth-2/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}.png?access_token=pk.eyJ1IjoibWJvc3RvY2siLCJhIjoiY2s5ZWRlbTM4MDE0eDNocWJ2aXR2amNmeiJ9.LEyjnNDr_BrxRmI4UDyJAQ`
```

```js echo
projection = d3.geoMercator()
```

```js echo
path = d3.geoPath(projection)
```

```js echo
tile = d3.tile()
    .size([width, height])
    .scale(projection.scale() * 2 * Math.PI)
    .translate(projection([0, 0]))
```

```js echo
width = 928
```

```js echo
height = {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, land)).bounds(land);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
```

```js echo
land = FileAttachment("us.json").json()
  .then(topology => topojson.feature(topology, topology.objects.land))
  .then(land => ({type: "Polygon", coordinates: land.geometry.coordinates[0]}))
```

```js echo
d3 = require("d3-geo@3", "d3-tile@1")
```
