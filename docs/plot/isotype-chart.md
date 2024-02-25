---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Isotype Chart</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Isotype Chart

Emoji icons [repeated](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) as many times as necessary, and rendered with the [text](https://observablehq.com/plot/marks/text) mark for unit charts à la [Isotype](https://eagereyes.org/techniques/isotype).

```js echo
Plot.plot({
  width: 610,
  height: 380,
  marginLeft: 60,
  marginRight: 100,
  marginTop: 30,
  y: {label: null},
  fy: {paddingInner: 0.27, label: null},
  marks: [
    Plot.text(data, {
      frameAnchor: "left",
      fontSize: 40,
      text: (d) => `${emoji[d.animal]} `.repeat(Math.round(d.count / 1e6)),
      dx: 20,
      y: "animal",
      fy: "country"
    }),
    Plot.axisFy({fontSize: 18, frameAnchor: "top", dy: -18})
  ],
  caption: "Live stock (millions)"
});
```

```js echo
const emoji = {cattle: "🐄", sheep: "🐑", pigs: "🐖"};
```

```js echo
// This dataset is purely made up.
data = [
  {animal: "pigs", country: "Great Britain", count: 1354979},
  {animal: "cattle", country: "Great Britain", count: 3962921},
  {animal: "sheep", country: "Great Britain", count: 10931215},
  {animal: "pigs", country: "United States", count: 6281935},
  {animal: "cattle", country: "United States", count: 9917873},
  {animal: "sheep", country: "United States", count: 7084151}
];
```
