import * as d3 from "d3"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import data from "../../data/data"

export default function BarChart({userWeight, userCalories, svgWidth, svgHeight}) {

	const params = useParams()
	const id = parseInt(params.id)
	const d3ChartRef = useRef()

	const USER_ACTIVITY = data.USER_ACTIVITY.filter(data => data.userId === id)[0]
	const sessions = USER_ACTIVITY.sessions
	console.log(sessions);
	
	useEffect(() => {

		const margin = {top: 50, right: 20, bottom: 20, left: 20}
		const graphWidth = parseInt(d3.select(d3ChartRef.current).style('width')) - margin.left - margin.right
		const graphHeight = parseInt(d3.select(d3ChartRef.current).style('height')) - margin.top - margin.bottom
		
		// clean old chart
		d3.selectAll('svg').remove();
		// create new one
		const svg = d3.select(d3ChartRef.current)
			.append('svg')
			.attr('width', graphWidth + margin.left + margin.right)
			.attr('height', graphHeight + margin.top + margin.bottom)
			.style('background-color', '#F5F7F9')
			.style('border-radius', '5px')

		// chart title
		svg.append('text')
			.attr("x", margin.left)
			.attr("y", 30)
			.text('Activité quotidienne')
		// X axis
		const xScale = d3.scaleBand()
			.domain(sessions.map(date => new Date(date.day).getDate()))
			.range([margin.left, graphWidth])
			// .paddingInner(.94)
			// .paddingOuter(.3)
			// .align(0)

		const axisX = d3.axisBottom(xScale)
			.tickSizeOuter([0])
			.tickSizeInner([0])
			.tickPadding([margin.bottom])

		svg.append('g')
			.attr('transform', `translate(0, ${graphHeight})`)
			.style("font-size", "1rem")
			.call(axisX)			

		// Y axis
		const max = d3.max(sessions, (d) => d.kilogram)

		const yScale = d3.scaleLinear()
					.domain([max-12, max+3])
					.range([graphHeight, margin.bottom]) // a revoir

		const axisY = d3.axisRight(yScale)
			.ticks(3)
			.tickSizeOuter([0])
			.tickSizeInner([0])
			.tickPadding([margin.right])

		svg.append('g')
			.call(axisY)
			.attr('transform', `translate(${graphWidth - margin.right}, 0)`)
			.style("font-size", "1rem")
			.select('.domain').remove()

		//grille
		const gridTickValues = axisY.scale().ticks(3).slice(1)
		const yAxisGrid = d3.axisLeft(yScale)
			.tickSize(graphWidth - margin.left - margin.right)
			.tickFormat('')
			.tickValues(gridTickValues)
		svg.append('g')
			.style("stroke-dasharray", ("3, 3"))
			.style('color', 'lightgray')
			.attr('transform', `translate(${graphWidth - margin.right}, 0)`)
			.call(yAxisGrid)
			.select('path').remove()

		//data

		//rounded weight line
		svg.append('g')
			.selectAll('line')
			.data(sessions)
			.enter()
			.append('line')
			.attr('x1', d => xScale(new Date(d.day).getDate()) + margin.top)
			.attr('x2', d => xScale(new Date(d.day).getDate()) + margin.top)
			.attr('y1', d => graphHeight - margin.bottom)
			.attr('y2', d => yScale(d.kilogram)+3)
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"round")
		// rect weight line
		svg.append('g')
			.selectAll('line')
			.data(sessions)
			.enter()
			.append('line')
			.attr('x1', d => xScale(new Date(d.day).getDate()) + margin.top)
			.attr('x2', d => xScale(new Date(d.day).getDate()) + margin.top)
			.attr('y1', d => graphHeight)
			.attr('y2', d => yScale(d.kilogram)+3)
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"butt")

	}, [sessions])

	return <div className="barchart" ref={d3ChartRef} style={{width:svgWidth, height:svgHeight}} />

}
