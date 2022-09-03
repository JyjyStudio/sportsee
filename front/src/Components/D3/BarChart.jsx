import * as d3 from "d3"
import { useEffect, useRef } from "react"
import useViewport from '../../utils/Hooks/useViewport'

export default function BarChart({data, svgHeight}) {

	//svg parent ref
	const chartContainerRef = useRef()
	//ref for resize event
	const update = useRef(false)
	//responsive width
	const { viewportWidth } = useViewport()

	useEffect(() => {
		
		//if resize remove the previous chart
		update.current ? d3.selectAll('svg').remove() : update.current = true
		// re-draw the chart with new dimensions after resize 
		DrawChart(data)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, viewportWidth])

	const margin = {top: 50, left: 50, right: 20, bottom: 20}
	
	const DrawChart = (data) => {

		const graphWidth = parseInt(viewportWidth/2) - margin.left - margin.right
		const graphHeight = parseInt(d3.select(chartContainerRef.current).style('height')) - margin.top - margin.bottom
		
		// create new chart
		const svg = d3.select(chartContainerRef.current)
			.append('svg')
			.attr('width', graphWidth + margin.left + margin.right)
			.attr('height', graphHeight + margin.top + margin.bottom)
			.style('background-color', '#F5F7F9')
			.style('border-radius', '5px')

		// chart title
		svg.append('text')
			.attr("x", margin.right)
			.attr("y", 30)
			.text('Activité quotidienne')

		// X axis
		const extent = d3.extent(data.map(d => new Date(d.day).getDate()))
		const x_Scale = d3.scaleLinear()
			.domain(extent)
			.range([margin.left, graphWidth])

		const x_Axis = d3.axisBottom(x_Scale)
			.tickSize(0)
			.tickPadding([margin.bottom])
			.ticks(7)

		svg.append('g')
			.call(x_Axis)
			.attr('transform', `translate(${0}, ${graphHeight + margin.bottom})`)
			.attr("font-size", "1rem")
			.select('path')
			.attr('transform', 'scale(1.03) translate(-11,0)')

		// Y axis
		const max_weight = d3.max(data, d => d.kilogram)
		const max_calories = d3.max(data, d => d.calories)

		const y_Weight_Scale = d3.scaleLinear()
			.domain([max_weight-12, max_weight+3])
			.range([graphHeight + margin.bottom, margin.bottom])
			
		const y_Calories_Scale = d3.scaleLinear()
			.domain([0, max_calories])
			.range([0, graphHeight - margin.top - margin.bottom])

		const y_Axis = d3.axisRight(y_Weight_Scale)
			.ticks(3)
			.tickSize(0)
			.tickPadding([10])
			
		svg.append('g')
			.call(y_Axis)
			.attr('transform', `translate(${graphWidth + margin.right}, 0)`)
			.attr("font-size", "1rem")
			.select('.domain').remove()

		//grille
		const gridTickValues = y_Axis.scale().ticks(3).slice(1)
		const yAxisGrid = d3.axisLeft(y_Weight_Scale)
			.tickSize(graphWidth - margin.right - 10)
			.tickFormat('')
			.tickValues(gridTickValues)
		svg.append('g')
			.style("stroke-dasharray", ("3, 3"))
			.style('color', 'lightgray')
			.attr('transform', `translate(${graphWidth + margin.right - 10}, 0)`)
			.call(yAxisGrid)
			.select('path').remove()

		//legend
		const legend = svg.append('g')
		//weight
		legend.append('circle')
			.attr('cx', graphWidth - 190)
			.attr('cy', margin.bottom)
			.attr('r', 4)
			.attr('fill','black')

		legend.append('text')
			.text('Poids (kg)')
			.attr("dx", graphWidth - 180)
			.attr('dy', margin.bottom + 5)
			.attr('fill', '#74798C')
			.style('font-size', '14px')
		//calories			
		legend.append('circle')
			.attr('cx', graphWidth - 100)
			.attr('cy', margin.bottom)
			.attr('r', 4)
			.attr('fill','#E60000')
				
		legend.append('text')
		.text('Calories brûlées (kCal)')
		.attr("dx", graphWidth - 90)
		.attr('dy', margin.bottom + 5)
		.attr('fill', '#74798C')
		.style('font-size', '14px')

		//data
		//rounded weight line 
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('data-legend', 'weight')
			.attr('x1', d => x_Scale(new Date(d.day).getDate()) - 7) // 7px offset to the right from the calorie line
			.attr('x2', d => x_Scale(new Date(d.day).getDate()) - 7)
			.attr('y1', d => graphHeight + margin.bottom - 5)
			.attr('y2', d =>  graphHeight + margin.bottom - 5)
			.transition()
			.duration(700)
			.attr('y2', d => y_Weight_Scale(d.kilogram) + 3)
			.attr( 'stroke', "black")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"round")

		// rect weight line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(new Date(d.day).getDate()) - 7)
			.attr('x2', d => x_Scale(new Date(d.day).getDate()) - 7)
			.attr('y1', d => graphHeight + margin.bottom)
			.attr('y2', d => graphHeight + margin.bottom)
			.transition()
			.duration(700)
			.attr('y2', d => y_Weight_Scale(d.kilogram)+3)
			.attr( 'stroke', "black")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"butt")
		//rounded calories line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(new Date(d.day).getDate()) + 7)
			.attr('x2', d => x_Scale(new Date(d.day).getDate()) + 7)
			.attr('y1', d => graphHeight + margin.bottom - 5)
			.attr('y2', d => graphHeight + margin.bottom - 5)
			.transition()
			.duration(700)
			.attr('y2', d => graphHeight - y_Calories_Scale(d.calories))
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"round")
		//rect calories line
		svg.append('g')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr('x1', d => x_Scale(new Date(d.day).getDate()) + 7)
			.attr('x2', d => x_Scale(new Date(d.day).getDate()) + 7)
			.attr('y1', d => graphHeight + margin.bottom)
			.attr('y2', d => graphHeight + margin.bottom)
			.transition()
			.duration(700)
			.attr('y2', d => graphHeight - y_Calories_Scale(d.calories))
			.attr( 'stroke', "#E60000")
			.attr('stroke-width', "8")
			.attr('stroke-linecap',"butt")
	}

	return <div className="barchart" ref={chartContainerRef} style={{width:(viewportWidth/2), height:svgHeight}} />

}
