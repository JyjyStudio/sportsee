import { useContext } from 'react'
import { viewportContext } from '../Context/ViewportContext'

export default function useViewport() {
	// viewportContext contient toute la logique dont le debouncer
	const { viewportWidth } = useContext(viewportContext)
	return { viewportWidth }
}
