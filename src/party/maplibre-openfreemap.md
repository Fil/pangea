---
index: true
---

# MapLibre-GL & OpenFreeMap

[OpenFreeMap](https://openfreemap.org/) is … Open and Free. “Using our public instance is completely free: there are no limits on the number of map views or requests. There’s no registration, no user database, no API keys, and no cookies. We aim to cover the running costs of our public instance through [donations](https://github.com/sponsors/hyperknot).”

These styles are already available:

```js
const style = view(Inputs.radio(["positron", "bright", "liberty"], {value: "positron"}));
```

It’s super fast — and very quick to set up in Framework. Just paste a few lines of code:

```js echo
import maplibregl from "npm:maplibre-gl";
const container = display(document.createElement("div"));
container.style = "height: 400px;";
new maplibregl.Map({
  style: `https://tiles.openfreemap.org/styles/${style}`,
  center: [-0.114, 51.506],
  zoom: 14.2,
  container
});
```

<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">

```html echo run=false
<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">
```

The _liberty_ style also supports 3D buildings:

```js echo
import maplibregl from "npm:maplibre-gl";
const container = display(document.createElement("div"));
container.style = "height: 400px;";
const map = new maplibregl.Map({
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [-0.114, 51.506],
  zoom: 14.2,
  container,
  bearing: 55.2,
  pitch: 60,
  dragRotate: true
});
```
