---
index: true
---

# Hello, bluefish

“[Bluefish](https://bluefishjs.org/learn/what-is-bluefish.html) is a diagramming framework for the web. The main primitive of Bluefish is the relation. Just as components are the building blocks of user interfaces, relations are the building blocks of diagrams. Unlike components, relations can share children with other relations, and they don’t need to fully specify their childrens’ layouts.”

```js echo
import {StackH, StackV, Circle, Text, Ref, Background, render} from "npm:bluefish-js";

function Diagram() {
  return [
    Background(
      { padding: 40, fill: "#859fc9", stroke: "none" },
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ])
    ),
    Background({ rx: 10 }, StackV({ spacing: 30 }, [Text("Mercury"), Ref({ select: "mercury" })])),
  ];
}

render(Diagram, display(document.createElement("div")));
```
