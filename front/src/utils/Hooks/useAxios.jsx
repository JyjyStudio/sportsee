import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * Hook to fetch data from an url, using axios. 
 * @param {string} url - api 's url
 * @returns {Object} the data, error and loading state in an object 
 */
export default function UseAxios(url) {
	const [fetchedData, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function getData() {
			await axios
				.get(url)
				.then((response) => {
					setData(response.data)
				})
				.catch((err) => {
					setError(err)
				})
				.finally(() => {
					setLoading(false)
				})
		}

		getData()
	}, [url])

	return { fetchedData, error, loading }
}
