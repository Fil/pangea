---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Diverging stacked bars</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Diverging stacked bars

The dataset contains hundreds of answers to a survey. There are five questions, and the answers rank from negative/red (“Strongly Disagree”, “Disagree”), then neutral/gray, to positive/blue (“Agree”, “Strongly Agree”). Answers are counted and represented as bars describing the absolute frequency of each response. The [bars](https://observablehq.com/plot/marks/bar) are organized in the order of their semantic value, with the
negative answers flowing to the left, and the positive answers flowing to the right. Neutral answers sit in the center. We use a custom [stack offset](https://observablehq.com/plot/transforms/stack#stack-options) to position the bars correctly.

```js echo
Plot.plot({
  x: {tickFormat: Math.abs},
  color: {domain: likert.order, scheme: "RdBu", legend: true},
  marks: [Plot.barX(survey, Plot.groupZ({x: "count"}, {fy: "Question", fill: "Response", ...likert})), Plot.ruleX([0])]
});
```

```js echo
const likert = Likert([
  ["Strongly Disagree", -1],
  ["Disagree", -1],
  ["Neutral", 0],
  ["Agree", 1],
  ["Strongly Agree", 1]
]);
```

For a reference, see Naomi B. Robbins and Richard M. Heiberger, “Plotting Likert
and Other Rating Scales”, 2011
([PDF](http://www.asasrms.org/Proceedings/y2011/Files/300784_64164.pdf)).

_Thanks to [Eitan Lees](/@eitanlees) for asking the
[question](https://talk.observablehq.com/t/diverging-stacked-bar-chart-in-plot/6028)
that prompted this notebook. The write-up below details how we built the chart
(click on the cell definitions to see the code at each stage)._

---

### First try: stacking bars

Using Plot.groupY and fill: "Response" allows us to create a bar for each type of response to each question. The length of each bar corresponds to the count of the corresponding answers (as the _fill_ or _z_ channel) to the question (as the _y_ channel).

```js echo
Plot.plot({
  x: {tickFormat: Math.abs, label: "# of answers"},
  y: {tickSize: 0},
  color: {
    legend: true,
    domain: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    scheme: "RdBu"
  },
  marks: [
    Plot.barX(
      survey,
      Plot.groupY(
        {x: "count"},
        {
          fill: "Response",
          order: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
          y: "Question"
        }
      )
    )
  ]
});
```

The next step is to make the red answers flow to the left, the blue answers to the right, and the gray centered.

### Second try: negative vs positive

We introduce a function that returns the sign of a response: -1 for negatives, 0 for neutral, and 1 for positives. This allows us to send the red bars to the left, and the blue ones to the right:

```js echo
const sign = (label) => (label.match(/neutral/i) ? 0 : label.match(/disagree/i) ? -1 : 1);
```

```js echo
Plot.plot({
  color: {
    domain: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    scheme: "RdBu"
  },
  marks: [
    Plot.barX(
      survey,
      Plot.groupY(
        {x: (d) => d.length * sign(d[0].Response)},
        {
          fill: "Response",
          order: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
          y: "Question"
        }
      )
    )
  ]
});
```

However, this immediately raises two issues: first, the neutral value has
disappeared, because we multiplied it by zero. Second, the negative bars grow to
the left from the first element of the scale (“Strongly disagree”), resulting in
a bad ordering.

### Solution: a custom offset

Since the standard strategy followed by Plot.stack ignores neutral values, we can define an offset function (a new feature introduced in Plot 0.4.3). The Likert function below takes as input the association between responses and their rating (positive, negative or neutral), and returns both an _order_ and a custom _offset_ to use in a stack transform.

```js
const normalize = view(Inputs.toggle({label: "normalize"}));
```

```js echo
{
  const {order, offset} = Likert([
    ["Strongly Disagree", -1],
    ["Disagree", -1],
    ["Neutral", 0],
    ["Agree", 1],
    ["Strongly Agree", 1]
  ]);

  return Plot.plot({
    x: normalize ? {tickFormat: "%", label: "answers (%)"} : {tickFormat: Math.abs, label: "# of answers"},
    y: {tickSize: 0},
    facet: {data: survey, y: "Question"},
    color: {domain: order, scheme: "RdBu"},
    marks: [
      Plot.barX(
        survey,
        Plot.groupZ(
          {x: normalize ? "proportion-facet" : "count"},
          {
            fill: "Response",
            stroke: "#777",
            strokeWidth: 0.5,
            order,
            offset
          }
        )
      ),
      Plot.textX(
        survey,
        Plot.stackX(
          Plot.groupZ(
            {x: normalize ? "proportion-facet" : "count", text: "first"},
            {
              text: (d) => d.Response.replace(/[^A-Z]/g, ""),
              z: "Response",
              order,
              offset
            }
          )
        )
      )
    ]
  });
}
```

Note that, by splitting the dataset by question, we can use the proportion-facet reducer to normalize each question to a total of 100%. An alternative approach would be to normalize inside the offset function.

```js echo
function Likert(responses) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    offset(I, X1, X2, Z) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) => (X2[i] - X1[i]) * (1 - map.get(Z[i]))) / 2;
          for (const i of stack) {
            X1[i] -= k;
            X2[i] -= k;
          }
        }
      }
    }
  };
}
```

---

_data_

```js echo
const survey = FileAttachment("survey.json").json();
```

```js
Inputs.table(survey, {columns: ["ID", "Question", "Response"], width: 370});
```
