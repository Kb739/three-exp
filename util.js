import { Vector3 } from "three"

function equal(a, b, range) {
	return Math.abs(a - b) <= range
}
function getRotatedVectorY(actor, angle) {
	const forwardVector = new Vector3()
	actor.getWorldDirection(forwardVector)
	return forwardVector.applyAxisAngle(new Vector3(0, 1, 0), angle)
}
function smoothLerp(a, b, t) {
	const st = (Math.sin((t * 2 - 1) * Math.PI * 0.5) + 1) / 2
	return a + (b - a) * st
}
export default { equal, getRotatedVectorY, smoothLerp }
