---
index: true
source:
author: Mike Bostock
---

# Himawari 8

The Japanese weather satellite [Himawari-8](https://himawari8.nict.go.jp/) monitors the Asia-Pacific region from a geostationary orbit (alt. 35,793km over the Earth radius of 6,371km). We can adjust the [satellite projection](https://github.com/d3/d3-geo-projection?tab=readme-ov-file#geoSatellite) to match its “full disk imagery” like so:

```js
image
```

<div>${html`<style>${dark
  ? `:root {--theme-background: black;}`
  : `div:has(>canvas) {background: black;}`
}</style>`}</div>

```js
const date = view(Inputs.date({value: Date.now()}));
const hour = view(Inputs.range([0, 23], {value: 1, step: 1, label: "hour"}));
```

```js echo
import {geoSatellite} from "npm:d3-geo-projection@4";
const projection = geoSatellite()
    .rotate([-140.7, 0])
    .distance((35793 + 6371) / 6371)
    .clipAngle(Math.acos(6371 / (35793 + 6371)) * 180 / Math.PI)
    .precision(0.2)
    .fitSize([width, width], {type: "Sphere"});
```

---

The following code loads the land shape and draws the map:

```js echo
const land = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json"))
  .then((response) => response.json())
  .then((world) => topojson.mesh(world, world.objects.land));
```

```js echo
import {context2d} from "/components/DOM.js";
const context = context2d(width, width);
const path = d3.geoPath(projection, context);
context.beginPath(), path(d3.geoGraticule10()), context.strokeStyle = "#fff", context.stroke();
context.beginPath(), path({type: "Sphere"}), context.strokeStyle = "#fff", context.stroke();
context.beginPath(), path(land), context.strokeStyle = "#ff0", context.stroke();
const image = context.canvas;
```

Finally, the background image reflects the values of the date and hour inputs (if you want more details, note that imagery is available every 10 minutes):

```js echo
const url = `https://himawari8.nict.go.jp/img/D531106/1d/550/${
  d3.utcFormat("%Y/%m/%d")(date) // "2024/06/23"
}/${
  hour.toLocaleString(undefined, {minimumIntegerDigits: 2} // "01"
)}0000_0_0.png`;
image.style.background = `url(${url}) no-repeat center/100%`;
```
