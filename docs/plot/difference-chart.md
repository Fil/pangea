<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Difference chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Difference chart

A difference chart highlights the difference between two values, typically entries vs exits. The amount is encoded as height, and the sign (surplus vs. deficit) as a solid color. In the chart below, we compare the temperatures on the same day; days when San Francisco was warmer are <span style="border-bottom: 2px solid ${chart.scale("color").apply("NY")}">orange</span>, and colder days are <span style="border-bottom: 2px solid ${chart.scale("color").apply("SF")}">blue</span>.

```js echo
chart = Plot.plot({
  width: 928,
  height: 550,
  x: { inset: 4 },
  y: { grid: true, label: "temperature (°F)" },
  color: { scheme: "RdYlBu", label: "colder" },
  marks: [
    Plot.differenceY(weather, {
      x: "date",
      y1: "New York",
      y2: "San Francisco",
      curve: "step-after",
      positiveFill: () => "NY",
      negativeFill: () => "SF",
      tip: true
    }),
    Plot.text(
      weather,
      Plot.selectMaxY({
        x: "date",
        y: "New York",
        text: () => "New York",
        dy: -6
      })
    ),
    Plot.text(weather, {
      ...Plot.selectMaxY({
        x: "date",
        y: "New York"
      }),
      y: "San Francisco",
      text: () => "San Francisco",
      dy: 13
    }),
    Plot.text(
      weather,
      Plot.selectMinY({
        x: "date",
        y: "New York",
        text: () => "New York",
        textAnchor: "start",
        dy: -10,
        dx: 6
      })
    ),
    Plot.text(weather, {
      ...Plot.selectMinY({
        x: "date",
        y: "New York",
        text: () => "San Francisco"
      }),
      y: "San Francisco",
      dy: -40
    })
  ]
})
```

```js echo
weather = FileAttachment("weather.tsv").tsv({typed: true})
  .then(l => l.map(d => ({...d, date: d3.utcParse("%Y%m%d")(`${d.date}`)})))
```
