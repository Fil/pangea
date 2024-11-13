---
index: true
---

# MapLibre-GL

<div id="map" style="width: 100%; height: 450px;"></div>
<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">

```html echo run=false
<div id="map" style="width: 100%; height: 450px;"></div>
```

```html echo run=false
<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">
```

```js echo
import maplibregl from "npm:maplibre-gl";
```

```js echo
const map = new maplibregl.Map({
  container: "map",
  zoom: 12,
  center: [11.39, 47.29],
  pitch: 52,
  hash: true,
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19
      }
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm"
      }
    ]
  },
  maxZoom: 18,
  maxPitch: 85
});

map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: true,
    showCompass: true
  })
);

new maplibregl.Marker()
  .setLngLat([11.39, 47.29])
  .addTo(map);
```
