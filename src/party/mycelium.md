---
index: true
source: https://apple.github.io/ml-mycelium/
head: <link rel=stylesheet href='npm:@apple/mycelium/dist/style.css'>
---


# Mycelium

[Mycelium](https://apple.github.io/ml-mycelium/) is a library for creating graph visualizations of machine learning models or any other directed acyclic graphs. It also powers the graph viewer of the Talaria model visualization and optimization system.

<div style="width: 500px; height: 500px;" id="app"></div>


```ts echo
import * as myc from 'npm:@apple/mycelium';


// Creating a Network
// Next, we can create a simple network. Mycelium supports regular nodes, as well as hierarchical modules.

// We define a set of nodes.
const [a, b, c, d, e, f] = ['a', 'b', 'c', 'd', 'e', 'f'] as Array<myc.NodeId>;

// And a set of modules.
const [m, n] = ['m', 'n'] as Array<myc.NodeId>;
// In Mycelium the contents of a node (and other user interface elements) is defined via a small myc.ui framework. For this example we create two helper functions to generate nodes and modules respectively.

function createNode(nodeId: myc.NodeId): myc.ui.Node {
  return new myc.ui.Node(
    nodeId,
    new myc.ui.VStack(new myc.ui.Text('Node').with({ fontWeight: 600 }), new myc.ui.Text(nodeId)),
  ).with({ selectable: true, ...(nodeId === b && { badge: { color: 'red', text: 'i' } }) });
}

function createModule(nodeId: myc.NodeId): myc.ui.Node {
  return new myc.ui.Node(
    nodeId,
    new myc.ui.VStack(new myc.ui.Text('Module').with({ fontWeight: 600 }), new myc.ui.Text(nodeId)),
  ).with({ backgroundColor: myc.ui.Theme.GRAY_BACKGROUND });
}
// Now we have everything in place to define the structure of the network:

const network = new myc.Network();
network.setNode(n, createModule(n));
network.setNodeWithParent(m, createModule(m), n);
network.setNode(a, createNode(a));
network.setNodeWithParent(b, createNode(b), n);
network.setNodeWithParent(c, createNode(c), m);
network.setNodeWithParent(d, createNode(d), m);
network.setNode(e, createNode(e));
network.setNode(f, createNode(f));
network.setEdge(a, b);
network.setEdge(b, c);
network.setEdge(b, d);
network.setEdge(c, d);
network.setEdge(d, e);
network.setEdge(d, f);
// Once we have defined the network, we can create an instance of NetworkViewer and mount it to the DOM. First, we create a div container that will hold the viewer.

//<div style="width: 500; height: 500" id="app" />

// It’s important to note that this container should have a defined size either via explicitly setting its size, or by deriving it via width: 100% and height: 100%. Note that this requires the size of the parent to be set as well.

// Then, we are ready to create a viewer:

const app = document.getElementById('app');
const viewer = myc.NetworkViewer.create(network, app, {
  showBreadcrumbs: true,
  minimap: false,
});
// Finally, we can interact with the representation through methods defined on the viewer. For example, to set a selection we can simply call:

await viewer.setSelection(d, { shouldExpand: true });
// Or, we can change the color of certain nodes via the setDecoration function.

await viewer.setDecoration(a, {
  backgroundColor: 'rgb(237,249,239)',
  borderColor: 'rgb(113,201,117)',
});

await viewer.setDecoration(f, {
  backgroundColor: 'rgb(252,236,235)',
  borderColor: 'rgb(239,90,88)',
});
```