import { useParams } from "react-router-dom"
import styled from "styled-components"
import mocked_data from "../data/data"
import BarChart from "../Components/D3/BarChart"
import LineChart from "../Components/D3/LineChart"
import RadialChart from "../Components/D3/RadialChart"
import RadarChart from "../Components/D3/RadardChart"
import UserData from "../Components/UserData"
import useViewport from "../utils/Hooks/useViewport"
import useAxios from "../utils/Hooks/useAxios"

/**
 * user stats' page. contain chart components with fetched or mocked data
 * @name Stats
 * @returns {ReactElement} the stats view with all charts
 * @component
 */
export default function Stats() {

	const params = useParams()
	const id = parseInt(params.id)

	const { viewportWidth } = useViewport()
	
	// switch to false for use api data, or true to use mocked data
	const use_mocked_data = false

	const endpoints = [
		`http://localhost:3000/user/${id}`,
		`http://localhost:3000/user/${id}/average-sessions`,
		`http://localhost:3000/user/${id}/performance`,
		`http://localhost:3000/user/${id}/activity`
	]
	const api_response = useAxios(endpoints),
		api_data = api_response.data,
		api_error = api_response.error,
		api_loading = api_response.loading
	 
	console.log({api_data, api_error, api_loading});

	// all data, mocked or fetched
	const USER_MAIN_DATA = use_mocked_data
		? mocked_data.USER_MAIN_DATA.filter((data) => data.id === id)[0]
		: api_data?.USER_MAIN_DATA?.data

	const keyData = USER_MAIN_DATA?.keyData
	const score = USER_MAIN_DATA?.todayScore || USER_MAIN_DATA?.score

	const USER_AVERAGE_SESSIONS = use_mocked_data
		? mocked_data.USER_AVERAGE_SESSIONS.filter((data) => data.userId === id)[0]
		: api_data?.USER_AVERAGE_SESSIONS?.data
	const averageSessions = USER_AVERAGE_SESSIONS?.sessions

	const USER_PERFORMANCE = use_mocked_data
		? mocked_data.USER_PERFORMANCE.filter((data) => data.userId === id)[0]
		: api_data?.USER_PERFORMANCE?.data

	const USER_ACTIVITY = use_mocked_data
		? mocked_data.USER_ACTIVITY.filter((data) => data.userId === id)[0]
		: api_data?.USER_ACTIVITY?.data
	const sessions = USER_ACTIVITY?.sessions
	
	// if data loading
	if(api_loading) return <h1>Chargement en cours</h1>
	// if an error is thrown
	if(api_error) return <h1 style={{margin:"3rem 8rem"}}>{api_error.message}</h1>
	// jsx returned if all data received
	if(USER_MAIN_DATA && USER_AVERAGE_SESSIONS && USER_PERFORMANCE && USER_ACTIVITY) return (
		<Wrapper>
			<section>
				<H1>Bonjour <Span color="#FF0101">{USER_MAIN_DATA?.userInfos?.firstName}</Span></H1>
				<H2 margin=".5rem 0 1.5rem" fontWeight="400" fontSize="1.1rem">Félicitation ! Vous avez explosé vos objectifs hier 👏</H2>
			</section>
			<GridSection>
				<Article style={{width: viewportWidth > 1024 ? viewportWidth/2 + 70 : viewportWidth -240}}>
					<BarChart data={sessions} svgHeight={300} />
					<OtherCharts>
						<LineChart data={averageSessions} svgHeight={260} />
						<RadarChart data={USER_PERFORMANCE} svgHeight={260} />
						<RadialChart data={score} svgHeight={260} />
					</OtherCharts>
				</Article>
				<Aside style={{width: viewportWidth > 1024 ? '250px' : (viewportWidth -240)}}>
					<UserData userData={keyData} />
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
	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`
const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin-bottom: 2rem;
	width: ${({width}) => width};
	@media (min-width: 1024px) and (max-width: 1240px) {
		margin: 0 auto
	}
	@media (max-width: 1024px) {
		flex-direction: row;
		flex-wrap: wrap;
	}
`
const Article = styled.article`
	display: flex;
	flex-direction: column;
`
const OtherCharts = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin: 30px 0;
	width: 100%;
	gap: 15px;
	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`