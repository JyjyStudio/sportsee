import { useParams } from "react-router-dom"
import styled from "styled-components"
import mocked_data from "../data/data"
import BarChart from "../Components/D3/BarChart"
import LineChart from "../Components/D3/LineChart"
import RadialChart from "../Components/D3/RadialChart"
import RadarChart from "../Components/D3/RadardChart"
import UserData from "../Components/UserData"
import useViewport from "../utils/Hooks/useViewport"
import UseAxios from "../utils/Hooks/useAxios"
import Format_api_data from "../utils/Classes/Format_api_data"
import Format_mocked_data from "../utils/Classes/Format_mocked_data"

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
	const use_mocked_data = true
	// show data origin in the console
	use_mocked_data ? console.log("données mockées") : console.log("données de l'api")

	const endpoints = [
		`http://localhost:3000/user/${id}`,
		`http://localhost:3000/user/${id}/average-sessions`,
		`http://localhost:3000/user/${id}/performance`,
		`http://localhost:3000/user/${id}/activity`,
	]
	// the api response with data, error and loading state, only if use_mocked_data is false
	const api_response = !use_mocked_data && UseAxios(endpoints)

	const api_data = use_mocked_data ? null : api_response.data,
		  api_error = use_mocked_data ? null : api_response.error,
		  api_loading = use_mocked_data ? null : api_response.loading

	// clean the data, mocked or fetched
	const formatted_data = mocked_data 
		? new Format_mocked_data(mocked_data, id)
		: new Format_api_data(api_data)

	// enpoints, mocked or fetched
	const user_main_data = formatted_data.main_data
	const user_average_sessions = formatted_data.average_sessions
	const user_performance = formatted_data.performance
	const user_activity = formatted_data.activity

	// if data is loading, we render and loading message
	if(!use_mocked_data && api_loading) return <h1>Chargement en cours</h1>
	// if an error is thrown, we render the error message
	if(api_error) return <h1 style={{margin:"3rem 8rem"}}>{api_error.message}</h1>
	// jsx returned if all data received
	else return (
		<Wrapper>
			<section>
				<H1>Bonjour <Span color="#FF0101">{user_main_data.user_infos.firstName}</Span></H1>
				<H2 margin=".5rem 0 1.5rem" fontWeight="400" fontSize="1.1rem">Félicitation ! Vous avez explosé vos objectifs hier 👏</H2>
			</section>
			<GridSection>
				<Article style={{width: viewportWidth > 1024 ? viewportWidth/2 + 70 : "100%"}}>
					<BarChart data={user_activity} svgHeight={300} />
					<OtherCharts>
						<LineChart data={user_average_sessions} svgHeight={260} />
						<RadarChart data={user_performance} svgHeight={260} />
						<RadialChart data={user_main_data.today_score} svgHeight={260} />
					</OtherCharts>
				</Article>
				<Aside style={{width: viewportWidth > 1024 ? '250px' : "100%"}}>
					<UserData userData={user_main_data.key_data} />
				</Aside>
			</GridSection>
		</Wrapper>
	)
}


const Wrapper = styled.main`
	padding: 0 30px;
	margin-top: 40px;
	@media (max-width: 700px) {
		margin: 100px 0;
	}
`
const H1 = styled.h1`
	font-size: 40px;
`
const Span = styled.span`
	color: ${({ color }) => color};
`
const H2 = styled.h2`
	margin: ${({ margin }) => margin};
	font-weight: ${({ fontWeight }) => fontWeight};
	font-size: ${({ fontSize }) => fontSize};
`
const GridSection = styled.section`
	display: grid;
	grid-template-columns: 2fr 1fr;
	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
	@media (max-width: 700px) {
		text-align: center;
	}
`
const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin-bottom: 2rem;
	width: ${({ width }) => width};
	@media (min-width: 1024px) and (max-width: 1240px) {
		margin: 0 auto;
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
