---
index: true
---

# Sum’eau (Covid tracker)

<div class="grid grid-cols-3">

<div class="grid-colspan-2">

This tracks the relative concentration of the coronavirus **gene E** over ammoniacal nitrogen in the sewers of ${locations.size} French cities, loading live data from Santé publique France. For methodological details, see [the dataset description](https://odisse.santepubliquefrance.fr/explore/dataset/sum-eau-indicateurs/information/). For California, see [Zan Armstrong’s work on SCAN](https://observablehq.com/@zanarmstrong/sewer-coronavirus-alert-network). See [this publication](https://wastewatersca1.wpenginepowered.com/wp-content/uploads/2024/03/WWSCAN_RSV_Correlation-Study_Summary.pdf) to learn how wastewater concentrations correlate with incidence (in the case of RSV).

```js
const city = view(Inputs.select([...cities.filter((n) => n.startsWith("National")).sort(), ...cities.filter((n) => !n.startsWith("National")).sort()]));
```

<div>${resize(chart)}</div>

</div>

<div>
  <div class="card">
  <div style="display: flex; justify-content: flex-end;">${legend}</div>
  ${resize(map)}
  </div>
</div>

</div>

```js
Inputs.table(tidy, {columns: ["city", "date", "semaine", "concentration"], select: false, sort: "date", reverse: true})
```

```js
// The indicators are fetched at build time by covid-sumeau.csv.sh; the site
// cannot fetch them directly because odisse doesn’t send CORS headers.
const data = d3.dsvFormat(";").parse(await FileAttachment("./covid-sumeau.csv").text(), d3.autoType);
```

```js
const columns = data.columns.filter(k => k !== "date_complet" && k !== "semaine");
const pretty = (s) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const cities = columns.map(pretty);
const tidy = d3.sort(data.flatMap((d) => columns.map((col) => ({
  station: col,
  city: pretty(col),
  date: d.date_complet,
  semaine: d.semaine,
  concentration: d[col]
}))), d => d.date);
```

```js
// One row per station: its most recent measurement, with the station’s coordinates.
const latest = d3.rollups(
  tidy.filter((d) => d.concentration > 0 && locations.has(d.station)),
  (v) => ({...v.at(-1), ...locations.get(v.at(-1).station)}),
  (d) => d.station
).map(([, d]) => d);
```

```js
const chart = (width) => Plot.plot({
  width,
  marginLeft: 60,
  y: {type: "log"},
  marks: [
    Plot.gridY({ticks: 5}),
    Plot.lineY(tidy, {
      x: "date",
      y: "concentration",
      z: "city",
      curve: "natural",
      stroke: (d) => (d.city === city ? "steelblue" : d.city.startsWith("National") ? "grey" : "currentColor"),
      strokeWidth: (d) => (d.city === city ? 3 : d.city.startsWith("National") ? 1.5 : 0.25),
      channels: {semaine: "semaine"},
      tip: {format: {stroke: false, strokeWidth: false}},
      sort: (d) => d.city.startsWith("National")
    })
  ]
});
```

```js
const legend = Mutable();
const map = (width) => {
  const map = Plot.plot({
    width,
    projection: {
      type: "conic-conformal",
      rotate: [-3, 0],
      parallels: [44, 49],
      domain: france
    },
    color: {
      scheme: "blues",
      domain: [2, 4.5],
      label: "Concentration"
    },
    marks: [
      Plot.geo(france, {
        render(i, s, v, d, c, next) {
          return svg`<clipPath id=clip style="transform: none">${
                next(i, s, v, d, c).children[0]
              }<style>.clip {clip-path: url(#clip);}`;
        }
      }),
      Plot.contour(latest, {
        interpolate: "random-walk",
        blur: 8,
        thresholds: d3.range(1, 5, .2),
        x: "lon",
        y: "lat",
        fill: (d) => Math.log10(d.concentration),
        strokeWidth: 0.5,
        stroke: "currentColor",
        className: "clip"
      }),
      Plot.geo(france, {stroke: "#888"}),
      Plot.dot(latest, {
        r: 4,
        x: "lon",
        y: "lat",
        fill: (d) => Math.log10(d.concentration),
        stroke: "black",
        strokeWidth: (d) => d.city === city ? 2 : 0.75,
        sort: d => d.city === city,
        channels: {station: "city", commune: "commune", semaine: "semaine"},
        tip: {
          format: {
            x: false,
            y: false,
            strokeWidth: false,
            fill: d => d3.format(",d")(10 ** d)
          }
        }
      }),
    ]
  });
  legend.value = map.legend("color", {
    ticks: 6,
    width: 130,
    tickFormat: (d) => d3.format(".1s")(10 ** d),
})
  return map;
}
```

```js
const france = FileAttachment("/data/france-metropole.json").json();
const stations = FileAttachment("./covid-sumeau-stations.json").json();
```

```js
// Station coordinates come from the official SUM’eau stations dataset; they are
// keyed by the slug of the station name, which matches the indicator columns.
const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const locations = new Map(stations.features.map(({geometry: {coordinates: [lon, lat]}, properties: {nom, commune, population}}) => [slug(nom), {lon, lat, commune, population}]));
```
