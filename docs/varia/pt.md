---
index: true
---

# pt - pretty-print matrices & tensors

`pt` pretty prints an array, a matrix, a ndjs matrix, or a tjfs tensor.

Usage:

```js echo
import {pt} from "/components/pt.js";
```

```js echo
const matrix = new Array(10).fill(1).map(Math.random);
display(await pt([matrix]));
```

pt is asynchronous (hence the `await` keyword), because some of the supported data structures are asynchronous.

`pt` accepts options:

- **title** - define a preamble (usually the name of the matrix, followed by an equal sign)
- **format** - how to format values
- **maxrows** - maximum number of rows; defaults to 13.
- **maxcols** - maximum number of columns; defaults to 13.

Hidden rows and columns are indicated by dots.

```js echo
display(await pt(Math.PI, {title: "\\pi = ", format: (d) => d.toPrecision(6)}));
```

```js echo
display(
  await pt(
    Array.from({length: 20}).map((_, i) => Array.from({length: 20}, (_, j) => (i + 1) * (j + 1))),
    {
      title: "L_\\alpha =",
      maxrows: 8,
      maxcols: 3 + width * 0.016
    }
  )
);
```

<div class="note" label="Credits">

Inspired/copied from [@tmcw](https://observablehq.com/@tmcw/pt) and [@chitacan](https://observablehq.com/@chitacan/handling-matrices), and suggestions by [@jrus](https://observablehq.com/@jrus).

</div>
