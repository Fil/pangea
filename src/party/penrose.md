---
index: true
---

# Hello, Penrose

[Penrose](https://penrose.cs.cmu.edu/) creates “beautiful diagrams just by typing notation in plain text.” See also [Bloom](./bloom), an extension of Penrose for optimization-driven interactive diagrams.


```js echo
// https://penrose.cs.cmu.edu/docs/ref/vanilla-js#experimental-bundled-esm
import * as penrose from "npm:@penrose/core/bundle";
while (!penrose.compile) await new Promise(resolve => setTimeout(() => resolve(), 10));
```

```js echo
{
  const { compile, optimize, toSVG, showError } = penrose;
  const compiled = await compile(trio);
  if (compiled.isErr()) console.error(showError(compiled.error));
  const optimized = optimize(compiled.value);
  if (optimized.isErr()) console.error(showError(optimized.error));
  display(await toSVG(optimized.value));
}
```

Here’s an example taken from the [penrose gallery of examples](https://penrose.cs.cmu.edu/examples):

```js echo
const trio = {
    substance: `
Node n0x0
Node n0x1
Node n0x2
Node n0x3
Node n0x4
Node n0x5
Node n0x6
Node n0x7
Node n0x8
Node n0x9
Node n0x10
Node n0x11
Node n0x12
Node n1x0
Node n1x1
Node n1x2
Node n1x3
Node n1x4
Node n1x5
Node n1x6
Node n1x7
Node n1x8
Node n1x9
Node n1x10
Node n1x11
Node n1x12
Node n1x13
Node n2x0
Node n2x1
Node n2x2
Node n2x3
Node n2x4
Node n2x5
Node n2x6
Node n2x7
Node n2x8
Node n2x9
Node n2x10
Node n2x11
Node n2x12
Node n2x13
Node n3x0
Node n3x1
Node n3x2
Node n3x3
Node n3x4
Node n3x5
Node n3x6
Node n3x7
Node n3x8
Node n3x9
Node n3x10
Node n3x11
Node n3x12
Node n3x13
Node n4x0
Node n4x1
Node n4x2
Node n4x3
Node n4x4
Node n4x5
Node n4x6
Node n4x7
Node n4x8
Node n4x9
Node n4x10
Node n4x11
Node n4x12
Node n4x13
Node n5x0
Node n5x1
Node n5x2
Node n5x3
Node n5x4
Node n5x5
Node n5x6
Node n5x7
Node n5x8
Node n5x9
Node n5x10
Node n5x11
Node n5x12
Node n5x13
Node n6x1
Node n6x2
Node n6x3
Node n6x4
Node n6x5
Node n6x6
Node n6x7
Node n6x8
Node n6x9
Node n6x10
Node n6x11
Node n6x12
Node n6x13
Edge e0 := MakeEdge(n0x0, n0x1)
Edge e1 := MakeEdge(n0x0, n1x0)
Edge e2 := MakeEdge(n0x1, n0x2)
Edge e3 := MakeEdge(n0x2, n0x3)
Edge e4 := MakeEdge(n0x2, n1x2)
Edge e5 := MakeEdge(n0x3, n0x4)
Edge e6 := MakeEdge(n0x4, n0x5)
Edge e7 := MakeEdge(n0x4, n1x4)
Edge e8 := MakeEdge(n0x5, n0x6)
Edge e9 := MakeEdge(n0x6, n0x7)
Edge e10 := MakeEdge(n0x6, n1x6)
Edge e11 := MakeEdge(n0x7, n0x8)
Edge e12 := MakeEdge(n0x8, n0x9)
Edge e13 := MakeEdge(n0x8, n1x8)
Edge e14 := MakeEdge(n0x9, n0x10)
Edge e15 := MakeEdge(n0x10, n0x11)
Edge e16 := MakeEdge(n0x10, n1x10)
Edge e17 := MakeEdge(n0x11, n0x12)
Edge e18 := MakeEdge(n0x12, n1x12)
Edge e19 := MakeEdge(n1x0, n1x1)
Edge e20 := MakeEdge(n1x1, n1x2)
Edge e21 := MakeEdge(n1x1, n2x1)
Edge e22 := MakeEdge(n1x2, n1x3)
Edge e23 := MakeEdge(n1x3, n1x4)
Edge e24 := MakeEdge(n1x3, n2x3)
Edge e25 := MakeEdge(n1x4, n1x5)
Edge e26 := MakeEdge(n1x5, n1x6)
Edge e27 := MakeEdge(n1x5, n2x5)
Edge e28 := MakeEdge(n1x6, n1x7)
Edge e29 := MakeEdge(n1x7, n1x8)
Edge e30 := MakeEdge(n1x7, n2x7)
Edge e31 := MakeEdge(n1x8, n1x9)
Edge e32 := MakeEdge(n1x9, n1x10)
Edge e33 := MakeEdge(n1x9, n2x9)
Edge e34 := MakeEdge(n1x10, n1x11)
Edge e35 := MakeEdge(n1x11, n1x12)
Edge e36 := MakeEdge(n1x11, n2x11)
Edge e37 := MakeEdge(n1x12, n1x13)
Edge e38 := MakeEdge(n1x13, n2x13)
Edge e39 := MakeEdge(n2x0, n2x1)
Edge e40 := MakeEdge(n2x0, n3x0)
Edge e41 := MakeEdge(n2x1, n2x2)
Edge e42 := MakeEdge(n2x2, n2x3)
Edge e43 := MakeEdge(n2x2, n3x2)
Edge e44 := MakeEdge(n2x3, n2x4)
Edge e45 := MakeEdge(n2x4, n2x5)
Edge e46 := MakeEdge(n2x4, n3x4)
Edge e47 := MakeEdge(n2x5, n2x6)
Edge e48 := MakeEdge(n2x6, n2x7)
Edge e49 := MakeEdge(n2x6, n3x6)
Edge e50 := MakeEdge(n2x7, n2x8)
Edge e51 := MakeEdge(n2x8, n2x9)
Edge e52 := MakeEdge(n2x8, n3x8)
Edge e53 := MakeEdge(n2x9, n2x10)
Edge e54 := MakeEdge(n2x10, n2x11)
Edge e55 := MakeEdge(n2x10, n3x10)
Edge e56 := MakeEdge(n2x11, n2x12)
Edge e57 := MakeEdge(n2x12, n2x13)
Edge e58 := MakeEdge(n2x12, n3x12)
Edge e59 := MakeEdge(n3x0, n3x1)
Edge e60 := MakeEdge(n3x1, n3x2)
Edge e61 := MakeEdge(n3x1, n4x1)
Edge e62 := MakeEdge(n3x2, n3x3)
Edge e63 := MakeEdge(n3x3, n3x4)
Edge e64 := MakeEdge(n3x3, n4x3)
Edge e65 := MakeEdge(n3x4, n3x5)
Edge e66 := MakeEdge(n3x5, n3x6)
Edge e67 := MakeEdge(n3x5, n4x5)
Edge e68 := MakeEdge(n3x6, n3x7)
Edge e69 := MakeEdge(n3x7, n3x8)
Edge e70 := MakeEdge(n3x7, n4x7)
Edge e71 := MakeEdge(n3x8, n3x9)
Edge e72 := MakeEdge(n3x9, n3x10)
Edge e73 := MakeEdge(n3x9, n4x9)
Edge e74 := MakeEdge(n3x10, n3x11)
Edge e75 := MakeEdge(n3x11, n3x12)
Edge e76 := MakeEdge(n3x11, n4x11)
Edge e77 := MakeEdge(n3x12, n3x13)
Edge e78 := MakeEdge(n3x13, n4x13)
Edge e79 := MakeEdge(n4x0, n4x1)
Edge e80 := MakeEdge(n4x0, n5x0)
Edge e81 := MakeEdge(n4x1, n4x2)
Edge e82 := MakeEdge(n4x2, n4x3)
Edge e83 := MakeEdge(n4x2, n5x2)
Edge e84 := MakeEdge(n4x3, n4x4)
Edge e85 := MakeEdge(n4x4, n4x5)
Edge e86 := MakeEdge(n4x4, n5x4)
Edge e87 := MakeEdge(n4x5, n4x6)
Edge e88 := MakeEdge(n4x6, n4x7)
Edge e89 := MakeEdge(n4x6, n5x6)
Edge e90 := MakeEdge(n4x7, n4x8)
Edge e91 := MakeEdge(n4x8, n4x9)
Edge e92 := MakeEdge(n4x8, n5x8)
Edge e93 := MakeEdge(n4x9, n4x10)
Edge e94 := MakeEdge(n4x10, n4x11)
Edge e95 := MakeEdge(n4x10, n5x10)
Edge e96 := MakeEdge(n4x11, n4x12)
Edge e97 := MakeEdge(n4x12, n4x13)
Edge e98 := MakeEdge(n4x12, n5x12)
Edge e99 := MakeEdge(n5x0, n5x1)
Edge e100 := MakeEdge(n5x1, n5x2)
Edge e101 := MakeEdge(n5x1, n6x1)
Edge e102 := MakeEdge(n5x2, n5x3)
Edge e103 := MakeEdge(n5x3, n5x4)
Edge e104 := MakeEdge(n5x3, n6x3)
Edge e105 := MakeEdge(n5x4, n5x5)
Edge e106 := MakeEdge(n5x5, n5x6)
Edge e107 := MakeEdge(n5x5, n6x5)
Edge e108 := MakeEdge(n5x6, n5x7)
Edge e109 := MakeEdge(n5x7, n5x8)
Edge e110 := MakeEdge(n5x7, n6x7)
Edge e111 := MakeEdge(n5x8, n5x9)
Edge e112 := MakeEdge(n5x9, n5x10)
Edge e113 := MakeEdge(n5x9, n6x9)
Edge e114 := MakeEdge(n5x10, n5x11)
Edge e115 := MakeEdge(n5x11, n5x12)
Edge e116 := MakeEdge(n5x11, n6x11)
Edge e117 := MakeEdge(n5x12, n5x13)
Edge e118 := MakeEdge(n5x13, n6x13)
Edge e119 := MakeEdge(n6x1, n6x2)
Edge e120 := MakeEdge(n6x2, n6x3)
Edge e121 := MakeEdge(n6x3, n6x4)
Edge e122 := MakeEdge(n6x4, n6x5)
Edge e123 := MakeEdge(n6x5, n6x6)
Edge e124 := MakeEdge(n6x6, n6x7)
Edge e125 := MakeEdge(n6x7, n6x8)
Edge e126 := MakeEdge(n6x8, n6x9)
Edge e127 := MakeEdge(n6x9, n6x10)
Edge e128 := MakeEdge(n6x10, n6x11)
Edge e129 := MakeEdge(n6x11, n6x12)
Edge e130 := MakeEdge(n6x12, n6x13)
    `,
    style: `
canvas {
  width = 400
  height = 400
}

colors {
  contour = #00000093
}

global {
    scalar colorOffset = random(0, 100)
    shape background = Rectangle {
        center: (0, 0)
        width: canvas.width
        height: canvas.height
        fillColor: hsva(colorOffset, 10, 100, 1)
        ensureOnCanvas: false
    } 
}

forall Node n {
    vec2 n.center = (?, ?)
    scalar n.normsq = normsq(n.center)
    scalar fillHue = global.colorOffset + 1.7 * norm(n.center)
    shape n.icon = Circle {
        center: n.center
        r: 6 - 0.03 * norm(n.center)
        fillColor: hsva(fillHue, 100, 100, 1)
        strokeColor: colors.contour
        strokeWidth: 2.6 - 0.008 * norm(n.center)
        ensureOnCanvas: false
    }
    shape n.bloom = Circle {
        center: n.icon.center
        r: n.icon.r
        fillColor: n.icon.fillColor
        strokeColor: n.icon.strokeColor
        strokeWidth: n.icon.strokeWidth
        ensureOnCanvas: false
    }
}

collect Node n into nodes {

   blooms = listof bloom from nodes
   
   shape nodeShadows = Group {
      shapes: blooms
      style: "filter:blur(3px);"
   }
}

forall Edge e; Node a; Node b
where e := MakeEdge(a, b) {
    scalar e.distsq = vdistsq(a.center, b.center)
    shape e.icon = Line {
        start: a.center
        end: b.center
        strokeWidth: 75 / vdist(a.center, b.center)
        strokeColor: colors.contour
        ensureOnCanvas: false
    }
    shape e.bloom = Line {
        start: e.icon.start
        end: e.icon.end
        strokeWidth: e.icon.strokeWidth
        strokeColor: e.icon.strokeColor
        ensureOnCanvas: false
    }
    layer e.bloom below a.icon
    layer e.bloom below b.icon
}

collect Edge e into edges {

   blooms = listof bloom from edges
   
   shape nodeShadows = Group {
      shapes: blooms
      style: "filter:blur(2px);"
   }
}


forall Node n; Edge e {
    e.icon below n.icon
}

collect Node n into nodes {
    normsqs = listof normsq from nodes
    centers = listof center from nodes
    scalar scale = (canvas.width / 5) * (canvas.height / 5)
    ensure sum(normsqs) / count(normsqs) == scale
    ensure norm(sumVectors(centers)) == 0
}

collect Edge e into edges
where e := MakeEdge(a, b)
foreach Node a; Node b {
    distsqs = listof distsq from edges
    encourage sum(distsqs) == 0
}

    `,
    domain: `
type Node
type Edge

constructor MakeEdge(Node a, Node b) -> Edge
    `,
    variation: `??`,
  };
```