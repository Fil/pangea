---
source: https://observablehq.com/@d3/projection-comparison
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Projection comparison</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Projection comparison

Choose two projections below to compare.

```js
viewof red = projectionInput({
  name: "red",
  value: new URLSearchParams(location.search).get("red") || "American polyconic"
})
```

```js
viewof blue = projectionInput({
  name: "blue",
  value: new URLSearchParams(location.search).get("blue") || "rectangular polyconic"
})
```

```js
const map = {
  const outline = ({type: "Sphere"});
  const graticule = d3.geoGraticule10();
  const land = topojson.feature(world, world.objects.land);

  const width = 928;
  const heightRed = fitWidth(red);
  const heightBlue = fitWidth(blue);
  const height = Math.max(heightRed, heightBlue);

  const context = DOM.context2d(width, height);

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

  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);

  context.save();
  context.translate(0, (height - heightRed) / 2);
  render(red, "#f00");
  context.restore();

  context.save();
  context.globalCompositeOperation = "multiply";
  context.translate(0, (height - heightBlue) / 2);
  render(blue, "#00f");
  context.restore();

  return context.canvas;

  function fitWidth(projection) {
    const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
    const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
    return dy;
  }
}
```

---

## Appendix

Edit the *projections* array below, or _red_ and _blue_ above, to define a new projection.

```js echo
const projections = [
  {name: "Airy’s minimum error", value: d3.geoAiry},
  {name: "Aitoff", value: d3.geoAitoff},
  {name: "American polyconic", value: d3.geoPolyconic},
  {name: "armadillo", value: d3.geoArmadillo},
  {name: "August", value: d3.geoAugust},
  {name: "azimuthal equal-area", value: d3.geoAzimuthalEqualArea},
  {name: "azimuthal equidistant", value: d3.geoAzimuthalEquidistant},
  {name: "Baker dinomic", value: d3.geoBaker},
  {name: "Berghaus’ star", value: d3.geoBerghaus},
  {name: "Bertin’s 1953", value: d3.geoBertin1953},
  {name: "Boggs’ eumorphic", value: d3.geoBoggs},
  {name: "Boggs’ eumorphic (interrupted)", value: d3.geoInterruptedBoggs},
  {name: "Bonne", value: d3.geoBonne},
  {name: "Bottomley", value: d3.geoBottomley},
  {name: "Bromley", value: d3.geoBromley},
  {name: "Butterfly (gnomonic)", value: d3.geoPolyhedralButterfly},
  {name: "Butterfly (Collignon)", value: d3.geoPolyhedralCollignon},
  {name: "Butterfly (Waterman)", value: d3.geoPolyhedralWaterman},
  {name: "Collignon", value: d3.geoCollignon},
  // {name: "conic conformal", value: d3.geoConicConformal}, // Not suitable for world maps.
  {name: "conic equal-area", value: d3.geoConicEqualArea},
  {name: "conic equidistant", value: d3.geoConicEquidistant},
  {name: "Craig retroazimuthal", value: d3.geoCraig},
  {name: "Craster parabolic", value: d3.geoCraster},
  {name: "cylindrical equal-area", value: d3.geoCylindricalEqualArea},
  {name: "cylindrical stereographic", value: d3.geoCylindricalStereographic},
  {name: "Eckert I", value: d3.geoEckert1},
  {name: "Eckert II", value: d3.geoEckert2},
  {name: "Eckert III", value: d3.geoEckert3},
  {name: "Eckert IV", value: d3.geoEckert4},
  {name: "Eckert V", value: d3.geoEckert5},
  {name: "Eckert VI", value: d3.geoEckert6},
  {name: "Eisenlohr conformal", value: d3.geoEisenlohr},
  {name: "Equal Earth", value: d3.geoEqualEarth},
  {name: "Equirectangular (plate carrée)", value: d3.geoEquirectangular},
  {name: "Fahey pseudocylindrical", value: d3.geoFahey},
  {name: "flat-polar parabolic", value: d3.geoMtFlatPolarParabolic},
  {name: "flat-polar quartic", value: d3.geoMtFlatPolarQuartic},
  {name: "flat-polar sinusoidal", value: d3.geoMtFlatPolarSinusoidal},
  {name: "Foucaut’s stereographic equivalent", value: d3.geoFoucaut},
  {name: "Foucaut’s sinusoidal", value: d3.geoFoucautSinusoidal},
  {name: "general perspective", value: d3.geoSatellite},
  {name: "Gilbert’s two-world", value: d3.geoGilbert},
  {name: "Gingery", value: d3.geoGingery},
  {name: "Ginzburg V", value: d3.geoGinzburg5},
  {name: "Ginzburg VI", value: d3.geoGinzburg6},
  {name: "Ginzburg VIII", value: d3.geoGinzburg8},
  {name: "Ginzburg IX", value: d3.geoGinzburg9},
  {name: "Goode’s homolosine", value: d3.geoHomolosine},
  {
    name: "Goode’s homolosine (interrupted)",
    value: d3.geoInterruptedHomolosine
  },
  {name: "gnomonic", value: d3.geoGnomonic},
  {name: "Gringorten square", value: d3.geoGringorten},
  {name: "Gringorten quincuncial", value: d3.geoGringortenQuincuncial},
  {name: "Guyou square", value: d3.geoGuyou},
  {name: "Hammer", value: d3.geoHammer},
  {name: "Hammer retroazimuthal", value: d3.geoHammerRetroazimuthal},
  {name: "HEALPix", value: d3.geoHealpix},
  {name: "Hill eucyclic", value: d3.geoHill},
  {name: "Hufnagel pseudocylindrical", value: d3.geoHufnagel},
  {name: "Kavrayskiy VII", value: d3.geoKavrayskiy7},
  {name: "Lagrange conformal", value: d3.geoLagrange},
  {name: "Larrivée", value: d3.geoLarrivee},
  {name: "Laskowski tri-optimal", value: d3.geoLaskowski},
  // {name: "Littrow retroazimuthal", value: d3.geoLittrow}, // Not suitable for world maps.
  {name: "Loximuthal", value: d3.geoLoximuthal},
  {name: "Mercator", value: d3.geoMercator},
  {name: "Miller cylindrical", value: d3.geoMiller},
  {name: "Mollweide", value: d3.geoMollweide},
  {
    name: "Mollweide (Goode’s interrupted)",
    value: d3.geoInterruptedMollweide
  },
  {
    name: "Mollweide (interrupted hemispheres)",
    value: d3.geoInterruptedMollweideHemispheres
  },
  {name: "Natural Earth", value: d3.geoNaturalEarth1},
  {name: "Natural Earth II", value: d3.geoNaturalEarth2},
  {name: "Nell–Hammer", value: d3.geoNellHammer},
  {name: "Nicolosi globular", value: d3.geoNicolosi},
  {name: "orthographic", value: d3.geoOrthographic},
  {name: "Patterson cylindrical", value: d3.geoPatterson},
  {name: "Peirce quincuncial", value: d3.geoPeirceQuincuncial},
  {name: "rectangular polyconic", value: d3.geoRectangularPolyconic},
  {name: "Robinson", value: d3.geoRobinson},
  {name: "sinusoidal", value: d3.geoSinusoidal},
  {name: "sinusoidal (interrupted)", value: d3.geoInterruptedSinusoidal},
  {name: "sinu-Mollweide", value: d3.geoSinuMollweide},
  {
    name: "sinu-Mollweide (interrupted)",
    value: d3.geoInterruptedSinuMollweide
  },
  {name: "stereographic", value: d3.geoStereographic},
  {name: "Times", value: d3.geoTimes},
  {name: "Tobler hyperelliptical", value: d3.geoHyperelliptical},
  {name: "transverse Mercator", value: d3.geoTransverseMercator},
  {name: "Van der Grinten", value: d3.geoVanDerGrinten},
  {name: "Van der Grinten II", value: d3.geoVanDerGrinten2},
  {name: "Van der Grinten III", value: d3.geoVanDerGrinten3},
  {name: "Van der Grinten IV", value: d3.geoVanDerGrinten4},
  {name: "Wagner IV", value: d3.geoWagner4},
  {name: "Wagner VI", value: d3.geoWagner6},
  {name: "Wagner VII", value: d3.geoWagner7},
  {name: "Werner", value: () => d3.geoBonne().parallel(90)},
  {name: "Wiechel", value: d3.geoWiechel},
  {name: "Winkel tripel", value: d3.geoWinkel3}
];
```

```js echo
function projectionInput({name = "", value} = {}) {
  const form = html`<form>
    <select name="i">
      ${projections.map((p) => {
        return Object.assign(html`<option></option>`, {
          textContent: p.name,
          selected: p.name === value
        });
      })}
    </select>
    <i style="font-size:smaller;">${name}</i>
  </form>`;
  form.onchange = () => form.dispatchEvent(new CustomEvent("input"));
  form.oninput = () => (form.value = projections[form.i.selectedIndex].value());
  form.oninput();
  return form;
}
```

```js echo
const world = FileAttachment("world.json").json();
```

```js echo
const d3 = require("d3-geo@3", "d3-geo-projection@4");
```
