import { useContext } from 'react'
import { viewportContext } from '../Context/ViewportContext'

/**
 * Hook to get the width of the page, for doing responsive
 * @name useViewport
 * @returns {number} the viewport actual width 
 * @function
 */
export default function useViewport() {
	// viewportContext contient toute la logique dont le debouncer
	const { viewportWidth } = useContext(viewportContext)
	return { viewportWidth }
}
