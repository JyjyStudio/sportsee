import styled from "styled-components"
import PropTypes from 'prop-types'
import Card from "./Card"
import Fire from "../assets/fire.svg"
import Chicken from "../assets/chicken.svg"
import Apple from "../assets/apple.svg"
import Burger from "../assets/burger.svg"

export default function UserData({userData}) {
		//we create an object with all the informations to map on it
		const icons = [
			{path: Fire, bgColor: '#FBEAEA', unit: 'kCal', label: 'Calories', dataKey: 'calorieCount'}, 
			{path: Chicken, bgColor: '#E9F4FB', unit: 'g', label: 'Protéines', dataKey: 'proteinCount'},
			{path: Apple, bgColor: '#FBF6E5', unit: 'g', label: 'Glucides', dataKey: 'carbohydrateCount'}, 
			{path: Burger, bgColor: '#FBEAEF', unit: 'g', label: 'Lipides', dataKey: 'lipidCount'}
		]
		return icons.map((d, index) => {
			return(
			<KeyDataContainer key={icons[index].dataKey}>
				<Card imgSrc={icons[index].path} width="60px" height="60px" bgColor={icons[index].bgColor} margin="0 1rem 0 0"/>
				<DataContainer>
					<DataContent>{userData[d.dataKey]}{icons[index].unit}</DataContent>
					<DataLabel>{icons[index].label}</DataLabel>
				</DataContainer>
			</KeyDataContainer>
		)})
}

const KeyDataContainer = styled.div`
	display: flex;
	background-color: #F5F7F9;
	border-radius: 5px;
	padding: 30px;
	margin-bottom: 1.5rem;
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
UserData.propTypes = {
	userData : PropTypes.object.isRequired
}