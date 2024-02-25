<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Spilhaus shoreline map</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Spilhaus shoreline map

Ref. [jasondavies.com/maps/spilhaus](https://jasondavies.com/maps/spilhaus/)

```js echo
map = {
  const width = 928;
  const height = width;

  const context = DOM.context2d(width, height);
  const projection = d3.geoStereographic()
    .rotate([95, 45])
    .translate([width / 2, height / 2])
    .scale(width / 10.1)
    .center([30, -5])
    .clipAngle(166);
  const path = d3.geoPath(projection, context);

  const land = topojson.feature(world, world.objects.land);

  context.lineJoin = "round";
  context.lineCap = "round";
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);

  context.beginPath();
  path({type: "Sphere"});
  path(land);
  context.lineWidth = 0.5;
  context.stroke();
  context.clip("evenodd");

  context.save();
  context.beginPath();
  path(land);
  context.filter = "blur(12px)";
  context.fillStyle = "#aaa";
  context.fill("evenodd");
  context.restore();
  
  context.beginPath();
  path(d3.geoGraticule10());
  context.globalAlpha = 0.2;
  context.strokeStyle = "#000";
  context.stroke();

  return context.canvas;
}
```

```js echo
world = FileAttachment("land-50m.json").json()
```

```js echo
d3 = require("d3-geo@1")
```
