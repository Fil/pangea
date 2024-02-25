<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Dodge cars (beeswarm)</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Dodge cars (beeswarm)

The [dodge](https://observablehq.com/plot/transforms/dodge) transform helps to create a beeswarm chart.

```js
viewof anchor = Inputs.select([null, "top", "middle", "bottom"], {label: "anchor"})
```

```js echo
Plot.plot({
  height: 160,
  marks: [
    Plot.dotX(cars, Plot.dodgeY({x: "weight (lb)", title: "name", fill: "currentColor", anchor: anchor ?? undefined}))
  ]
})
```

For comparison, here are a few other ways to display the same data:

```js echo
Plot.plot({
  height: 180,
  marks: [
    Plot.rectY(cars, Plot.binX({y: "count"}, {x: "weight (lb)"})),
    Plot.ruleY([0])
  ]
})
```

```js echo
Plot.dotX(cars, {x: "weight (lb)"}).plot()
```

```js echo
Plot.ruleX(cars, {x: "weight (lb)"}).plot()
```
