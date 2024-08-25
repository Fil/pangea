---
title: AG Grid
theme: "dashboard"
toc: false
---

# AG Grid example

Example of how to use AG Grid (https://www.ag-grid.com) with the pengins dataset.

```js
import * as AgGrid from "npm:ag-grid-community";
```


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-quartz.min.css">

```js

const gridOptions = {
  columnDefs: [
    { headerName: "Species", field: "species"},
    { headerName: "Island", field: "island" },
    {
      headerName: "Culmen length (mm)",
      field: "culmen_length_mm",
      cellDataType: "number",
      type: "rightAligned",
      valueFormatter: (d) => d3.format(".2f")(d.value)
    },
    {
      headerName: "Culmen depth (mm)",
      field: "culmen_depth_mm",
      cellDataType: "number",
      type: "rightAligned",
      valueFormatter: (d) => d3.format(".2f")(d.value)
    },
    {
      headerName: "Flipper length (mm)",
      field: "flipper_length_mm",
      cellDataType: "number",
      type: "rightAligned",
      valueFormatter: (d) => d3.format(".2f")(d.value)
    },
    {
      headerName: "Body mass (g)",
      field: "body_mass_g",
      cellDataType: "number",
      type: "rightAligned",
      valueFormatter: (d) => d3.format(",")(d.value)
    },
    { headerName: "Sex", field: "sex" },
  ],
  rowData: penguins,
  rowSelection: "single",
  defaultColDef: {
    flex: 1,
    filter: true,
    cellDataType: "text",
  },
};

const container = display(document.createElement("div"));
container.setAttribute("style", "height: 500px; width: 100%;");
container.setAttribute("class", "ag-theme-quartz-auto-dark");
AgGrid.createGrid(container, gridOptions);
```