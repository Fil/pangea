---
index: true
---

# Navio

Explore the wine dataset with [navio](https://navio.dev/).

```js echo
const selected = view(await navio(wine));
```

```js echo
display(Inputs.table(selected, {colums: selected.columns}));
```

```js echo
const wine = d3.csv(
  "https://gist.githubusercontent.com/tijptjik/9408623/raw/b237fa5848349a14a14e5d4107dc7897c21951f5/wine.csv",
  d3.autoType
);
```

```js echo
import {navio} from "../components/navio.js";
```

```js
import {showCode} from "../components/showCode.js";
display(showCode(FileAttachment("../components/navio.js")));
```
