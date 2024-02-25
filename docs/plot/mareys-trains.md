<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Marey’s trains</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Marey’s trains

A recreation of [E.J. Marey](https://en.wikipedia.org/wiki/Étienne-Jules_Marey)’s graphical train schedule. Stations are positioned to scale so that slope encodes speed. This display also reveals when and where <b style="color: ${plot.scale("color").apply("limited")}">limited service trains</b> are passed by <b style="color: ${plot.scale("color").apply("bullet")}">baby bullets</b>. This type of plot is sometimes called a stringline chart. Based on the [D3 implementation](/@d3/mareys-trains).

```js
viewof schedule = Inputs.radio(["weekday", "weekend"], {label: "Schedule", value: "weekday"})
```

```js echo
plot = Plot.plot({
  inset: 10,
  margin: 10,
  marginLeft: 40,
  marginTop: 100,
  grid: true,
  width: 1152,
  height: 1800,
  x: {
    axis: null // hide arbitrary distance units
  },
  y: {
    label: null,
    ticks: d3.range(3, 24).map(h => h * 60),
    tickFormat: asTime,
    transform: asMinutes,
    reverse: true
  },
  color: {
    legend: true,
    domain: ["normal", "limited", "bullet"],
    range: ["rgb(34, 34, 34)", "rgb(183, 116, 9)", "rgb(192, 62, 29)"]
  },
  marks: [
    Plot.ruleX(trains, Plot.groupX({}, {x: "distance", strokeOpacity: 0.1, strokeDasharray: 2})),
    Plot.text(trains, Plot.groupX({text: "first", y: () => "4:30am"}, {x: "distance", text: "station", rotate: -90, frameAnchor: "left", dy: -12})),
    Plot.line(trains, {filter: d => d.schedule === schedule, x: "distance", y: "time", z: "train", stroke: "speed", marker: "circle", title: (d) => `${d.train}${d.direction}\n${d.station}\n${d.time}`, tip: true})
  ]
})
```

```js echo
function asTime(minutes) {
  return formatTime(d3.utcMinute.offset(d3.utcDay(), minutes - minutesOffset));
}
```

```js echo
function asMinutes(time) {
  if (!(time = parseTime(time))) return;
  const minutes = time.getUTCHours() * 60 + time.getUTCMinutes();
  return (minutes + minutesOffset + 60 * 24) % (24 * 60);
}
```

```js echo
minutesOffset = -60 * 2 // no trains run at 2 AM
```

```js echo
parseTime = d3.utcParse("%I:%M%p")
```

```js echo
formatTime = d3.utcFormat("%-I %p")
```

```js echo
trains = FileAttachment("caltrain.csv").csv({typed: true})
```
