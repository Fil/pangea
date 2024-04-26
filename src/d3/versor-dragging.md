---
source: https://observablehq.com/@d3/versor-dragging
index: true
---

# Versor dragging

See also Jason Davies’ [Rotate the World](https://www.jasondavies.com/maps/rotate/).

```js
const projection = d3.geoOrthographic().precision(0.1);
```

```js echo
import {context2d} from "../components/DOM.js";
const context = context2d(width, height);

const path = d3.geoPath(projection, context);

function render(land) {
  context.clearRect(0, 0, width, height);
  context.beginPath(), path(sphere), (context.fillStyle = "#fff"), context.fill();
  context.beginPath(), path(land), (context.fillStyle = "#000"), context.fill();
  context.beginPath(), path(sphere), context.stroke();
}

display(
  d3
    .select(context.canvas)
    .call(
      drag(projection)
        .on("drag.render", () => render(land110))
        .on("end.render", () => render(land50))
    )
    .call(() => render(land50))
    .node()
);
```

```js echo
let height;
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
  const dy = Math.ceil(y1 - y0),
    l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
  height = dy;
}
```

```js echo
const sphere = {type: "Sphere"};
```

```js echo
const land50 = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/50m.json"))
  .then((d) => d.json())
  .then((world) => topojson.feature(world, world.objects.land));
```

```js echo
const land110 = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json"))
  .then((d) => d.json())
  .then((world) => topojson.feature(world, world.objects.land));
```

```js echo
import {drag} from "../components/versor-dragging.js";
```

---

_Note:_ to understand the code it might be easier to start with this [earlier version](https://observablehq.com/d/569d101dd5bd332b) that did not have to account for multitouch.
