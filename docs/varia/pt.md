---
index: true
---

# pt - pretty-print matrices & tensors

`pt` pretty prints a JavaScript array, a matrix, a [mljs matrix](../party/ml-matrix), a ndjs matrix, or a tjfs tensor.

Usage:

```js run=false
display(await pt(data, options));
```

For example:

```js echo
const matrix = Array.from({length: 10}, Math.random);
display(await pt(matrix));
```

`pt` is asynchronous (hence the `await` keyword), because some of the data structures it supports are asynchronous.

To import `pt`, you first need to download the module’s ${await FileAttachment("/components/pt.js").url().then(url => html`<a href="${url}" download>source code</a>`)} and save it to your project (for instance, as `docs/components/pt.js`). Then you can import it like so:

```js echo
import {pt} from "/components/pt.js";
```

`pt` accepts the following options:

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
