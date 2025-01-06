---
index: true
---

# MapLibre globe projection

Maplibre-gl [now](https://github.com/maplibre/maplibre-gl-js/releases/tag/v5.0.0) supports the *globe* projection, with a continuous transition to Mercator when you zoom in. Best of both worlds! The documentation has some nice [examples](https://maplibre.org/maplibre-gl-js/docs/examples/globe-atmosphere/).

```js echo
import maplibregl from "npm:maplibre-gl";
const container = display(document.createElement("div"));
container.style = `height: ${width}px;`;
const map = new maplibregl.Map({
  style: "https://tiles.openfreemap.org/styles/liberty",
  zoom: width / 350,
  center: [-60, -10],
  container,
  dragRotate: true,
});
map.on('style.load', () => map.setProjection({type: "globe"}));
```

In the code above we load a classic style (OpenFreeMap’s [liberty](./maplibre-openfreemap)) then upgrade it to the globe projection.
