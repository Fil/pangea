---
index: false
status: draft
---

<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: This is just to say</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# This is just to say

The [text](https://observablehq.com/plot/marks/text) mark respects multiline text.

```js echo
Plot.plot({
  height: 200,
  marks: [
    Plot.frame(),
    Plot.text(
      [
        `This Is Just To Say
William Carlos Williams, 1934

I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`
      ],
      {frameAnchor: "middle"}
    )
  ]
});
```
