---
index: true
---

# DeckGL, H3 and MapLibre

```js echo
const layer = new H3HexagonLayer({
  id: 'H3HexagonLayer',
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
  elevationScale: 10,
  extruded: true,
  filled: true,
  getElevation: d => d.count,
  getFillColor: d => [255, (1 - d.count / 500) * 255, 0],
  getHexagon: d => d.hex,
  wireframe: false,
  pickable: true,
});

const container = display(document.createElement("div"));
container.style = "width: 900px; height: 500px;";
const h3Instance = new DeckGL({
  container,
  mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  initialViewState: {
    longitude: -122.4,
    latitude: 37.74,
    zoom: 10
  },
  controller: true,
  getTooltip: ({object}) => object && `${object.hex} count: ${object.count}`,
  layers: [layer]
});


// clean up if this code re-runs
invalidation.then(() => {
  h3Instance.finalize();
  container.innerHTML = "";
});
```

---

Note: due to the way DeckDL looks for H3 and MapLibre in the global `window`, we import them separately from their local copies, then add them manually to window, and only load `deck.gl` in a dependent cell.

```js echo
import * as h3 from "npm:h3-js";
import maplibregl from "npm:maplibre-gl";
Object.assign(window, {h3, maplibregl});
```

```js echo
h3; maplibregl;
import deckgl from "npm:deck.gl";
const {Deck, DeckGL, H3HexagonLayer, HexagonLayer} = deckgl;
```

And don’t forget the maplibre css:

<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">

```html echo run=false
<link rel="stylesheet" href="npm:maplibre-gl/dist/maplibre-gl.css">
```
