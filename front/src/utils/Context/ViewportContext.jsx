import { createContext, useMemo, useEffect, useState } from "react"
import { debounce } from "../debounce"

export const viewportContext = createContext()

export const ViewportProvider = ({children}) => {
	
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

	const handleWindowResize = () => setViewportWidth(window.innerWidth)
	
	const optimizedHandleWindowResize = useMemo(() => debounce(handleWindowResize, 200), [])

	useEffect(() => {
		window.addEventListener('resize', optimizedHandleWindowResize)
		return () => {
			window.removeEventListener('resize', optimizedHandleWindowResize)
		}
	}, [optimizedHandleWindowResize])

	return (
		<viewportContext.Provider value={{viewportWidth}}>
			{children}
		</viewportContext.Provider>
	)
}
