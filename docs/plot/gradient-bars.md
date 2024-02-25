<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Gradient bars</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Gradient bars

Marks may be a function which returns an SVG element, if you wish to insert arbitrary content. Here we use [Hypertext Literal](https://observablehq.com/@observablehq/htl) to generate an SVG gradient that can be referenced as a [funciri](https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#funciri) color definition.

```js echo
Plot.plot({
  marks: [
    () => htl.svg`<defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="15%" stop-color="purple" />
        <stop offset="75%" stop-color="red" />
        <stop offset="100%" stop-color="gold" />
      </linearGradient>
    </defs>`,
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "url(#gradient)"}),
    Plot.ruleY([0])
  ]
})
```
