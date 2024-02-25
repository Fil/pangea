---
source: https://observablehq.com/@nitaku/tangled-tree-visualization-ii
index: false
draft: true
---

```js
md`
# Tangled tree visualization
`;
```

```js
renderChart(data);
```

```js
const intro = md`
A tree with multiple inheritance (sometimes called _tangled tree_) cannot be represented by using a classic tree visualization. It is technically a directed acyclic graph (DAG) with one (or more) nodes identified as root. Using a graph visualization technique solves the issue, but poorly represents some peculiarities of a quasi-tree structure.

This visualization tries to address the representation of a tangled tree (a genealogy in this specific example). The layout and basic technique is the same underlying [Geneaquilts](https://aviz.fr/Research/Geneaquilts) [[1](#footnote1)], but with curved links instead of matrices. Metro-style bundling is used when a parent node appears in multiple "families", and the layout is made more compact on the y axis.

The intention is for the graphic to be more readily understood, while losing some of the advantages of Geneaquilts (e.g., representing a union without children). See also [this older, simpler example](https://beta.observablehq.com/@nitaku/tangled-tree-visualization).

The technique can also be applied to other types of tangled trees. Such structures are commonly found in computational linguistics (thesauri, some ontologies, wordnets).

(Thanks to [@trebor](https://observablehq.com/@trebor) for making it more reusable!)
`;
```

```js
md`
## Code
`;
```

```js
const renderChart = (data, options = {}) => {
  options.color ||= (d, i) => color(i);

  const tangleLayout = constructTangleLayout(_.cloneDeep(data), options);

  return svg`<svg width="${tangleLayout.layout.width}" height="${
    tangleLayout.layout.height
  }" style="background-color: ${background_color}">
  <style>
    text {
      font-family: sans-serif;
      font-size: 10px;
    }
    .node {
      stroke-linecap: round;
    }
    .link {
      fill: none;
    }
  </style>

  ${tangleLayout.bundles.map((b, i) => {
    let d = b.links
      .map(
        (l) => `
      M${l.xt} ${l.yt}
      L${l.xb - l.c1} ${l.yt}
      A${l.c1} ${l.c1} 90 0 1 ${l.xb} ${l.yt + l.c1}
      L${l.xb} ${l.ys - l.c2}
      A${l.c2} ${l.c2} 90 0 0 ${l.xb + l.c2} ${l.ys}
      L${l.xs} ${l.ys}`
      )
      .join("");
    return `
      <path class="link" d="${d}" stroke="${background_color}" stroke-width="5"/>
      <path class="link" d="${d}" stroke="${options.color(b, i)}" stroke-width="2"/>
    `;
  })}

  ${tangleLayout.nodes.map(
    (n) => `
    <path class="selectable node" data-id="${n.id}" stroke="black" stroke-width="8" d="M${n.x} ${n.y - n.height / 2} L${
      n.x
    } ${n.y + n.height / 2}"/>
    <path class="node" stroke="white" stroke-width="4" d="M${n.x} ${n.y - n.height / 2} L${n.x} ${n.y + n.height / 2}"/>

    <text class="selectable" data-id="${n.id}" x="${n.x + 4}" y="${
      n.y - n.height / 2 - 4
    }" stroke="${background_color}" stroke-width="2">${n.id}</text>
    <text x="${n.x + 4}" y="${n.y - n.height / 2 - 4}" style="pointer-events: none;">${n.id}</text>
  `
  )}

  </svg>`;
};
```

```js
const data = [
  [{id: "Chaos"}],
  [{id: "Gaea", parents: ["Chaos"]}, {id: "Uranus"}],
  [
    {id: "Oceanus", parents: ["Gaea", "Uranus"]},
    {id: "Thethys", parents: ["Gaea", "Uranus"]},
    {id: "Pontus"},
    {id: "Rhea", parents: ["Gaea", "Uranus"]},
    {id: "Cronus", parents: ["Gaea", "Uranus"]},
    {id: "Coeus", parents: ["Gaea", "Uranus"]},
    {id: "Phoebe", parents: ["Gaea", "Uranus"]},
    {id: "Crius", parents: ["Gaea", "Uranus"]},
    {id: "Hyperion", parents: ["Gaea", "Uranus"]},
    {id: "Iapetus", parents: ["Gaea", "Uranus"]},
    {id: "Thea", parents: ["Gaea", "Uranus"]},
    {id: "Themis", parents: ["Gaea", "Uranus"]},
    {id: "Mnemosyne", parents: ["Gaea", "Uranus"]}
  ],
  [
    {id: "Doris", parents: ["Oceanus", "Thethys"]},
    {id: "Neures", parents: ["Pontus", "Gaea"]},
    {id: "Dionne"},
    {id: "Demeter", parents: ["Rhea", "Cronus"]},
    {id: "Hades", parents: ["Rhea", "Cronus"]},
    {id: "Hera", parents: ["Rhea", "Cronus"]},
    {id: "Alcmene"},
    {id: "Zeus", parents: ["Rhea", "Cronus"]},
    {id: "Eris"},
    {id: "Leto", parents: ["Coeus", "Phoebe"]},
    {id: "Amphitrite"},
    {id: "Medusa"},
    {id: "Poseidon", parents: ["Rhea", "Cronus"]},
    {id: "Hestia", parents: ["Rhea", "Cronus"]}
  ],
  [
    {id: "Thetis", parents: ["Doris", "Neures"]},
    {id: "Peleus"},
    {id: "Anchises"},
    {id: "Adonis"},
    {id: "Aphrodite", parents: ["Zeus", "Dionne"]},
    {id: "Persephone", parents: ["Zeus", "Demeter"]},
    {id: "Ares", parents: ["Zeus", "Hera"]},
    {id: "Hephaestus", parents: ["Zeus", "Hera"]},
    {id: "Hebe", parents: ["Zeus", "Hera"]},
    {id: "Hercules", parents: ["Zeus", "Alcmene"]},
    {id: "Megara"},
    {id: "Deianira"},
    {id: "Eileithya", parents: ["Zeus", "Hera"]},
    {id: "Ate", parents: ["Zeus", "Eris"]},
    {id: "Leda"},
    {id: "Athena", parents: ["Zeus"]},
    {id: "Apollo", parents: ["Zeus", "Leto"]},
    {id: "Artemis", parents: ["Zeus", "Leto"]},
    {id: "Triton", parents: ["Poseidon", "Amphitrite"]},
    {id: "Pegasus", parents: ["Poseidon", "Medusa"]},
    {id: "Orion", parents: ["Poseidon"]},
    {id: "Polyphemus", parents: ["Poseidon"]}
  ],
  [
    {id: "Deidamia"},
    {id: "Achilles", parents: ["Peleus", "Thetis"]},
    {id: "Creusa"},
    {id: "Aeneas", parents: ["Anchises", "Aphrodite"]},
    {id: "Lavinia"},
    {id: "Eros", parents: ["Hephaestus", "Aphrodite"]},
    {id: "Helen", parents: ["Leda", "Zeus"]},
    {id: "Menelaus"},
    {id: "Polydueces", parents: ["Leda", "Zeus"]}
  ],
  [
    {id: "Andromache"},
    {id: "Neoptolemus", parents: ["Deidamia", "Achilles"]},
    {id: "Aeneas(2)", parents: ["Creusa", "Aeneas"]},
    {id: "Pompilius", parents: ["Creusa", "Aeneas"]},
    {id: "Iulus", parents: ["Lavinia", "Aeneas"]},
    {id: "Hermione", parents: ["Helen", "Menelaus"]}
  ]
];
```

```js
const constructTangleLayout = (levels, options = {}) => {
  // precompute level depth
  levels.forEach((l, i) => l.forEach((n) => (n.level = i)));

  var nodes = levels.reduce((a, x) => a.concat(x), []);
  var nodes_index = {};
  nodes.forEach((d) => (nodes_index[d.id] = d));

  // objectification
  nodes.forEach((d) => {
    d.parents = (d.parents === undefined ? [] : d.parents).map((p) => nodes_index[p]);
  });

  // precompute bundles
  levels.forEach((l, i) => {
    var index = {};
    l.forEach((n) => {
      if (n.parents.length == 0) {
        return;
      }

      var id = n.parents
        .map((d) => d.id)
        .sort()
        .join("-X-");
      if (id in index) {
        index[id].parents = index[id].parents.concat(n.parents);
      } else {
        index[id] = {
          id: id,
          parents: n.parents.slice(),
          level: i,
          span: i - d3.min(n.parents, (p) => p.level)
        };
      }
      n.bundle = index[id];
    });
    l.bundles = Object.keys(index).map((k) => index[k]);
    l.bundles.forEach((b, i) => (b.i = i));
  });

  var links = [];
  nodes.forEach((d) => {
    d.parents.forEach((p) => links.push({source: d, bundle: d.bundle, target: p}));
  });

  var bundles = levels.reduce((a, x) => a.concat(x.bundles), []);

  // reverse pointer from parent to bundles
  bundles.forEach((b) =>
    b.parents.forEach((p) => {
      if (p.bundles_index === undefined) {
        p.bundles_index = {};
      }
      if (!(b.id in p.bundles_index)) {
        p.bundles_index[b.id] = [];
      }
      p.bundles_index[b.id].push(b);
    })
  );

  nodes.forEach((n) => {
    if (n.bundles_index !== undefined) {
      n.bundles = Object.keys(n.bundles_index).map((k) => n.bundles_index[k]);
    } else {
      n.bundles_index = {};
      n.bundles = [];
    }
    n.bundles.sort((a, b) =>
      d3.descending(
        d3.max(a, (d) => d.span),
        d3.max(b, (d) => d.span)
      )
    );
    n.bundles.forEach((b, i) => (b.i = i));
  });

  links.forEach((l) => {
    if (l.bundle.links === undefined) {
      l.bundle.links = [];
    }
    l.bundle.links.push(l);
  });

  // layout
  const padding = 8;
  const node_height = 22;
  const node_width = 70;
  const bundle_width = 14;
  const level_y_padding = 16;
  const metro_d = 4;
  const min_family_height = 22;

  options.c ||= 16;
  const c = options.c;
  options.bigc ||= node_width + c;

  nodes.forEach((n) => (n.height = (Math.max(1, n.bundles.length) - 1) * metro_d));

  var x_offset = padding;
  var y_offset = padding;
  levels.forEach((l) => {
    x_offset += l.bundles.length * bundle_width;
    y_offset += level_y_padding;
    l.forEach((n, i) => {
      n.x = n.level * node_width + x_offset;
      n.y = node_height + y_offset + n.height / 2;

      y_offset += node_height + n.height;
    });
  });

  var i = 0;
  levels.forEach((l) => {
    l.bundles.forEach((b) => {
      b.x = d3.max(b.parents, (d) => d.x) + node_width + (l.bundles.length - 1 - b.i) * bundle_width;
      b.y = i * node_height;
    });
    i += l.length;
  });

  links.forEach((l) => {
    l.xt = l.target.x;
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metro_d -
      (l.target.bundles.length * metro_d) / 2 +
      metro_d / 2;
    l.xb = l.bundle.x;
    l.yb = l.bundle.y;
    l.xs = l.source.x;
    l.ys = l.source.y;
  });

  // compress vertical space
  var y_negative_offset = 0;
  levels.forEach((l) => {
    y_negative_offset +=
      -min_family_height + d3.min(l.bundles, (b) => d3.min(b.links, (link) => link.ys - 2 * c - (link.yt + c))) || 0;
    l.forEach((n) => (n.y -= y_negative_offset));
  });

  // very ugly, I know
  links.forEach((l) => {
    l.yt =
      l.target.y +
      l.target.bundles_index[l.bundle.id].i * metro_d -
      (l.target.bundles.length * metro_d) / 2 +
      metro_d / 2;
    l.ys = l.source.y;
    l.c1 = l.source.level - l.target.level > 1 ? Math.min(options.bigc, l.xb - l.xt, l.yb - l.yt) - c : c;
    l.c2 = c;
  });

  var layout = {
    width: d3.max(nodes, (n) => n.x) + node_width + 2 * padding,
    height: d3.max(nodes, (n) => n.y) + node_height / 2 + 2 * padding,
    node_height,
    node_width,
    bundle_width,
    level_y_padding,
    metro_d
  };

  return {levels, nodes, nodes_index, links, bundles, layout};
};
```

```js
const color = d3.scaleOrdinal(d3.schemeDark2);
```

```js
const background_color = "white";
```

```js
md`
## Dependencies
`;
```

```js
const d3 = require("d3-scale", "d3-scale-chromatic", "d3-array");
```

```js
const _ = require("lodash");
```

```js
import {footnote} from "@jashkenas/markdown-style-footnotes";
```

```js
md`
## References
`;
```

```js
const footnote1 = footnote(
  "intro",
  1,
  `A. Bezerianos, P. Dragicevic, J. Fekete, J. Bae and B. Watson, "GeneaQuilts: A System for Exploring Large Genealogies," in IEEE Transactions on Visualization and Computer Graphics, vol. 16, no. 6, pp. 1073-1081, Nov.-Dec. 2010, doi: 10.1109/TVCG.2010.159.`
);
```
