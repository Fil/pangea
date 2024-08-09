---
source: https://observablehq.com/@observablehq/plot-survey-waffle
index: true
---

# Survey waffle

The [waffle mark](https://observablehq.com/plot/marks/waffle) can be used to highlight a proportion of the whole. The chart below recreates a graphic of survey responses from “[Teens in Syria](https://www.economist.com/graphic-detail/2015/08/19/teens-in-syria)” by _The Economist_ (August 19, 2015); positive responses are in orange, while negative responses are in gray. The rx option is used to produce circles instead of squares.

```js echo
Plot.plot({
  axis: null,
  label: null,
  height: 260,
  marginTop: 20,
  marginBottom: 70,
  title: "Subdued",
  subtitle: "Of 120 surveyed Syrian teenagers:",
  marks: [
    Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20}),
    Plot.waffleY({length: 1}, {y: 120, fillOpacity: 0.4, rx: "100%"}),
    Plot.waffleY(survey, {fx: "question", y: "yes", rx: "100%", fill: "orange"}),
    Plot.text(survey, {fx: "question", text: (d) => (d.yes / 120).toLocaleString("en-US", {style: "percent"}), frameAnchor: "bottom", lineAnchor: "top", dy: 6, fill: "orange", fontSize: 24, fontWeight: "bold"})
  ]
})
```

```js echo
const survey = [
  {question: "don’t go out after dark", yes: 96},
  {question: "do no activities other than school", yes: 89},
  {question: "engage in political discussion and social movements, including online", yes: 10},
  {question: "would like to do activities but are prevented by safety concerns", yes: 73}
]
```
