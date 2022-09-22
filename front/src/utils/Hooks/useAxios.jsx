import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * Hook to fetch data from enpoint(s), using axios. 
 * @name useAxios
 * @param {Array<string>} endpoints - api 's enpoint(s)
 * @returns {Object} the data, error and loading state in an object 
 * @function
 */
export default function useAxios(endpoints) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		axios
			.all(endpoints.map((endpoint) => axios.get(endpoint)))
			.then(axios.spread(({data: USER_MAIN_DATA}, {data:USER_AVERAGE_SESSIONS}, {data:USER_PERFORMANCE}, {data:USER_ACTIVITY}) => {
				setData({USER_MAIN_DATA, USER_AVERAGE_SESSIONS, USER_PERFORMANCE, USER_ACTIVITY})
			}))
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { data, error, loading }
}
