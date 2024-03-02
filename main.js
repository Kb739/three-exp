// import three from "three"
import * as Three from "three"
import Rotator from "./actors/Rotator"
import Input from "./input";
import menuData from "./menuData.json"
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const parent = new Rotator(camera)
parent.addChildren(menuData)
parent.addToScene(scene)
camera.position.z = 5;
const clock = new Three.Clock();

const raycaster = new Three.Raycaster()
const pointer = new Three.Vector2()

function onPointerClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)

  const intersects = raycaster.intersectObjects(scene.children, true)
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000)
  }
}
function update(deltaTime){
  scene.children.forEach((actor)=>{
    actor?.update(deltaTime)
  })
}
function render() {
  requestAnimationFrame(render)
  const deltaTime = clock.getDelta()
  update(deltaTime)
  renderer.render(scene, camera)
}
//window.addEventListener('click', onPointerClick)
Input.initializeInput();
render()
