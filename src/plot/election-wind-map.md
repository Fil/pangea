---
source: https://observablehq.com/@observablehq/plot-election-wind-map
index: true
---

# Election wind map

A map where the margin by which the winner of the US presidential election of 2020 won the vote in each county is represented as a non-gridded [wind map](./wind-map). The length of the [vector](https://observablehq.com/plot/marks/vector) encodes the difference in votes for the Democratic candidate <svg width=12 height=12 viewBox="-11 -11 12 12" style="display: inline-block"><path d="M0,0l-10,-6m1,3.28l-1,-3.28l3.28,-1" stroke="blue" stroke-width="1.5"></path></svg> vs the Republican candidate <svg width=12 height=12 viewBox="0 -11 12 12" style="display: inline-block"><path d="M0,0l10,-6m-1,3.28l1,-3.28l-3.28,-1" stroke="red" stroke-width="1.5"></path></svg>, with color and direction both showing who won.

```js echo
const map = Plot.plot({
  projection: "albers-usa",
  length: {type: "sqrt", transform: Math.abs},
  marks: [
    Plot.geo(statemesh, {strokeWidth: 0.5}),
    Plot.geo(nation),
    Plot.vector(
      counties,
      Plot.centroid({
        anchor: "start",
        length: (d) => d.properties.margin2020 * d.properties.votes,
        stroke: (d) => (d.properties.margin2020 > 0 ? "red" : "blue"),
        rotate: (d) => (d.properties.margin2020 > 0 ? 60 : -60)
      })
    )
  ]
});

display(map);
```

```js echo
const counties = topojson.feature(us, us.objects.counties).features;
const _election = new Map(election.map((d) => [d.fips, d]));
counties.forEach((county) => {
  county.properties.margin2020 = +_election.get(county.id)?.margin2020;
  county.properties.votes = +_election.get(county.id)?.votes;
});
const statemesh = topojson.mesh(us, us.objects.states);
const nation = topojson.feature(us, us.objects.nation);
```

```js echo
const election = FileAttachment("../data/us-presidential-election-2020.csv").csv();
const us = FileAttachment("../data/us-counties-10m.json").json();
```
