---
index: true
---

# XLSX download button

This button is using [SheetJS](https://docs.sheetjs.com/docs/) to create an Excel file (a.k.a. “Office Open XML”).

```js
const data = view(Inputs.table(penguins, {select: false}));
const datasetname = "penguins";
```

```js echo
import * as XLSX from "npm:xlsx";
display(
  Inputs.button(`Download ${datasetname}.xlsx`, {
    reduce() {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet);
      XLSX.writeFile(workbook, `${datasetname}.xlsx`);
    }
  })
);
```
