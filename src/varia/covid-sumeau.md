---
index: true
---

# Sum’eau (Covid tracker)

<div class="grid grid-cols-3">

<div class="grid-colspan-2">

This tracks the relative concentration of the coronavirus **gene E** over ammoniacal nitrogen in the sewers of ${cities.length} French cities, loading live data from Santé publique France. For methodological details, see [the dataset description](https://odisse.santepubliquefrance.fr/explore/dataset/sum-eau-indicateurs/information/). For California, see [Zan Armstrong’s work on SCAN](https://observablehq.com/@zanarmstrong/sewer-coronavirus-alert-network). See [this publication](https://wastewatersca1.wpenginepowered.com/wp-content/uploads/2024/03/WWSCAN_RSV_Correlation-Study_Summary.pdf) to learn how wastewater concentrations correlate with incidence (in the case of RSV).

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
Inputs.table(tidy, {select: false, sort: "date", reverse: true})
```

```js
const url = "https://odisse.santepubliquefrance.fr/explore/dataset/sum-eau-indicateurs/download?format=csv";
const data = await d3.text(url)
  .catch(() => d3.text("https://cors.eu.org/" + url))
  .catch(() => FileAttachment("./covid-sumeau.csv").text())
  .then((t) => d3.dsvFormat(";").parse(t, d3.autoType));
```

```js
const columns = data.columns.filter(k => k !== "date_complet" && k !== "semaine");
const pretty = (s) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const cities = columns.map(pretty);
const parse = d3.utcParse("%G-S%W");
const tidy = d3.sort(data.flatMap((d) => {
  const date = parse(d.semaine);
  return columns.map((col) => ({
    city: pretty(col),
    date,
    semaine: d.semaine,
    concentration: d[col]
  }));
}), d => d.date);
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
      Plot.contour(tidy, Plot.group({fill: "last"}, {
        interpolate: "random-walk",
        blur: 8,
        thresholds: d3.range(1, 5, .2),
        x: (d) => locations.get(d.city)?.lon,
        y: (d) => locations.get(d.city)?.lat,
        fill: d => d.concentration > 0 ? Math.log10(d.concentration) : NaN,
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
        fill: d => d.concentration > 0 ? Math.log10(d.concentration) : NaN,
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
Amiens,2.3030,49.8939
Angers La Baumette,-0.5750,47.4717
Anglet Pont De L Aveugle No2,-1.5333,43.5167
Aquavara,2.3333,42.7500
Auxerre Appoigny,3.3944,47.7794
Bastia Sud,9.4472,42.6675
Besancon Port Douvot,6.1517,47.2392
Bonneuil En France,2.6264,48.7822
Bordeaux Louis Fargue 2,-0.5708,44.8358
Cannes,7.0167,43.5550
Cap Sicie Amphitria,4.1833,43.3333
Carcassonne Nouvelle,2.3500,43.2000
Carre De Reunion,2.3333,48.8667
Chalon Sur Saone Port Barois,4.9778,46.8083
Clermont Ferrand,3.0892,45.7819
Cran Gevrier Siloe,5.7667,45.8500
Dijon,5.0444,47.3167
Evry Centre Caece,2.3250,48.6833
Grande Synthe,2.28,51
Grenoble Aquapole,5.7333,45.1833
La Baule Escoublac Guerande Livery,-2.1667,47.2500
La Rochelle,-1.1500,46.1500
Lagny Sur Marne St Thibault Des Vignes,2.6167,48.9167
Le Havre,0.1233,49.4944
Lens Loison Sous Lens,2.8333,50.4167
Lescar,0.0167,43.3000
Lille Marquette Lez Lille,2.8500,50.6333
Limoges,1.2700,45.7833
Lmm Le Mans La Chauviniere,0.1750,48.0000
Lyon Saint Fons,4.8667,45.7333
Maera Ex Cereirede,2.3333,42.7500
Marseille,5.3697,43.2965
Maxeville,6.2167,48.6667
Metz,6.1789,49.1153
Mondeville,0.0833,49.0833
Nantes 1 Tougas,-1.5500,47.2167
Nice Haliotis,7.2667,43.7167
Nimes,4.3500,43.8333
National 12,,
National 54,,
Orleans La Chapelle Saint Mesmin,2.3833,47.8833
Paris Marne Aval,2.5500,48.8250
Paris Seine Amont,2.3500,48.8500
Paris Seine Centre,2.3333,48.8667
Poitiers La Folie,-0.3500,46.5833
Reims,4.0333,49.2500
Rennes,-1.6767,48.1167
Roubaix Wattrelos,3.1500,50.7000
Rouen,1.0997,49.4419
Saint Brieuc Le Legue,2.4333,48.6167
Saint Etienne Furania,4.3833,45.4333
Sausheim,7.2500,47.7833
Steu De Brest Zone Portuaire,-4.4833,48.3833
Strasbourg La Wantzenau,7.7167,48.5833
Toulouse Ginestous,1.4833,43.6000
Tours La Riche La Grange David,0.6333,47.3833
Valenciennes,3.5000,50.3500`, d3.autoType), d => d.city);
```
