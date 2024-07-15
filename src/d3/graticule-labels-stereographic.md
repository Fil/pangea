---
source: https://observablehq.com/@d3/graticule-labels-stereographic
index: true
---

# Graticule labels (stereographic)

```js echo
const clipIn = uid();
const clipOut = uid();
display(svg`<svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" style="display:block;">
  <defs>
    <clipPath id="${clipIn.id}"><path d="${path(outline)}"></path></clipPath>
    <clipPath id="${clipOut.id}"><path d="M0,0V${height}H${width}V0Z${path(outline)}"></path></clipPath>
  </defs>
  <path d="${path(graticule)}" stroke="${dark ? "#555" : "#ccc"}" fill="none"></path>
  <path clip-path="${clipIn}" d="${path(land)}" fill="currentColor"></path>
  <path fill-opacity="0.1" clip-path="${clipOut}" d="${path(land)}" fill="currentColor"></path>
  <path d="${path(outline)}" stroke="currentColor" fill="none"></path>
  <g font-size="10" font-family="sans-serif" text-anchor="middle" fill="currentColor">
    ${d3.range(-80, 80 + 1, 10).map(y => svg`
    <text transform="translate(${offset(projection([longitude + 90, y]), 10) + ""})" dy="0.35em" x="6">${formatLatitude(y)}</text>
    <text transform="translate(${offset(projection([longitude - 90, y]), 10) + ""})" dy="0.35em" x="-6">${formatLatitude(y)}</text>`)}
  </g>
</svg>`);
```

```js echo
const longitude = -100;
const projection = d3.geoStereographic().rotate([-longitude, 0]);
const path = d3.geoPath(projection);
const formatLatitude = (y) => `${Math.abs(y)}°${y < 0 ? "S" : "N"}`;
const formatLongitude = (x) => `${Math.abs(x)}°${x < 0 ? "W" : "E"}`;
```

```js echo
const offset = ([x, y], k) => {
  const [cx, cy] = projection.translate();
  const dx = x - cx,
    dy = y - cy;
  k /= Math.hypot(dx, dy);
  return [x + dx * k, y + dy * k];
};
```

```js echo
const marginTop = 30;
const marginRight = 40;
const marginBottom = 30;
const marginLeft = 40;
```

```js echo
const height = (() => {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dx = x1 - x0;
  const k = (dx - marginLeft - marginRight) / dx;
  const dy = (y1 - y0) * k + marginBottom + marginTop;
  projection.scale(projection.scale() * k);
  projection.translate([(dx + marginLeft - marginRight) / 2, (dy + marginTop - marginBottom) / 2]);
  projection.precision(0.2);
  return Math.round(dy);
})();
```

```js echo
const outline = d3.geoCircle().radius(90).center([longitude, 0])();
const graticule = d3.geoGraticule10();
```

```js echo
const source = width < 640
  ? import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json")
  : import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json");
const world = fetch(source).then((d) => d.json());
```

```js echo
const land = topojson.feature(world, world.objects.land);
```

```js echo
import {uid} from "../components/DOM.js";
```
