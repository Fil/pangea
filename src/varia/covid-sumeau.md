---
index: true
---

# Sum’eau (Covid tracker)

This tracks the relative concentration of the coronavirus **gene E** over ammoniacal nitrogen in the sewers of 12 French cities, loading live data from data.gouv.fr. For methodological details, see [the dataset description](https://www.data.gouv.fr/fr/datasets/surveillance-du-sars-cov-2-dans-les-eaux-usees-sumeau/#/information). For California, see [Zan Armstrong’s work on SCAN](https://observablehq.com/@zanarmstrong/sewer-coronavirus-alert-network). See [this publication](https://wastewatersca1.wpenginepowered.com/wp-content/uploads/2024/03/WWSCAN_RSV_Correlation-Study_Summary.pdf) to learn how wastewater concentrations correlate with incidence (in the case of RSV).

```js
const url = "https://www.data.gouv.fr/fr/datasets/r/2963ccb5-344d-4978-bdd3-08aaf9efe514";
const data = d3.text(url)
  .catch(() => d3.text("https://corsproxy.io/?" + url))
  .then((t) => d3.dsvFormat(";").parse(t.replaceAll(",", "."), d3.autoType));
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
const city = view(Inputs.select(new Set(["National", ...cities.sort()])));
```

```js
Plot.plot({
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
})
```

```js
Inputs.table(tidy, {select: false})
```
