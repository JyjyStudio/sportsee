/**
 * a debouncer for our responsive eventlistener. 
 * @name debounce
 * @param {function} func - function to debounce
 * @param {number} timeout - timeout to reload the function
 * @returns {function} debounced function
 * @function
 */
export const debounce = (func, timeout) => {
	let timer
	return function (...args){
		const context = this
		if(timer) clearTimeout(timer)
		timer = setTimeout(() => {
			timer = null
			func.apply(context, args)
		}, timeout);
	}
}