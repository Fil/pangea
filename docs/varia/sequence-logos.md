---
index: true
source: https://observablehq.com/@fil/sequence-logos
---

# Sequence Logos

Protein sequence diversity is shown by stacking amino acid letters by frequency.

Ref. [Sequence Logos: A New Way to Display Consensus Sequences](https://www.researchgate.net/publication/2388044_Sequence_Logos_A_New_Way_to_Display_Consensus_Sequences), Jan. 2002, _Nucleic Acids Research_ 18(20), Thomas Dana Schneider & R. Michael Stephens. (The technique is also called “Logo Plots”.)

```js echo
const chart = Plot.plot({
  y: {domain: [0, 100], percent: true},
  x: {type: "band"},
  marks: [
    stretch(
      Plot.text(
        data,
        Plot.stackY({
          x: "position",
          y: "frequency",
          text: "key",
          z: "key",
          fill: "key",
          order: sortByFrequency ? "value" : null,
          reverse: false,
          offset: "expand",
          fontSize: "frequency",
          fontFamily: "courier"
        })
      )
    )
  ],
  width: 60 + d3.group(data, (d) => d.position).size * 63
});

display(chart);
```

_Data: position/frequency matrix_

```js
const dtext = view(
  Inputs.textarea({
    rows: 100,
    value: await FileAttachment("/data/sequence-data.txt").text(),
    width
  })
);
```

```js
const sortByFrequency = view(
  Inputs.toggle({
    label: "sort by frequency",
    value: true
  })
);
```

---

A variant:

```js
const variant = Plot.plot({
  y: {domain: [0, 100], percent: true},
  x: {type: "band"},
  marks: [
    Plot.barY(data, {
      x: "position",
      y: "frequency",
      fill: "key",
      title: "key",
      order: sortByFrequency ? "value" : null,
      reverse: false
    }),
    stretch(
      Plot.text(
        data,
        Plot.stackY({
          x: "position",
          y: "frequency",
          text: "key",
          z: "key",
          offset: "expand",
          order: sortByFrequency ? "value" : null,
          reverse: false,
          fontSize: "frequency",
          fontFamily: "courier"
        })
      )
    )
  ],
  width: 60 + d3.group(data, (d) => d.position).size * 63
});

display(variant);
```

---

_code_

```js echo
// Plot plugin (kinda)
function stretch(text) {
  const render = text.render;
  text.render = function () {
    const g = render.apply(this, arguments);

    d3.select(g)
      .selectAll("text")
      .each(function () {
        const l = d3.select(this);
        const tr = l.attr("transform");
        const [, x, y] = String(tr).match(/(\d+).*,(\d+)/) || [];
        const ky = +l.attr("font-size") * 5.6; // manual twiddling, depends on the plot's height
        l.attr("font-size", "100"); // 30% more than the width of a column
        l.attr("dy", "-0.025em");
        l.attr("transform", `translate(${x},${y}) scale(1,${ky})`);
      });

    return g;
  };
  return text;
}
```

```js echo
// autodetect csv vs tsv, fix french comma for decimal dot
const raw = dtext.match(/\t.*\t.*\t/)
  ? d3.tsvParse(dtext.replace(/,/g, "."), d3.autoType)
  : d3.csvParse(dtext, d3.autoType);

// flatten to tabular data
const data = raw.flatMap((d) =>
  Object.entries(d)
    .slice(1)
    .map(([key, frequency]) => ({
      key,
      frequency,
      position: d[raw.columns[0]]
    }))
);
```
