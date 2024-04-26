---
index: true
---

# Three

```js echo
import * as THREE from "npm:three";
```

```js echo
const height = 300;
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
const renderer = new THREE.WebGLRenderer({antialias: true});
camera.position.z = 1;
scene.add(mesh);

const animation = (time) => {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;
  renderer.render(scene, camera);
};

renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
display(renderer.domElement);
```
