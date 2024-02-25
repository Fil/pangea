<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Normalized streamgraph</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Apportionment of seats in&nbsp;the&nbsp;European&nbsp;Parliament
## Normalized streamgraph

Evolution of EU countries relative apportionment of seats at the European Parliament, colored by year of accession. Although the areaY mark implicitly stacks values, we chose to make the [stack](https://observablehq.com/plot/transforms/stack) transform explicit, in order to minimize the difference between the two marks ([areaY](https://observablehq.com/plot/marks/area) and [textY](https://observablehq.com/plot/marks/text)). Original [D3 visualization](https://observablehq.com/@lucguillemot/apportionment-of-seats-in-the-european-parliament) created by [Luc Guillemot](/@lucguillemot). Data: [Wikipedia](https://en.wikipedia.org/wiki/Apportionment_in_the_European_Parliament).

```js echo
Plot.plot({
  width,
  height: 600,
  y: { percent: true },
  color: { type: "ordinal", scheme: "set2", legend: true },
  marks: [
    Plot.areaY(
      members,
      Plot.stackY({
        x: "date",
        y: "seats",
        z: "state",
        fill: "joined",
        order: "joined",
        title: (d) => `${d.state}\nJoined ${d.joined}`,
        stroke: "#fff",
        strokeOpacity: 0.3,
        offset: "expand",
        curve: "monotone-x"
      })
    ),
    Plot.text(
      members,
      Plot.selectLast(
        Plot.stackY({
          filter: (d) => d.date < new Date(2020, 0, 1),
          x: "date",
          y: "seats",
          z: "state",
          fill: "joined",
          order: "joined",
          text: "state",
          textAnchor: "start",
          dx: -17,
          fill: "#000",
          offset: "expand"
        })
      )
    )
  ]
})
```

The original dataset (**eu**) is a wide array, with one member state per row, and as many columns as there are dates. We make it _tidy_ with arquero’s fold operator, so that each row of the **members** array is an observation: _state_, _date_, and number of _seats_. The _joined_ column is used to color the state’s ribbon.

```js echo
eu = FileAttachment("eu.csv").csv()
```

```js echo
dates = eu.columns.slice(4)
```

```js echo
dateParse = d3.utcParse("%b %Y")
```

```js echo
members = Array.from(
  aq.from(eu)
    .fold(dates)
    .rename({ key: "accession", value: "seats", Joined: "joined", State: "state" }),
  (d) => ({ state: d.state, seats: d.seats, joined: d.joined, date: dateParse(d.accession) })
)
```
