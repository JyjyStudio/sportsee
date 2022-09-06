import { useParams } from "react-router-dom"
import styled from "styled-components"
import data from "../data/data"
import BarChart from "../Components/D3/BarChart"
import LinearChart from "../Components/D3/LinearChart"
import RadialChart from "../Components/D3/RadialBarChart"
import SpiderChart from "../Components/D3/SpiderChart"
import UserData from "../Components/UserData"
import useViewport from '../utils/Hooks/useViewport'

export default function Stats() {

	const params = useParams()
	const id = parseInt(params.id)

	const { viewportWidth } = useViewport()

	const USER_MAIN_DATA = data.USER_MAIN_DATA.filter(data => data.id === id)[0]
	const keyData = USER_MAIN_DATA.keyData

	const USER_AVERAGE_SESSIONS = data.USER_AVERAGE_SESSIONS.filter(data => data.userId === id)[0]
	// console.log({USER_AVERAGE_SESSIONS})

	const USER_PERFORMANCE = data.USER_PERFORMANCE.filter(data => data.userId === id)[0]
	// console.log({USER_PERFORMANCE})
	// const mock = true 
	// const sessions = ? (mock) USER_ACTIVITY.sessions : axios.get()

	const USER_ACTIVITY = data.USER_ACTIVITY.filter(data => data.userId === id)[0]
	const sessions = USER_ACTIVITY.sessions

  return (
	<Wrapper>
		<section>
			<H1>Bonjour <Span color="#FF0101">{USER_MAIN_DATA.userInfos.firstName}</Span></H1>
			<H2 margin=".5rem 0 1.5rem" fontWeight="400" fontSize="1.1rem">Félicitation ! Vous avez explosé vos objectifs hier 👏</H2>
		</section>
		<GridSection>
			<Article>
				<BarChart data={sessions} svgHeight={300} />
				<div style={{display: "flex"}}>
					<LinearChart />
					<SpiderChart />
					<RadialChart />
				</div>
			</Article>
			<Aside width={viewportWidth < 1240 ? '80%' : '250px'} margin={viewportWidth < 1240 ? '0 auto' : '0'}>
				<UserData data={keyData} />
			</Aside>
		</GridSection>
	</Wrapper>
  )
}

const Wrapper = styled.main`
	margin-left: 150px;
	margin-top: 40px;
`
const H1 = styled.h1`
	font-size: 40px;
`
const Span = styled.span`
	color: ${({color}) => color};
`
const H2 = styled.h2`
	margin: ${({margin}) => margin};
	font-weight: ${({fontWeight}) => fontWeight};
	font-size: ${({fontSize}) => fontSize};
`
const GridSection = styled.section`
	display: grid;
	grid-template-columns: 2fr 1fr;
`
const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${({width}) => width};
	margin: ${({margin}) => margin};
`
const Article = styled.article`
	display: flex;
	flex-direction: column;
`
