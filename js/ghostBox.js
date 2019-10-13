var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 25);
scene.add(light);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#ffffff");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });

var ghostBoxes = 500;
var boxes = [];

meshX = -10;
for (var i = 0; i < ghostBoxes; i++) {
  var ghostBox = new THREE.Mesh(geometry, material);
  ghostBox.position.x = (Math.random() - 0.5) * 30;
  ghostBox.position.y = (Math.random() - 0.5) * 20;
  ghostBox.position.z = (Math.random() - 0.5) * 30;
  scene.add(ghostBox);
  boxes.push(ghostBox);
  meshX += 1;
}

var render = function() {
  requestAnimationFrame(render);

  // ghostBox.rotation.x += 0.01;
  // ghostBox.rotation.y += 0.01;

  renderer.render(scene, camera);
  for (var i = 1; i <= ghostBoxes; i++) {
    this.tl = new TimelineMax();
    this.tl.to(boxes[i - 1].rotation, 1900, {
      x: (i * Math.PI) / 20,
      y: (i * Math.PI) / 40,
      ease: Expo.easeOut
    });
  }
};

render();
