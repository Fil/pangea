---
index: true
---

<head>
<script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
</head>

# A-frame

With [A-Frame](https://aframe.io/) you work with [three.js](https://threejs.org/) and 3D models (glb, glTF) just by creating DOM nodes:

<div style="width:100%; height: 500px">
  <a-scene>
    <a-assets>
      <a-asset-item id="tree" src="https://aframe.io/aframe/examples/assets/models/tree2.glb"></a-asset-item>
    </a-assets>
    <a-gltf-model src="#tree" rotation="0 45 0"></a-gltf-model>
    <a-entity position="0 0 4">
      <a-camera></a-camera>
    </a-entity>
  </a-scene>
</div>
