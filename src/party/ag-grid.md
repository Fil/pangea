---
title: AG Grid
index: true
theme: dashboard
toc: false
source: https://talk.observablehq.com/t/observable-framework/9693
---

# AG Grid

Example of how to use [AG Grid](https://www.ag-grid.com) with the olympians dataset.

```js
const theme = view(Inputs.select(["ag-theme-balham", "ag-theme-quartz", "ag-theme-material"], {label: "Theme"}));
```

```js echo
const gridOptions = {
  columnDefs: [
    {
        headerName: 'Athlete',
        children: [
            { headerName: "Name", field: "name", cellStyle: { fontWeight: 'bold' }},
            { headerName: "Sport", field: "sport" },
            { headerName: "Nationality", field: "nationality" },
        ]
    },
    {
        headerName: 'Bio',
        children: [
            { headerName: "Sex", field: "sex" },
            { headerName: "Height", field: "height", cellDataType: "number" },
            { headerName: "Weight", field: "weight", cellDataType: "number" },
            { headerName: "DOB", field: "date_of_birth", cellDataType: "date" },
        ]
    },
    {
        headerName: "Medals",
        children: [
            { columnGroupShow: 'open', headerName: "Gold", field: "gold", cellDataType: "number", width: 100 },
            { columnGroupShow: 'open', headerName: "Silver", field: "silver", cellDataType: "number", width: 100  },
            { columnGroupShow: 'open', headerName: "Bronze", field: "bronze", cellDataType: "number", width: 100  },
            { columnGroupShow: 'closed', headerName: "Total", field: "total", cellDataType: "number", width: 100, valueGetter: params => params.data.gold + params.data.silver + params.data.bronze },
        ]
    }
  ],
  rowData: olympians,
  rowSelection: "single",
  defaultColDef: {
    filter: true,
    cellDataType: "text",
    wrapHeaderText: true,
    autoHeaderHeight: true,
  },
  autoSizeStrategy: {
    type: "fitCellContents",
    columnLimits: [
        {
            colId: 'name',
            minWidth: 150
        }
    ]
    },
};

const container = display(document.createElement("div"));
container.setAttribute("style", "height: 500px; width: 100%;");
AgGrid.createGrid(container, gridOptions);
```

The next line sets the grid’s class name, based on the selected **theme** and the current **dark** (or light) mode. It is in a separate code block, ensuring that the grid state (filtered and sorted) is left intact when these values change.

```js echo
container.setAttribute("class", `${theme}${dark ? "-dark" : ""}`);
```

The code below imports a self-hosted copy of the AG-grid JavaScript and stylesheets ([community edition](https://www.ag-grid.com/angular-data-grid/licensing/)).

```js echo
import * as AgGrid from "npm:ag-grid-community";
```

For this demo page, we preload three themes (in actual use you would only select your preferred theme):


```html run=false
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-grid.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-quartz.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-balham.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-material.min.css">
```

<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-grid.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-quartz.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-balham.min.css">
<link rel="stylesheet" href="npm:ag-grid-community/styles/ag-theme-material.min.css">

