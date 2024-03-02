const events = {
}
const register = (event, fn) => {
	if (events[event]) {
		events[event].push(fn)
	} else {
		events[event] = [fn]
	}
}
const initializeInput = () => {
	Object.keys(events).forEach((eventType) => {
		addEventListener(eventType, (e) => {
			events[eventType].forEach(fn => fn(e))
		})
	})
}
export default { register, initializeInput }
