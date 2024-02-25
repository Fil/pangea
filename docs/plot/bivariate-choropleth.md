---
source: https://observablehq.com/@observablehq/plot-bivariate-choropleth
index: false
draft: true
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Bivariate choropleth</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Bivariate choropleth

Diabetes and obesity prevalence by county, 2020. Colors: [Joshua Stevens](http://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/). Data: [CDC](https://gis.cdc.gov/grasp/diabetes/diabetesatlas-surveillance.html). For details on the data and the method, read our [tutorial](https://observablehq.com/@observablehq/plot-bivariate-choropleth-explained). See also the [D3 version](/@d3/bivariate-choropleth).

```js echo
const chart = {
  const legend = Plot.plot({
    color: {
      range: scheme,
      transform: ([a, b]) => 3 * a + b,
      unknown: "#ccc" // See Valdez-Cordova, Alaska
    },
    axis: null,
    margin: 0,
    inset: 18,
    width: 106,
    height: 106,
    style: "overflow: visible;",
    marks: [
      Plot.dot(d3.cross([0, 1, 2], [0, 1, 2]), {
        x: ([a, b]) => b - a,
        y: ([a, b]) => b + a,
        symbol: "square",
        rotate: 45,
        r: 14,
        fill: (d) => d,
        title: ([a, b]) => `Diabetes${label(a)}\nObesity${label(b)}`,
        tip: true
      }),
      Plot.text(["Obesity →"], {
        frameAnchor: "right",
        fontWeight: "bold",
        rotate: -45,
        dy: 10
      }),
      Plot.text(["← Diabetes"], {
        frameAnchor: "left",
        fontWeight: "bold",
        rotate: 45,
        dy: 10
      })
    ]
  });

  const color = legend.scale("color");
  const index = new Map(data.map(({ county, ...rest }) => [county, rest]));
  return Plot.plot({
    width: 975,
    height: 610,
    projection: "identity",
    color,
    marks: [
      Plot.geo(
        topojson.feature(us, us.objects.counties),
        Plot.centroid({
          stroke: "white",
          strokeWidth: 0.125,
          fill: (d) => bivariateClass(index.get(d.id)),
          title: (d) => {
            const name = `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}`;
            const value = index.get(d.id);
            if (!value || (isNaN(value.diabetes) && isNaN(value.obesity)))
              return `${name}\nno data`;
            const [dc, oc] = bivariateClass(value);
            return `${name}\n${
              isNaN(value.diabetes) ? "No Data" : value.diabetes
            }% Diabetes${label(dc)}\n${
              isNaN(value.obesity) ? "No Data" : value.obesity
            }% Obesity${label(oc)}`;
          },
          tip: true
        })
      ),
      Plot.geo(topojson.mesh(us, us.objects.states, (a, b) => a !== b), {stroke: "white"}),
      () => svg`<g transform="translate(835,410)">${legend}`
    ],
    style: "overflow: visible;"
  });
}
```

```js echo
const labels = ["low", "", "high"];
```

```js echo
const label = (i) => (labels[i] ? ` (${labels[i]})` : "");
```

```js echo
const data = FileAttachment("cdc_diabetes_obesity_2020.csv")
  .csv()
  .then((data) => {
    data.forEach((d) => {
      d.obesity = +d.obesity; // type as numeric
      d.diabetes = +d.diabetes;
    });
    return data;
  });
```

```js echo
const diabetes_thresholds = d3
  .scaleQuantile(
    data.map((d) => d.diabetes),
    [0, 1, 2]
  )
  .quantiles();
```

```js echo
const obesity_thresholds = d3
  .scaleQuantile(
    data.map((d) => d.obesity),
    [0, 1, 2]
  )
  .quantiles();
```

```js echo
const bivariateClass = {
  const d = diabetes_thresholds;
  const o = obesity_thresholds;
  return (value) => {
    const { diabetes: a, obesity: b } = value;
    return [
      isNaN(a) ? a : +(a > d[0]) + (a > d[1]),
      isNaN(b) ? b : +(b > o[0]) + (b > o[1])
    ];
  };
}
```

```js echo
const scheme = ["#e8e8e8", "#ace4e4", "#5ac8c8", "#dfb0d6", "#a5add3", "#5698b9", "#be64ac", "#8c62aa", "#3b4994"];
```

```js echo
const us = FileAttachment("counties-albers-10m.json").json();
```

```js echo
const states = new Map(us.objects.states.geometries.map((d) => [d.id, d.properties]));
```
