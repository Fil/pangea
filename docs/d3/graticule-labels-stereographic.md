<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Graticule labels (stereographic)</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Graticule labels (stereographic)

```js echo
map = {
  const clipIn = DOM.uid();
  const clipOut = DOM.uid();
  return html`<svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" style="display:block;">
  <defs>
    <clipPath id="${clipIn.id}"><path d="${path(outline)}"></path></clipPath>
    <clipPath id="${clipOut.id}"><path d="M0,0V${height}H${width}V0Z${path(outline)}"></path></clipPath>
  </defs>
  <path d="${path(graticule)}" stroke="#ccc" fill="none"></path>
  <path clip-path="${clipIn}" d="${path(land)}"></path>
  <path fill-opacity="0.1" clip-path="${clipOut}" d="${path(land)}"></path>
  <path d="${path(outline)}" stroke="#000" fill="none"></path>
  <g font-size="10" font-family="sans-serif" text-anchor="middle">
    ${d3.range(-80, 80 + 1, 10).map(y => svg`
    <text transform="translate(${offset(projection([longitude + 90, y]), 10) + ""})" dy="0.35em" x="6">${formatLatitude(y)}</text>
    <text transform="translate(${offset(projection([longitude - 90, y]), 10) + ""})" dy="0.35em" x="-6">${formatLatitude(y)}</text>`)}
  </g>
</svg>`;
}
```

```js echo
formatLatitude = y => `${Math.abs(y)}°${y < 0 ? "S" : "N"}`
```

```js echo
formatLongitude = x => `${Math.abs(x)}°${x < 0 ? "W" : "E"}`
```

```js echo
path = d3.geoPath(projection)
```

```js echo
longitude = -100
```

```js echo
projection = d3.geoStereographic().rotate([-longitude, 0])
```

```js echo
offset = ([x, y], k) => {
  const [cx, cy] = projection.translate();
  const dx = x - cx, dy = y - cy;
  k /= Math.hypot(dx, dy);
  return [x + dx * k, y + dy * k];
}
```

```js echo
marginTop = 30
```

```js echo
marginRight = 40
```

```js echo
marginBottom = 30
```

```js echo
marginLeft = 40
```

```js echo
height = {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dx = x1 - x0;
  const k = (dx - marginLeft - marginRight) / dx;
  const dy = (y1 - y0) * k + marginBottom + marginTop;
  projection.scale(projection.scale() * k);
  projection.translate([(dx + marginLeft - marginRight) / 2, (dy + marginTop - marginBottom) / 2]);
  projection.precision(0.2);
  return Math.round(dy);
}
```

```js echo
outline = d3.geoCircle().radius(90).center([longitude, 0])()
```

```js echo
graticule = d3.geoGraticule10()
```

```js echo
land = topojson.feature(world, world.objects.land)
```

```js echo
world = FileAttachment("land-50m.json").json()
```
