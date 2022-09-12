import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import useViewport from '../../utils/Hooks/useViewport'
import PropTypes from 'prop-types'

/**
 * A Linear chart showing the user average sessions. Filled by D3.js.
 * @param {Object} props - props component
 * @param {Array<Object>} props.data - user data
 * @param {number} props.svgHeight - height of svg container
 * @returns {ReactElement} a Linear Chart
 */
export default function LinearChart({ data, svgHeight }) {
	//svg parent ref
	const lineContainerRef = useRef()
	//ref for resize event
	const updateLines = useRef(false)
	//responsive width
	const { viewportWidth } = useViewport()

	useEffect(() => {
		//if resize remove the previous chart
		updateLines.current
			? d3.select('.line-chart-svg').remove()
			: (updateLines.current = true)
		DrawChart(data)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, viewportWidth])

	const margin = { top: 35, left: 20, right: 20, bottom: 35 }

	const DrawChart = (data) => {
		//dimentions
		const graphWidth = parseInt(d3.select(lineContainerRef.current).style('width')) - margin.left - margin.right
		const graphHeight = parseInt(d3.select(lineContainerRef.current).style('height')) - margin.top - margin.bottom
		// create new chart
		const svg = d3
			.select(lineContainerRef.current)
			.append('svg')
			.classed('line-chart-svg', true)
			.attr('width', graphWidth + margin.left + margin.right)
			.attr('height', graphHeight + margin.top + margin.bottom)
			.style('background-color', '#FF0000')
			.style('border-radius', '5px')
		// add a title
		svg.append('text')
			.attr('fill', '#fff')
			.attr('x', margin.right)
			.attr('y', margin.top)
			.text('Durée moyenne des sessions')
			.style('font-size', '1rem')
		// X axis
		const x_Scale = d3
			.scaleLinear()
			.domain([1, 7])
			.range([margin.left, graphWidth + margin.right])

		const tickLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
		const x_Axis = d3
			.axisBottom(x_Scale)
			.tickSize(0)
			.tickPadding(10)
			.ticks(7)
			.tickFormat((d, i) => tickLabels[i])
		const y_Scale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.sessionLength)])
			.range([graphHeight, margin.top + margin.bottom])

		svg.append('g')
			.call(x_Axis)
			.attr('color', '#fff')
			.attr('transform', `translate(0, ${graphHeight + margin.top - 10})`)
			.attr('font-size', '1rem')
			.select('.domain')
			.remove()

		//path
		const line = d3
			.line()
			.x((d) => x_Scale(d.day))
			.y((d) => y_Scale(d.sessionLength))
			.curve(d3.curveMonotoneX)

		const path = svg
			.append('path')
			.attr('d', line(data))
			.attr('stroke', '#fff')
			.attr('stroke-width', 2)
			.attr('fill', 'none')

		// animation
		const pathLength = path.node().getTotalLength()
		path.attr('stroke-dashoffset', pathLength)
			.attr('stroke-dasharray', pathLength)
			.transition()
			.duration(1500)
			.attr('stroke-dashoffset', 0)
			.ease(d3.easeSin)

		//tooltips
		data.forEach((coordinates, index) => {
			let group = svg.append('g').attr('id', 'day' + index + 'average')
			group
				.append('rect')
				.attr('x', x_Scale(index + 1))
				.attr('y', 0)
				.attr('width', '100%')
				.attr('height', graphHeight + margin.top + margin.bottom)
				.attr('fill', 'rgba(0, 0, 0, 0.1)')
				.attr('opacity', '0')
			group
				.append('rect')
				.attr('x', displayTooltip(index + 1))
				.attr('y', y_Scale(data[index].sessionLength) - 25)
				.attr('width', 50)
				.attr('height', 20)
				.attr('fill', '#fff')
				.attr('opacity', '0')
			group
				.append('text')
				.attr('x', displayTooltip(index + 1) + 25)
				.attr('y', y_Scale(data[index].sessionLength) - 10)
				.style('text-anchor', 'middle')
				.attr('fill', 'black')
				.text(data[index].sessionLength + 'min')
				.attr('opacity', '0')
			group
				.append('circle')
				.attr('fill', '#fff')
				.attr('cx', x_Scale(index + 1))
				.attr('cy', y_Scale(data[index].sessionLength))
				.attr('r', 4)
				.attr('opacity', '0')
			// hover area
			svg.append('rect')
				.attr('x', x_Scale(index + 1))
				.attr('y', 0)
				.attr('width', graphWidth / 7)
				.attr('height', 300)
				.attr('fill', 'transparent')
				.attr('opacity', '1')
				// make it appear on hover + make the infos appears
				.on('mouseover', function () {
					d3.selectAll(`#day${index}average > *`)
						.transition()
						.attr('opacity', '1')
				})
				.on('mouseout', function () {
					d3.selectAll(`#day${index}average > *`)
						.transition()
						.attr('opacity', '0')
				})
		})
		// Just to be sure a tooltip don't go outside the chart
		function displayTooltip(index) {
			if (x_Scale(index) <= graphWidth - margin.left - margin.right)
				return x_Scale(index)
			else return x_Scale(index) - margin.left - margin.right
		}
	}

	return <div className="line-chart-container" // add a class for styling
			ref={lineContainerRef} style={{height: svgHeight}}></div>
}

LinearChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	svgHeight: PropTypes.number,
}
