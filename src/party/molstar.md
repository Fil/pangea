# Hello, molstar

<link rel="stylesheet" type="text/css" href="./molstar/molstar.css">

```js
import "./molstar/molstar.js";

const molstar = window.molstar;
```

<div id="app" style="position: relative; width: 800px; height: 600px;"></div>

```js echo
molstar.Viewer.create("app", {
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
}).then(async (viewer) => {
  // load the structure file (copied locally)
  viewer.loadStructureFromUrl(await FileAttachment("molstar/7bv2.pdb").url());
  // load meta data from EMDB
  // e.g. https://maps.rcsb.org/em/emd-30210/cell?detail=6
  // and https://files.wwpdb.org/pub/emdb/structures/EMD-30210/header/emd-30210.xml
  viewer.loadEmdb("EMD-30210", {detail: 6});
  return viewer;
});
```
