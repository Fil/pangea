---
source: https://observablehq.com/@observablehq/plot-this-is-just-to-say
index: true
keywords: multiline text
---

# This is just to say

The [text](https://observablehq.com/plot/marks/text) mark respects multiline text.

```js echo
const chart = Plot.plot({height: 200, marks: [Plot.frame(), Plot.text([text], {frameAnchor: "middle"})]});

display(chart);
```

```js echo
const text = `This Is Just To Say
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
and so cold`;
```
