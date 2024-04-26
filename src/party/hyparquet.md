---
index: true
source: https://observablehq.com/@huggingface/hello-hyparquet
---

# hyparquet

## A lightweight alternative to read parquet files

https://github.com/hyparam/hyparquet

```js echo
import {parquetRead} from "npm:hyparquet";
```

```js echo
const buffer = fetch("https://huggingface.co/api/datasets/nyu-mll/glue/parquet/ax/test/0.parquet").then((d) =>
  d.arrayBuffer()
);
```

```js echo
const data = new Promise((onComplete) => parquetRead({file: buffer, onComplete}));
```

```js echo
display(Inputs.table(data));
```

Note that there are limitations: for example, hyparquet does not read all compression schemes (ZSTD for example is not included).
