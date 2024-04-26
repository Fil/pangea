---
index: true
source:
---

# Hello, ml-matrix

to import [mljs matrix](https://github.com/mljs/matrix):

```js echo
import {Matrix, inverse} from "npm:ml-matrix/src/index.js/+esm";
```

```js echo
const A = new Matrix([
  [2, 3, 5],
  [4, 1, 6],
  [1, 3, 0]
]);

// compute the inverse
const A_1 = inverse(A);

// multiply to get back the unit matrix
const B = A.mmul(A_1);
```

```js echo
display(await pt(A));
display(html` · `);
display(await pt(A_1));
display(html` = `);
display(await pt(B));
```

```js echo
// the underlying structure
display(B);
```

We display the matrix with [pt](../varia/pt):

```js echo
import {pt} from "../components/pt.js";
```
