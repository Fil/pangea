<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Olympians density</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Olympians density

Use the [density](https://observablehq.com/plot/marks/density) mark to show the spread of two classes of Olympic athletes. Data: [Matt Riggott/IOC](https://www.flother.is/2017/olympic-games-data/)

```js echo
Plot.density(olympians, {x: "weight", y: "height", stroke: "sex"}).plot()
```
