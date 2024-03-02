import * as Three from "three"
import { lerp, radToDeg } from "three/src/math/MathUtils"
import Input from "../input"
import Pole from "../motion"
import util from "../util"
class Rotator extends Three.Object3D {
	constructor(cameraRef) {
		super()
		this.elapsedTime = 0
		this.duration = 1
		this.direction = 1
		this.rotationY = 0
		this.prevRotationY = 0
		this.active = false
		this.points = []
		this.addKeyEvent();
		this.keyState = {
			leftUp: true,
			rightUp: true
		}
		this.sceneRef = null;
		this.cameraRef = cameraRef;
	}
	addChildren(data) {
		const children = data.map((obj) => {
			const geometry = new Three.BoxGeometry(0.25, 1, 0.65)
			const material = new Three.MeshBasicMaterial({ color: Three.Color.NAMES[obj.color] })
			return new Pole(geometry, material)
		})
		if (this.sceneRef) {
			children.forEach(child => {
				this.sceneRef.add(child)
			})
		}
		this.points = [...this.points, ...children];
	}
	addToScene(scene) {
		if (!this.sceneRef) {
			scene.add(this)
			this.sceneRef = scene
			this.points.forEach(child => {
				scene.add(child)
			})
		}
	}
	setOnMotion(direction) {
		console.log('motion')
		if (!this.active) {
			this.direction = direction
			this.active = true
		}
	}
	addKeyEvent() {
		Input.register('keydown', (e) => {
			switch (e.key) {
				case 'ArrowRight': {
					if (this.keyState.leftUp) {
						this.keyState.leftUp = false
						this.setOnMotion(1)
					} break;
				}
			}
		})
		Input.register('keyup', (e) => {
			switch (e.key) {
				case 'ArrowRight': {
					this.keyState.leftUp = true
				} break;
			}
		})
	}
	update(deltaTime) {
		this.points.forEach((child, index) => {
			const angle = (index * ((Math.PI * 2) / this.points.length) + this.rotationY + Math.PI * 0.025) % (Math.PI * 2)
			const distance = Math.pow(Math.abs(Math.sin(angle)), 2) * 2 + 2
			const relativePositon = new Three.Vector3(Math.sin(angle), 0, Math.cos(angle)).multiplyScalar(distance);
			this.localToWorld(relativePositon)
			child.position.copy(relativePositon)
		})
		if (this.elapsedTime > this.duration) {
			this.elapsedTime = 0
			this.active = false
			this.prevRotationY = this.rotationY % (Math.PI * 2)
		}
		if (this.active) {
			this.elapsedTime += deltaTime
			const t = Math.min(this.elapsedTime / this.duration, 1)
			this.rotationY = this.prevRotationY + this.direction * util.smoothLerp(0, Math.PI * 2 / this.points.length, t)
		}
	}
}
export default Rotator
