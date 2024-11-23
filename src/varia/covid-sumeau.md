---
index: true
---

# Sum’eau (Covid tracker)

<div class="grid grid-cols-3">

<div class="grid-colspan-2">

This tracks the relative concentration of the coronavirus **gene E** over ammoniacal nitrogen in the sewers of ${cities.length} French cities, loading live data from data.gouv.fr. For methodological details, see [the dataset description](https://www.data.gouv.fr/fr/datasets/surveillance-du-sars-cov-2-dans-les-eaux-usees-sumeau/#/information). For California, see [Zan Armstrong’s work on SCAN](https://observablehq.com/@zanarmstrong/sewer-coronavirus-alert-network). See [this publication](https://wastewatersca1.wpenginepowered.com/wp-content/uploads/2024/03/WWSCAN_RSV_Correlation-Study_Summary.pdf) to learn how wastewater concentrations correlate with incidence (in the case of RSV).

```js
const city = view(Inputs.select(new Set([cities.find((n) => n.startsWith("National")), ...cities.sort()])));
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
Inputs.table(tidy, {select: false})
```

```js
const url = "https://www.data.gouv.fr/fr/datasets/r/2963ccb5-344d-4978-bdd3-08aaf9efe514";
const data = d3.text(url)
  .catch(() => d3.text("https://corsproxy.io/?" + url)
    .catch(() => d3.text(FileAttachment("./covid-sumeau-copy.csv").href))
  ).then((t) => d3.dsvFormat(";").parse(t.replaceAll(",", "."), d3.autoType));
```

```js
const cities = data.columns.slice(1);
const parse = d3.utcParse("%G-S%W");
const tidy = data.flatMap((d) => {
  const date = parse(d.semaine);
  return cities.map((city) => ({
    city,
    date,
    semaine: d.semaine,
    concentration: d[city]
  }));
});
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
      stroke: (d) => (d.city === city ? "steelblue" : d.city === "National" ? "grey" : "currentColor"),
      strokeWidth: (d) => (d.city === city ? 3 : d.city === "National" ? 1.5 : 0.25),
      channels: {semaine: "semaine"},
      tip: {format: {stroke: false, strokeWidth: false}},
      sort: (d) => d.city === "National"
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
      Plot.contour(tidy, Plot.group({fill: "last"}, {
        interpolate: "random-walk",
        blur: 8,
        thresholds: d3.range(1, 5, .2),
        x: (d) => locations.get(d.city)?.lon,
        y: (d) => locations.get(d.city)?.lat,
        fill: d => Math.log10(d.concentration),
        strokeWidth: 0.5,
        stroke: "currentColor",
        className: "clip"
      })),
      Plot.geo(france, {stroke: "#888"}),
      Plot.dot(tidy, Plot.group({fill: "last", x: "first", y: "first", station: "first", strokeWidth: "first"}, {
        interpolate: "random-walk",
        r: 4,
        x: (d) => locations.get(d.city)?.lon,
        y: (d) => locations.get(d.city)?.lat,
        fill: d => Math.log10(d.concentration),
        z: "city",
        stroke: "black",
        strokeWidth: (d) => d.city === city ? 2 : 0.75,
        sort: d => d.city === city,
        tip: {
          channels: {
            station: "city"
          },
          format: {
            x: false,
            y: false,
            strokeWidth: false,
            fill: d => d3.format(",d")(10 ** d)
          }
        }
      })),
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
```

```js
const locations = d3.index(
  d3.csvParse(`city,lon,lat
AMIENS,2.3030,49.8939
ANGERS LA BAUMETTE,-0.5750,47.4717
ANGLET (PONT DE L'AVEUGLE No2),-1.5333,43.5167
AQUAVARA,2.3333,42.7500
AUXERRE - APPOIGNY,3.3944,47.7794
BASTIA-SUD,9.4472,42.6675
BESANCON - PORT-DOUVOT,6.1517,47.2392
BONNEUIL-EN-FRANCE,2.6264,48.7822
BORDEAUX (LOUIS FARGUE 2),-0.5708,44.8358
CANNES,7.0167,43.5550
CAP SICIE - AMPHITRIA,4.1833,43.3333
CARCASSONNE NOUVELLE,2.3500,43.2000
CARRE DE REUNION,2.3333,48.8667
CHALON SUR SAONE-PORT BAROIS,4.9778,46.8083
CLERMONT-FERRAND,3.0892,45.7819
CRAN-GEVRIER - SILOE,5.7667,45.8500
DIJON,5.0444,47.3167
EVRY CENTRE-CAECE,2.3250,48.6833
GRANDE-SYNTHE,2.28,51
GRENOBLE / AQUAPOLE,5.7333,45.1833
LA BAULE-ESCOUBLAC-GUERANDE LIVERY,-2.1667,47.2500
LA ROCHELLE,-1.1500,46.1500
LAGNY-SUR-MARNE ST THIBAULT-DES-VIGNES,2.6167,48.9167
LE HAVRE,0.1233,49.4944
LENS LOISON SOUS LENS,2.8333,50.4167
LESCAR,0.0167,43.3000
LILLE-MARQUETTE-LEZ-LILLE,2.8500,50.6333
LIMOGES,1.2700,45.7833
LMM_LE MANS - LA CHAUVINIERE,0.1750,48.0000
LYON - SAINT FONS,4.8667,45.7333
MAERA (EX CEREIREDE),2.3333,42.7500
MARSEILLE,5.3697,43.2965
MAXEVILLE,6.2167,48.6667
METZ,6.1789,49.1153
MONDEVILLE,0.0833,49.0833
NANTES 1-TOUGAS,-1.5500,47.2167
NICE-HALIOTIS,7.2667,43.7167
NIMES,4.3500,43.8333
National_54,,
ORLEANS LA CHAPELLE-SAINT-MESMIN,2.3833,47.8833
PARIS MARNE AVAL,2.5500,48.8250
PARIS SEINE-AMONT,2.3500,48.8500
PARIS SEINE-CENTRE,2.3333,48.8667
POITIERS LA FOLIE,-0.3500,46.5833
REIMS,4.0333,49.2500
RENNES,-1.6767,48.1167
ROUBAIX-WATTRELOS,3.1500,50.7000
ROUEN,1.0997,49.4419
SAINT-BRIEUC LE LEGUE,2.4333,48.6167
SAINT-ETIENNE - FURANIA,4.3833,45.4333
SAUSHEIM,7.2500,47.7833
STEU DE: BREST (ZONE-PORTUAIRE),-4.4833,48.3833
STRASBOURG - LA WANTZENAU,7.7167,48.5833
TOULOUSE GINESTOUS,1.4833,43.6000
TOURS. LA RICHE LA GRANGE DAVID,0.6333,47.3833
VALENCIENNES,3.5000,50.3500`, d3.autoType), d => d.city);
```
