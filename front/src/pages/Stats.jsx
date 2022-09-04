import { useParams } from "react-router-dom"
import styled from "styled-components"
import Card from "../Components/Card"
import data from "../data/data"
import BarChart from "../Components/D3/BarChart"
import LinearChart from "../Components/D3/LinearChart"
import RadialChart from "../Components/D3/RadialBarChart"
import SpiderChart from "../Components/D3/SpiderChart"
import Fire from "../assets/fire.svg"
import Chicken from "../assets/chicken.svg"
import Apple from "../assets/apple.svg"
import Burger from "../assets/burger.svg"

export default function Stats() {

	const params = useParams()
	const id = parseInt(params.id)

	const USER_MAIN_DATA = data.USER_MAIN_DATA.filter(data => data.id === id)[0]
	const keyData = USER_MAIN_DATA.keyData
	// console.log({USER_MAIN_DATA})
	console.log(keyData)

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
			<H2 margin="1rem 0" fontWeight="400" fontSize="1.2rem">Félicitation ! Vous avez explosé vos objectifs hier 👏</H2>
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
			<Aside>
				<KeyDataContainer>
					<Card imgSrc={Fire} width="60px" height="60px" bgColor="#FBEAEA" margin="0 1rem 0 0"/>
					<DataContainer>
						<DataContent>{keyData.calorieCount}kCal</DataContent>
						<DataLabel>Calories</DataLabel>
					</DataContainer>
				</KeyDataContainer>
				<KeyDataContainer>
					<Card imgSrc={Chicken} width="60px" height="60px" bgColor="#E9F4FB" margin="0 1rem 0 0"/>
					<DataContainer>
						<DataContent>{keyData.proteinCount}g</DataContent>
						<DataLabel>Protéines</DataLabel>
					</DataContainer>
				</KeyDataContainer>
				<KeyDataContainer>
					<Card imgSrc={Apple} width="60px" height="60px" bgColor="#FBF6E5" margin="0 1rem 0 0"/>
					<DataContainer>
						<DataContent>{keyData.carbohydrateCount}g</DataContent>
						<DataLabel>glucides</DataLabel>
					</DataContainer>
				</KeyDataContainer>
				<KeyDataContainer>
					<Card imgSrc={Burger} width="60px" height="60px" bgColor="#FBEAEF" margin="0 1rem 0 0"/>
					<DataContainer>
						<DataContent>{keyData.lipidCount}g</DataContent>
						<DataLabel>Lipides</DataLabel>
					</DataContainer>
				</KeyDataContainer>
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
	width: 260px;
`
const Article = styled.article`
	display: flex;
	flex-direction: column;
`
const KeyDataContainer = styled.div`
	display: flex;
	background-color: #F5F7F9;
	border-radius: 5px;
	padding: 30px;
	margin: 0 0 1.5rem 0;
`
const DataContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const DataContent = styled.div`
	font-size: 1.3rem;
	font-weight: 700;
	padding-bottom: 10px;
`
const DataLabel = styled.div`
	color: #74798C;
`