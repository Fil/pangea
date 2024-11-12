---
index: true
---

# Tabulator

https://tabulator.info/

```js
row
```

Click on a row:

```js echo
const data = [
  {id: 1, name: "Oli Bob", age:"12", col:"red", dob:""},
  {id: 2, name: "Mary May", age:"1", col:"blue", dob:"14/05/1982"},
  {id: 3, name: "Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
  {id: 4, name: "Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
  {id: 5, name: "Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
];
const row = view(tabulator(data, {
  columns: [
    {title: "Name", field: "name", width: 150},
    {title: "Age", field: "age", hozAlign: "left", formatter: "progress"},
    {title: "Favourite Color", field: "col"},
    {title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center"},
  ]
}));
```

<link rel="stylesheet" href="npm:tabulator-tables/dist/css/tabulator.min.css">

```html run=false
<link rel="stylesheet" href="npm:tabulator-tables/dist/css/tabulator.min.css">
```

```js echo
import {TabulatorFull as Tabulator} from "npm:tabulator-tables";
import {DateTime} from "npm:luxon";

function tabulator(data, {
  height = 205,
  layout = "fitColumns",
  columns = (data.rows ?? Object.keys(data[0])).map((field) => ({
    title: field,
    field
  })),
  ...options
} = {}) {
  const div = document.createElement('div');
  const table = new Tabulator(div, {
    data,
    dependencies: {DateTime},
    height,
    layout,
    columns,
  });
  table.on("rowClick", function(e, row) {
    div.value = row.getData();
    div.dispatchEvent(new CustomEvent("input"));
  });
  return div;
}
```
