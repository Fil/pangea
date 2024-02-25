---
source: https://observablehq.com/@observablehq/plot-impact-of-vaccines
index: true
---

# The impact of vaccines

A recreation of [a WSJ graphic](http://graphics.wsj.com/infectious-diseases-and-vaccines/) by Tynan DeBold and Dov Friedman.

```js
const disease = view(
  Inputs.select(
    vaccines.map((d) => d.disease),
    {unique: true, label: "Disease"}
  )
);
```

```js echo
const chart = Plot.plot({
  width,
  height: 930,
  marginBottom: 30,
  padding: 0,
  round: false,
  label: null,
  x: {axis: "top"},
  color: {
    scheme: dark ? "turbo" : "purd",
    legend: true,
    type: "sqrt",
    label: "Cases per 100,000 people"
  },
  marks: [
    Plot.barX(
      vaccines.filter((d) => d.disease === disease),
      {
        x: "date",
        y: "state",
        interval: "year",
        inset: 0.5,
        fill: "cases",
        title: "cases"
      }
    ),
    Plot.ruleX([introductions.find((d) => d.disease === disease)], {
      x: "date"
    }),
    Plot.text([introductions.find((d) => d.disease === disease)], {
      x: "date",
      dy: 4,
      lineAnchor: "top",
      frameAnchor: "bottom",
      text: (d) => `${d.date.getUTCFullYear()}\nVaccine introduced`
    })
  ]
});

display(chart);
```

```js echo
const data = FileAttachment("../data/vaccines.json").json();
```

```js echo
const states = `Alaska Ala. Ark. Ariz. Calif. Colo. Conn. D.C. Del. Fla. Ga.
Hawaii Iowa Idaho Ill. Ind. Kan. Ky. La. Mass. Md. Maine Mich. Minn. Mo. Miss.
Mont. N.C. N.D. Neb. N.H. N.J. N.M Nev. N.Y. Ohio Okla. Ore. Pa. R.I. S.C. S.D.
Tenn. Texas Utah Va. Vt. Wash. Wis. W.Va. Wyo.`.split(/\s/g);

const vaccines = data.flatMap(
  ({
    title: disease,
    data: {
      values: {data}
    }
  }) =>
    data.map(([date, stateIndex, cases]) => ({
      disease,
      date: new Date(`${date}-01-01`),
      state: states[stateIndex],
      cases
    }))
);

const introductions = data.map(
  ({
    title: disease,
    data: {
      chart_options: {vaccine_year}
    }
  }) => ({
    disease,
    date: new Date(Date.UTC(vaccine_year, (vaccine_year % 1) * 12, 1))
  })
);
```

```js echo
import {dark} from "../components/dark.js";
```
