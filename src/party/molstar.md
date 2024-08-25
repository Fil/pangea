---
index: true
source: https://github.com/observablehq/framework/discussions/1061
---

# Hello, molstar

[Mol&star;](https://molstar.org/) is a modern web-based open-source toolkit for visualisation and analysis of large-scale molecular data

```js echo
const app = display(document.createElement("div"));
app.setAttribute("style", "position: relative; width: 800px; height: 600px;");

molstar.Viewer.create(app, {
  layoutIsExpanded: false,
  layoutShowControls: false,
  layoutShowRemoteState: false,
  layoutShowSequence: true,
  layoutShowLog: false,
  layoutShowLeftPanel: true,
  viewportShowExpand: true,
  viewportShowSelectionMode: false,
  viewportShowAnimation: false,
  pdbProvider: "rcsb",
  emdbProvider: "rcsb"
}).then((viewer) => {
  // load the structure file (copied locally)
  viewer.loadStructureFromUrl(FileAttachment("molstar/7BV2.pdb").href);
  // load meta data from EMDB
  // e.g. https://maps.rcsb.org/em/emd-30210/cell?detail=6
  // and https://files.wwpdb.org/pub/emdb/structures/EMD-30210/header/emd-30210.xml
  viewer.loadEmdb("EMD-30210", {detail: 6});
  return viewer;
});
```

<link rel="stylesheet" type="text/css" href="npm:molstar/build/viewer/molstar.css">

```html echo run=false
<link rel="stylesheet" type="text/css" href="npm:molstar/build/viewer/molstar.css">
```

```js echo
import "npm:molstar/build/viewer/molstar.js";
const molstar = window.molstar;
```
