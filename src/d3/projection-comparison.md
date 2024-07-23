---
source: https://observablehq.com/@d3/projection-comparison
index: true
---

# Projection comparison

Choose two projections below to compare.

```js
const redName = view(Inputs.select(projections.map(d => d.name), {
  label: "red",
  value: new URLSearchParams(location.search).get("red") || "American polyconic"
}));
```

```js
const blueName = view(Inputs.select(projections.map(d => d.name), {
  label: "blue",
  value: new URLSearchParams(location.search).get("blue") || "rectangular polyconic"
}));
```

```js
const outline = ({type: "Sphere"});
const graticule = d3.geoGraticule10();
const land = topojson.feature(world, world.objects.land);

const red = projections.find(({name}) => name === redName).value();
const blue = projections.find(({name}) => name === blueName).value();

const width = 928;
const heightRed = fitWidth(red);
const heightBlue = fitWidth(blue);
const height = Math.max(heightRed, heightBlue);

const context = context2d(width, height);

function render(projection, color) {
  const path = d3.geoPath(projection, context);
  context.fillStyle = context.strokeStyle = color;
  context.save();
  context.beginPath(), path(outline), context.clip();
  context.beginPath(), path(graticule), context.globalAlpha = 0.3, context.stroke();
  context.beginPath(), path(land), context.globalAlpha = 1.0, context.fill();
  context.restore();
  context.beginPath(), path(outline), context.stroke();
}

context.fillStyle = dark ? "#000" : "#fff";
context.fillRect(0, 0, width, height);

context.save();
context.translate(0, (height - heightRed) / 2);
render(red, "#f40");
context.restore();

context.save();
context.globalCompositeOperation = dark ? "lighter" : "multiply";
context.translate(0, (height - heightBlue) / 2);
render(blue, "#0af");
context.restore();

display(context.canvas);

function fitWidth(projection) {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
```

---

Here is a list of (almost) all the available projections in [d3-geo](https://d3js.org/d3-geo) (`d3`) and [d3-geo-projection](https://github.com/d3/d3-geo-projection) (`d3P`); for more, see also [d3-geo-polygon](https://github.com/d3/d3-geo-polygon).

```js echo
const projections = [
  {name: "Airy’s minimum error", value: d3P.geoAiry},
  {name: "Aitoff", value: d3P.geoAitoff},
  {name: "American polyconic", value: d3P.geoPolyconic},
  {name: "armadillo", value: d3P.geoArmadillo},
  {name: "August", value: d3P.geoAugust},
  {name: "azimuthal equal-area", value: d3.geoAzimuthalEqualArea},
  {name: "azimuthal equidistant", value: d3.geoAzimuthalEquidistant},
  {name: "Baker dinomic", value: d3P.geoBaker},
  {name: "Berghaus’ star", value: d3P.geoBerghaus},
  {name: "Bertin’s 1953", value: d3P.geoBertin1953},
  {name: "Boggs’ eumorphic", value: d3P.geoBoggs},
  {name: "Boggs’ eumorphic (interrupted)", value: d3P.geoInterruptedBoggs},
  {name: "Bonne", value: d3P.geoBonne},
  {name: "Bottomley", value: d3P.geoBottomley},
  {name: "Bromley", value: d3P.geoBromley},
  {name: "Butterfly (gnomonic)", value: d3P.geoPolyhedralButterfly},
  {name: "Butterfly (Collignon)", value: d3P.geoPolyhedralCollignon},
  {name: "Butterfly (Waterman)", value: d3P.geoPolyhedralWaterman},
  {name: "Collignon", value: d3P.geoCollignon},
  // {name: "conic conformal", value: d3.geoConicConformal}, // Not suitable for world maps.
  {name: "conic equal-area", value: d3.geoConicEqualArea},
  {name: "conic equidistant", value: d3.geoConicEquidistant},
  {name: "Craig retroazimuthal", value: d3P.geoCraig},
  {name: "Craster parabolic", value: d3P.geoCraster},
  {name: "cylindrical equal-area", value: d3P.geoCylindricalEqualArea},
  {name: "cylindrical stereographic", value: d3P.geoCylindricalStereographic},
  {name: "Eckert I", value: d3P.geoEckert1},
  {name: "Eckert II", value: d3P.geoEckert2},
  {name: "Eckert III", value: d3P.geoEckert3},
  {name: "Eckert IV", value: d3P.geoEckert4},
  {name: "Eckert V", value: d3P.geoEckert5},
  {name: "Eckert VI", value: d3P.geoEckert6},
  {name: "Eisenlohr conformal", value: d3P.geoEisenlohr},
  {name: "Equal Earth", value: d3.geoEqualEarth},
  {name: "Equirectangular (plate carrée)", value: d3.geoEquirectangular},
  {name: "Fahey pseudocylindrical", value: d3P.geoFahey},
  {name: "flat-polar parabolic", value: d3P.geoMtFlatPolarParabolic},
  {name: "flat-polar quartic", value: d3P.geoMtFlatPolarQuartic},
  {name: "flat-polar sinusoidal", value: d3P.geoMtFlatPolarSinusoidal},
  {name: "Foucaut’s stereographic equivalent", value: d3P.geoFoucaut},
  {name: "Foucaut’s sinusoidal", value: d3P.geoFoucautSinusoidal},
  {name: "general perspective", value: d3P.geoSatellite},
  {name: "Gilbert’s two-world", value: d3P.geoGilbert},
  {name: "Gingery", value: d3P.geoGingery},
  {name: "Ginzburg V", value: d3P.geoGinzburg5},
  {name: "Ginzburg VI", value: d3P.geoGinzburg6},
  {name: "Ginzburg VIII", value: d3P.geoGinzburg8},
  {name: "Ginzburg IX", value: d3P.geoGinzburg9},
  {name: "Goode’s homolosine", value: d3P.geoHomolosine},
  {name: "Goode’s homolosine (interrupted)", value: d3P.geoInterruptedHomolosine},
  {name: "gnomonic", value: d3.geoGnomonic},
  {name: "Gringorten square", value: d3P.geoGringorten},
  {name: "Gringorten quincuncial", value: d3P.geoGringortenQuincuncial},
  {name: "Guyou square", value: d3P.geoGuyou},
  {name: "Hammer", value: d3P.geoHammer},
  {name: "Hammer retroazimuthal", value: d3P.geoHammerRetroazimuthal},
  {name: "HEALPix", value: d3P.geoHealpix},
  {name: "Hill eucyclic", value: d3P.geoHill},
  {name: "Hufnagel pseudocylindrical", value: d3P.geoHufnagel},
  {name: "Kavrayskiy VII", value: d3P.geoKavrayskiy7},
  {name: "Lagrange conformal", value: d3P.geoLagrange},
  {name: "Larrivée", value: d3P.geoLarrivee},
  {name: "Laskowski tri-optimal", value: d3P.geoLaskowski},
  // {name: "Littrow retroazimuthal", value: d3P.geoLittrow}, // Not suitable for world maps.
  {name: "Loximuthal", value: d3P.geoLoximuthal},
  {name: "Mercator", value: d3.geoMercator},
  {name: "Miller cylindrical", value: d3P.geoMiller},
  {name: "Mollweide", value: d3P.geoMollweide},
  {name: "Mollweide (Goode’s interrupted)", value: d3P.geoInterruptedMollweide},
  {name: "Mollweide (interrupted hemispheres)", value: d3P.geoInterruptedMollweideHemispheres},
  {name: "Natural Earth", value: d3.geoNaturalEarth1},
  {name: "Natural Earth II", value: d3P.geoNaturalEarth2},
  {name: "Nell–Hammer", value: d3P.geoNellHammer},
  {name: "Nicolosi globular", value: d3P.geoNicolosi},
  {name: "orthographic", value: d3.geoOrthographic},
  {name: "Patterson cylindrical", value: d3P.geoPatterson},
  {name: "Peirce quincuncial", value: d3P.geoPeirceQuincuncial},
  {name: "rectangular polyconic", value: d3P.geoRectangularPolyconic},
  {name: "Robinson", value: d3P.geoRobinson},
  {name: "sinusoidal", value: d3P.geoSinusoidal},
  {name: "sinusoidal (interrupted)", value: d3P.geoInterruptedSinusoidal},
  {name: "sinu-Mollweide", value: d3P.geoSinuMollweide},
  {name: "sinu-Mollweide (interrupted)", value: d3P.geoInterruptedSinuMollweide},
  {name: "stereographic", value: d3.geoStereographic},
  {name: "Times", value: d3P.geoTimes},
  {name: "Tobler hyperelliptical", value: d3P.geoHyperelliptical},
  {name: "transverse Mercator", value: d3.geoTransverseMercator},
  {name: "Van der Grinten", value: d3P.geoVanDerGrinten},
  {name: "Van der Grinten II", value: d3P.geoVanDerGrinten2},
  {name: "Van der Grinten III", value: d3P.geoVanDerGrinten3},
  {name: "Van der Grinten IV", value: d3P.geoVanDerGrinten4},
  {name: "Wagner IV", value: d3P.geoWagner4},
  {name: "Wagner VI", value: d3P.geoWagner6},
  {name: "Wagner VII", value: d3P.geoWagner7},
  {name: "Werner", value: () => d3P.geoBonne().parallel(90)},
  {name: "Wiechel", value: d3P.geoWiechel},
  {name: "Winkel tripel", value: d3P.geoWinkel3}
];
```

```js
world
```

```js echo
const world = fetch(import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json")).then((response) => response.json());
```

```js echo
import * as d3P from "npm:d3-geo-projection@4";
import {context2d} from "/components/DOM.js";
```
