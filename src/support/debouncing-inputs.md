---
source: https://observablehq.com/@mbostock/debouncing-input
index: true
---

# Debouncing inputs

When downstream computations are slow, it’s often a good idea to debounce input changes.

```js echo
const x = view(debounceInput(Inputs.range()));
```

${x}

```js echo
import {debounceInput} from "../components/debounce.js";
```

```js
import {showCode} from "../components/showCode.js";
display(showCode(FileAttachment("../components/debounce.js")));
```
