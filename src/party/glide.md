---
index: true
---

# Glide Data Grid

> _a powerful, flexible, and efficient data grid designed for modern web applications_

https://docs.grid.glideapps.com/

```jsx echo
display(<div>
  <DataEditor
    getCellContent={getData}
    columns={columns}
    rows={data.length}
    height={350}
    rowMarkers={"number"}
    smoothScrollX={true}
    smoothScrollY={true}
  />
</div>)
```

```js echo
import * as Glide from "npm:@glideapps/glide-data-grid";
const {DataEditor, GridCellKind} = Glide;
display(Glide);
```

<link rel="stylesheet" href="npm:@glideapps/glide-data-grid/dist/index.css">

```html run=false
<link rel="stylesheet" href="npm:@glideapps/glide-data-grid/dist/index.css">
```

```js echo
const data = penguins;
const getData = (([column, row]) => {
  const d = data[row]?.[data.columns[column]];
  return {
    kind: typeof d === "string" ? GridCellKind.Text : GridCellKind.Number,
    allowOverlay: false,
    displayData: String(d),
    data: d,
  };
});
const columns = Array.from(data.columns, c => ({
  title: c,
  id: c
}));
```
