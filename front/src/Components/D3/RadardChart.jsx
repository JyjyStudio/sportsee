import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import PropTypes from 'prop-types'
import useViewport from '../../utils/Hooks/useViewport'

/**
 * A Radar chart showing the user performances. Filled by D3.js.
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @returns {ReactElement} a radar Chart
 */
export default function RadardChart({ data }) {

	const { viewportWidth } = useViewport()

  	// Format X axis label
	const formatLabels = (kindId) => { 
		const kind = data.kind[kindId + 1]
		return (kind)
  }
	return (
		<ResponsiveContainer debounce={300} width={viewportWidth/6 +50}>
			<RadarChart data={data.data} cx='47%' outerRadius={viewportWidth > 1024 && 99} style={{backgroundColor: "#282A30", borderRadius:5}} >
				<PolarGrid radialLines={false} />
				<PolarAngleAxis tickFormatter={formatLabels} tick={{ fill: 'white'}} tickSize={10} style={{transform: "translate(2px, 4px)", fontSize: "13px"}} />				
				<Radar dataKey="value" fill="#ff0000" fillOpacity={0.7} />
			</RadarChart>
		</ResponsiveContainer>
	)
}

RadarChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
