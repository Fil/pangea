---
index: true
source: https://observablehq.com/@espinielli/renner-hemispheric-projection
---

# Renner hemispheric projection

_depends on (as yet unreleased) d3-geo-polygon@2 for polygon clipping_

```js
import {worldmap as _} from "/components/map.js"
import {geoInterrupt} from "https://esm.sh/gh/d3/d3-geo-polygon@d8e3737f1e"; //"npm:d3-geo-polygon@2";
```

```js
_(projection)
```

```js echo
// https://observablehq.com/@toja/apians-globular-projections
function apian2Raw(λ, φ) {
  const π = Math.PI;
  return [
    2 * λ / π * Math.sqrt(π * π / 4 - φ * φ),
    φ
  ];
}

const projection = geoInterrupt(apian2Raw, [
    [
      [
        [-180, 0],
        [-90, 90],
        [0, 0]
      ],
      [
        [0, 0],
        [90, 90],
        [180, 0]
      ]
    ],
    [
      [
        [-180, 0],
        [0, -90],
        [180, 0]
      ]
    ]
  ])
```
