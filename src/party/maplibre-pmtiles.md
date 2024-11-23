---
index: true
---

# MapLibre-GL & PMTiles

<div class="warning">

The world basemap used in this example is a 120GB file exported by [protomaps](https://protomaps.com/) and hosted by [source.coop](https://source.coop/repositories/protomaps/openstreetmap/description), which we hotlink to in this example. For any real world application you should host your own copy. (It’s a unique big file that can be stored for cheap -about 2$ per month— and shared between all your projects.)

</div>

```js echo
const container = display(document.createElement("div"));
container.style = "height: 400px;";
const map = new maplibregl.Map({
  container,
  zoom: 3,
  center: [-100, 38],
  style
});
```

<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">

```html echo run=false
<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">
```

```js echo
import maplibregl from "npm:maplibre-gl";
import layers from "npm:protomaps-themes-base";
import { PMTiles, Protocol } from "npm:pmtiles@3.0.3";
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
```

```js echo
const BASEMAP = "https://data.source.coop/protomaps/openstreetmap/v4.pmtiles";
```

```js echo
const style = {
  version: 8,
  glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
  sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${dark?"dark":"light"}`,
  sources: {
    "protomaps": {
      type: "vector",
      url: `pmtiles://${BASEMAP}`,
      attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }
  },
  layers: layers("protomaps", dark ? "dark" : "light")
}
```
