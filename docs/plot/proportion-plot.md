<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Proportion plot</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Proportion plot

Pioneered by [Stephanie Evergreen](https://stephanieevergreen.com/proportion-plots/), proportion plots are useful to highlight differences between the share of a population across two metrics. Here we follow Richard Speigal’s “[Who owns Britain?](https://www.linkedin.com/feed/update/urn:li:activity:6758306750174138368/)” chart, highlighting age class inequalities in Britain. Data: U.K. Office for National Statistics.

```js echo
{
  const stack = (options) => Plot.stackY({}, { x: "type", y: "value", z: "age", ...options });
  return Plot.plot({
    x: {
      domain: columns,
      axis: "top",
      label: null,
      tickFormat: (d) => `Share of ${d}`,
      tickSize: 0,
      padding: 0 // see margins
    },
    y: {
      axis: null,
      reverse: true
    },
    color: {
      scheme: "prgn",
      reverse: true
    },
    marginLeft: 50,
    marginRight: 60,
    marks: [
      Plot.areaY(
        data,
        stack({
          curve: "bump-x",
          fill: "age",
          stroke: "white"
        })
      ),
      Plot.text(
        data,
        stack({
          filter: (d) => d.type === "population",
          text: (d) => `${d.value}%`,
          textAnchor: "end",
          dx: -6
        })
      ),
      Plot.text(
        data,
        stack({
          filter: (d) => d.type === "wealth",
          text: (d) => `${d.value}%`,
          textAnchor: "start",
          dx: +6
        })
      ),
      Plot.text(
        data,
        stack({
          filter: (d) => d.type === "population",
          text: "age",
          textAnchor: "start",
          fill: "white",
          fontWeight: "bold",
          dx: +8
        })
      )
    ]
  });
}
```

The dataset is a tiny CSV—paste your own!

```js
viewof raw = Inputs.textarea({
  rows: 5,
  value: `age,population,wealth
16-34’s,30,3
35-54’s,33,32
55-74’s,28,52
Over 75’s,9,13`,
})
  
```

```js echo
wide = d3.csvParse(raw, d3.autoType)
```

```js echo
columns = wide.columns.slice(1);
```

```js echo
data = columns.flatMap((type) => wide.map((d) => ({ age: d.age, type, value: d[type] })))
```
